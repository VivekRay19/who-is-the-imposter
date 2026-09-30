import os
import sys
import json
import re
import urllib.request
import urllib.parse
import time
from concurrent.futures import ThreadPoolExecutor

sys.path.append(os.path.dirname(__file__))

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

with open('scripts/wiki_cache.json', 'r', encoding='utf-8') as f:
    cache = json.load(f)

from cats_animals_birds_insects import ANIMALS, BIRDS, INSECTS
from cats_fruits_veg_food import FRUITS, VEGETABLES, FOOD
from cats_countries_cities_sports import COUNTRIES, CITIES, SPORTS
from cats_household_professions_vehicles import HOUSEHOLD, PROFESSIONS, VEHICLES
from cats_movies import MOVIES

CATEGORIES = [
  {'id': 'animals', 'name': 'Animals', 'varName': 'animalsWords', 'data': ANIMALS},
  {'id': 'fruits', 'name': 'Fruits', 'varName': 'fruitsWords', 'data': FRUITS},
  {'id': 'vegetables', 'name': 'Vegetables', 'varName': 'vegetablesWords', 'data': VEGETABLES},
  {'id': 'household', 'name': 'Household Objects', 'varName': 'householdWords', 'data': HOUSEHOLD},
  {'id': 'birds', 'name': 'Birds', 'varName': 'birdsWords', 'data': BIRDS},
  {'id': 'insects', 'name': 'Insects', 'varName': 'insectsWords', 'data': INSECTS},
  {'id': 'countries', 'name': 'Countries', 'varName': 'countriesWords', 'data': COUNTRIES},
  {'id': 'cities', 'name': 'Cities', 'varName': 'citiesWords', 'data': CITIES},
  {'id': 'sports', 'name': 'Sports', 'varName': 'sportsWords', 'data': SPORTS},
  {'id': 'food', 'name': 'Food', 'varName': 'foodWords', 'data': FOOD},
  {'id': 'professions', 'name': 'Professions', 'varName': 'professionsWords', 'data': PROFESSIONS},
  {'id': 'vehicles', 'name': 'Vehicles', 'varName': 'vehiclesWords', 'data': VEHICLES},
  {'id': 'movies', 'name': 'Movies', 'varName': 'moviesWords', 'data': MOVIES}
]

def slugify(text):
    clean = re.sub(r'\s*\(.*?\)\s*', '', text)
    return re.sub(r'[^a-z0-9]+', '_', clean.lower()).strip('_')

def to_direct_wiki_url(thumb_url):
    if not thumb_url:
        return ""
    thumb_url = thumb_url.split('?')[0]
    if '/thumb/' in thumb_url:
        parts = thumb_url.replace('/thumb/', '/').rsplit('/', 1)
        return parts[0]
    return thumb_url

headers = {'User-Agent': 'ImpostorApp/1.0 (local-party-game@offline.app)'}

tasks = []
seen_dests = set()

for cat in CATEGORIES:
    cat_id = cat['id']
    os.makedirs(f'public/images/{cat_id}', exist_ok=True)
    for entry in cat['data']:
        word = entry['word']
        query = entry.get('query', word)
        raw_url = entry.get('image') or cache.get(query) or cache.get(word) or cache.get(word.lower())
        url = to_direct_wiki_url(raw_url)
        slug = slugify(word) + '.jpg'
        dest = f'public/images/{cat_id}/{slug}'
        if url and dest not in seen_dests:
            seen_dests.add(dest)
            tasks.append((url, dest, word))
            
        for imp in entry.get('impostorWords', []):
            imp_word = imp['word']
            imp_query = imp.get('query', imp_word)
            imp_raw_url = imp.get('image') or cache.get(imp_query) or cache.get(imp_word) or cache.get(imp_word.lower())
            imp_url = to_direct_wiki_url(imp_raw_url)
            imp_slug = slugify(imp_word) + '.jpg'
            imp_dest = f'public/images/{cat_id}/{imp_slug}'
            if imp_url and imp_dest not in seen_dests:
                seen_dests.add(imp_dest)
                tasks.append((imp_url, imp_dest, imp_word))

print(f"Total unique images to download: {len(tasks)}", flush=True)

completed = 0

def download_file(item):
    global completed
    url, dest, word = item
    if os.path.exists(dest) and os.path.getsize(dest) > 1000:
        completed += 1
        return True
    for attempt in range(5):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=12) as resp:
                data = resp.read()
                if len(data) > 500:
                    with open(dest, 'wb') as f:
                        f.write(data)
                    completed += 1
                    if completed % 25 == 0:
                        print(f"Progress: {completed}/{len(tasks)} images saved", flush=True)
                    return True
        except urllib.error.HTTPError as e:
            if e.code == 429:
                time.sleep(1.5 * (attempt + 1))
            else:
                break
        except Exception:
            time.sleep(0.5 * (attempt + 1))
    return False

with ThreadPoolExecutor(max_workers=8) as executor:
    results = list(executor.map(download_file, tasks))

success_count = sum(1 for r in results if r)
print(f"Downloaded successfully: {success_count} / {len(tasks)}", flush=True)

# Generate category files
all_word_images = {}

for cat in CATEGORIES:
    cat_id = cat['id']
    cat_entries = []
    
    for entry in cat['data']:
        word = entry['word']
        slug = slugify(word) + '.jpg'
        local_path = f"/images/{cat_id}/{slug}"
        
        all_word_images[word.lower().strip()] = local_path
        all_word_images[slugify(word)] = local_path
        
        processed_impostors = []
        for imp in entry.get('impostorWords', []):
            imp_word = imp['word']
            imp_slug = slugify(imp_word) + '.jpg'
            imp_local_path = f"/images/{cat_id}/{imp_slug}"
            all_word_images[imp_word.lower().strip()] = imp_local_path
            all_word_images[slugify(imp_word)] = imp_local_path
            
            processed_impostors.append({
                "word": imp_word,
                "image": imp_local_path,
                "hint": imp.get("hint", "")
            })
            
        cat_entries.append({
            "category": cat_id,
            "word": word,
            "image": local_path,
            "impostorWords": processed_impostors,
            "impostorHints": entry.get("hints", [])
        })

    # Write src/data/{cat_id}.ts
    file_path = f"src/data/{cat_id}.ts"
    ts_code = f"import {{ WordEntry }} from '../types/game';\n\n"
    ts_code += f"export const {cat['varName']}: WordEntry[] = [\n"
    
    for e in cat_entries:
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
    print(f"[Success] Written {file_path} with local paths", flush=True)

# Write src/data/wordImages.ts
word_images_ts = """// Centralized Deterministic Local Word to Image Mapping
// All images are bundled locally in /public/images/ for 100% reliable offline gameplay.

import { CategoryId } from '../types/game';

export const WORD_IMAGE_MAP: Record<string, string> = {
"""

for k, v in sorted(all_word_images.items()):
    word_images_ts += f"  {json.dumps(k)}: {json.dumps(v)},\n"

word_images_ts += """};

const memoryCache = new Map<string, string>();

export function normalizeWordKey(word: string): string {
  if (!word) return '';
  return word
    .toLowerCase()
    .replace(/\\s*\\(.*?\\)\\s*/g, '')
    .trim();
}

export function getImageForWord(word: string, _category?: CategoryId): string | null {
  if (!word) return null;

  const rawKey = word.trim().toLowerCase();
  const cleanKey = normalizeWordKey(word);
  const slugKey = cleanKey.replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

  if (memoryCache.has(rawKey)) {
    return memoryCache.get(rawKey)!;
  }

  if (WORD_IMAGE_MAP[rawKey]) {
    const url = WORD_IMAGE_MAP[rawKey];
    memoryCache.set(rawKey, url);
    return url;
  }

  if (WORD_IMAGE_MAP[cleanKey]) {
    const url = WORD_IMAGE_MAP[cleanKey];
    memoryCache.set(rawKey, url);
    return url;
  }

  if (WORD_IMAGE_MAP[slugKey]) {
    const url = WORD_IMAGE_MAP[slugKey];
    memoryCache.set(rawKey, url);
    return url;
  }

  return null;
}

export function preloadImages(urls: (string | undefined | null)[]): void {
  if (typeof window === 'undefined') return;
  urls.forEach((url) => {
    if (url && typeof Image !== 'undefined') {
      const img = new Image();
      img.src = url;
    }
  });
}

export function validateWordImage(word: string): boolean {
  return Boolean(getImageForWord(word));
}
"""

with open("src/data/wordImages.ts", "w", encoding="utf-8") as f:
    f.write(word_images_ts)

print("[Success] Written src/data/wordImages.ts with local paths", flush=True)
