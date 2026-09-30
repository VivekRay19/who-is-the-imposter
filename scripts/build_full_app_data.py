import os
import json
import time
import sys
from concurrent.futures import ThreadPoolExecutor

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

from fetcher_engine import fetch_wiki_image, save_cache
from cats_animals_birds_insects import ANIMALS, BIRDS, INSECTS
from cats_fruits_veg_food import FRUITS, VEGETABLES, FOOD
from cats_countries_cities_sports import COUNTRIES, CITIES, SPORTS
from cats_household_professions_vehicles import HOUSEHOLD, PROFESSIONS, VEHICLES
from cats_movies import MOVIES

CATEGORIES = [
  {"id": "animals", "name": "Animals", "varName": "animalsWords", "data": ANIMALS},
  {"id": "fruits", "name": "Fruits", "varName": "fruitsWords", "data": FRUITS},
  {"id": "vegetables", "name": "Vegetables", "varName": "vegetablesWords", "data": VEGETABLES},
  {"id": "household", "name": "Household Objects", "varName": "householdWords", "data": HOUSEHOLD},
  {"id": "birds", "name": "Birds", "varName": "birdsWords", "data": BIRDS},
  {"id": "insects", "name": "Insects", "varName": "insectsWords", "data": INSECTS},
  {"id": "countries", "name": "Countries", "varName": "countriesWords", "data": COUNTRIES},
  {"id": "cities", "name": "Cities", "varName": "citiesWords", "data": CITIES},
  {"id": "sports", "name": "Sports", "varName": "sportsWords", "data": SPORTS},
  {"id": "food", "name": "Food", "varName": "foodWords", "data": FOOD},
  {"id": "professions", "name": "Professions", "varName": "professionsWords", "data": PROFESSIONS},
  {"id": "vehicles", "name": "Vehicles", "varName": "vehiclesWords", "data": VEHICLES},
  {"id": "movies", "name": "Movies", "varName": "moviesWords", "data": MOVIES}
]

print("Starting high-speed concurrent dataset build...", flush=True)

# Collect all queries to pre-fetch concurrently
queries_to_fetch = set()
for cat in CATEGORIES:
    for entry in cat["data"]:
        word = entry["word"]
        if not entry.get("image"):
            queries_to_fetch.add(entry.get("query", word))
        for imp in entry.get("impostorWords", []):
            if not imp.get("image"):
                queries_to_fetch.add(imp.get("query", imp["word"]))

print(f"Total unique queries: {len(queries_to_fetch)}", flush=True)

with ThreadPoolExecutor(max_workers=30) as executor:
    list(executor.map(fetch_wiki_image, queries_to_fetch))

save_cache()
print("Concurrent image fetching completed!", flush=True)

all_word_images = {}
processed_categories = []

for cat in CATEGORIES:
    cat_id = cat["id"]
    cat_name = cat["name"]
    cat_entries = []
    
    for idx, entry in enumerate(cat["data"]):
        word = entry["word"]
        
        # Determine main image
        main_img = entry.get("image", "")
        if not main_img:
            query = entry.get("query", word)
            main_img = fetch_wiki_image(query)
            if not main_img:
                main_img = fetch_wiki_image(word)
        
        all_word_images[word.lower().strip()] = main_img
        
        # Process impostor words
        processed_impostors = []
        for imp in entry.get("impostorWords", []):
            imp_word = imp["word"]
            imp_img = imp.get("image", "")
            if not imp_img:
                imp_query = imp.get("query", imp_word)
                imp_img = fetch_wiki_image(imp_query)
                if not imp_img:
                    imp_img = fetch_wiki_image(imp_word)
            
            all_word_images[imp_word.lower().strip()] = imp_img
            processed_impostors.append({
                "word": imp_word,
                "image": imp_img,
                "hint": imp.get("hint", "")
            })
        
        hints = entry.get("hints", [])
        
        cat_entries.append({
            "category": cat_id,
            "word": word,
            "image": main_img,
            "impostorWords": processed_impostors,
            "impostorHints": hints
        })
    
    processed_categories.append({
        "id": cat_id,
        "varName": cat["varName"],
        "entries": cat_entries
    })

# 1. Write individual category files in src/data/*.ts
for cat in processed_categories:
    cat_id = cat["id"]
    var_name = cat["varName"]
    entries = cat["entries"]
    
    file_path = f"src/data/{cat_id}.ts"
    
    ts_code = f"import {{ WordEntry }} from '../types/game';\n\n"
    ts_code += f"export const {var_name}: WordEntry[] = [\n"
    
    for e in entries:
        ts_code += "  {\n"
        ts_code += f"    category: '{e['category']}',\n"
        ts_code += f"    word: {json.dumps(e['word'])},\n"
        ts_code += f"    image: {json.dumps(e['image'])},\n"
        ts_code += f"    impostorWords: [\n"
        for imp in e['impostorWords']:
            ts_code += f"      {{ word: {json.dumps(imp['word'])}, image: {json.dumps(imp['image'])} }},\n"
        ts_code += f"    ],\n"
        ts_code += f"    impostorHints: {json.dumps(e['impostorHints'])}\n"
        ts_code += "  },\n"
    
    ts_code += "];\n"
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(ts_code)
    print(f"[Success] Written {file_path} ({len(entries)} words)", flush=True)

# 2. Write src/data/wordImages.ts
word_images_ts = """// Centralized Deterministic Word to Image Mapping
// Every secret word and impostor word deterministically maps to its exact verified image.
// NEVER falls back to a random photo or category default photo.

import { CategoryId } from '../types/game';

export const WORD_IMAGE_MAP: Record<string, string> = {
"""

for k, v in sorted(all_word_images.items()):
    word_images_ts += f"  {json.dumps(k)}: {json.dumps(v)},\n"

word_images_ts += """};

// In-memory cache for fast runtime lookup
const memoryCache = new Map<string, string>();

/**
 * Clean complex word titles for deterministic lookup
 * e.g., "Buffalo (Water Buffalo)" -> "Buffalo", "Mango (Aam)" -> "Mango"
 */
export function normalizeWordKey(word: string): string {
  if (!word) return '';
  return word
    .toLowerCase()
    .replace(/\\s*\\(.*?\\)\\s*/g, '')
    .trim();
}

/**
 * Deterministically fetch the exact image for any word.
 * Returns null if no exact image exists. NEVER returns a random/category-level fallback.
 */
export function getImageForWord(word: string, _category?: CategoryId): string | null {
  if (!word) return null;

  const rawKey = word.trim().toLowerCase();
  const cleanKey = normalizeWordKey(word);

  if (memoryCache.has(rawKey)) {
    return memoryCache.get(rawKey)!;
  }

  // Exact match first
  if (WORD_IMAGE_MAP[rawKey]) {
    const url = WORD_IMAGE_MAP[rawKey];
    memoryCache.set(rawKey, url);
    return url;
  }

  // Normalized key match
  if (WORD_IMAGE_MAP[cleanKey]) {
    const url = WORD_IMAGE_MAP[cleanKey];
    memoryCache.set(rawKey, url);
    return url;
  }

  return null;
}

/**
 * Preload an array of image URLs to ensure instantaneous pass-the-phone display
 */
export function preloadImages(urls: (string | undefined | null)[]): void {
  if (typeof window === 'undefined') return;
  urls.forEach((url) => {
    if (url && typeof Image !== 'undefined') {
      const img = new Image();
      img.src = url;
    }
  });
}

/**
 * Validate that a word has an exact corresponding image in the dataset
 */
export function validateWordImage(word: string): boolean {
  return Boolean(getImageForWord(word));
}
"""

with open("src/data/wordImages.ts", "w", encoding="utf-8") as f:
    f.write(word_images_ts)
print("[Success] Written src/data/wordImages.ts", flush=True)

# 3. Update src/utils/imageService.ts to use wordImages.ts
image_service_ts = """import { CategoryId } from '../types/game';
import { getImageForWord } from '../data/wordImages';

/**
 * Clean complex word titles for image search
 */
export function extractCleanSearchTerm(word: string): string {
  if (!word) return '';
  let cleaned = word.trim();
  const matchParen = cleaned.match(/^(.*?)\\s*\\((.*?)\\)$/);
  if (matchParen) {
    const part1 = matchParen[1].trim();
    const part2 = matchParen[2].trim();
    if (part1.includes('/')) {
      const slashParts = part1.split('/');
      cleaned = slashParts[slashParts.length - 1].trim();
    } else {
      cleaned = part1;
    }
    if (!cleaned) cleaned = part2;
  }
  if (cleaned.includes('/')) {
    cleaned = cleaned.split('/')[0].trim();
  }
  cleaned = cleaned.replace(/\\s*\\(.*?\\)\\s*/g, '').trim();
  return cleaned || word;
}

/**
 * Fetch exact image for word. Returns null if not found.
 * NEVER returns a random category fallback.
 */
export async function fetchWikiThumbnail(
  word: string,
  category?: CategoryId
): Promise<string | null> {
  if (!word) return null;

  // 1. Check deterministic exact mapping first
  const mapped = getImageForWord(word, category);
  if (mapped) return mapped;

  // 2. Query Wikipedia API directly for the exact word
  try {
    const cleanTerm = extractCleanSearchTerm(word);
    let searchTitle = cleanTerm.replace(/\\s+/g, '_');
    if (category === 'movies') {
      searchTitle = `${searchTitle}_(film)`;
    }

    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTitle)}`,
      { headers: { Accept: 'application/json' } }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.thumbnail && data.thumbnail.source) {
        let src: string = data.thumbnail.source;
        src = src.replace(/\\/\\d+px-/, '/800px-');
        return src;
      }
    }
  } catch {}

  // Return null if unavailable (shows clean [Image unavailable] UI, never wrong photo)
  return null;
}
"""

with open("src/utils/imageService.ts", "w", encoding="utf-8") as f:
    f.write(image_service_ts)
print("[Success] Updated src/utils/imageService.ts", flush=True)

print("\n[Done] Master dataset build completed successfully!", flush=True)
