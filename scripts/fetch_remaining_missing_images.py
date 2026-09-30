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

from cats_animals_birds_insects import ANIMALS, BIRDS, INSECTS
from cats_fruits_veg_food import FRUITS, VEGETABLES, FOOD
from cats_countries_cities_sports import COUNTRIES, CITIES, SPORTS
from cats_household_professions_vehicles import HOUSEHOLD, PROFESSIONS, VEHICLES
from cats_movies import MOVIES

CATEGORIES = [
  ('animals', ANIMALS), ('fruits', FRUITS), ('vegetables', VEGETABLES),
  ('household', HOUSEHOLD), ('birds', BIRDS), ('insects', INSECTS),
  ('countries', COUNTRIES), ('cities', CITIES), ('sports', SPORTS),
  ('food', FOOD), ('professions', PROFESSIONS), ('vehicles', VEHICLES),
  ('movies', MOVIES)
]

def slugify(text):
    clean = re.sub(r'\s*\(.*?\)\s*', '', text)
    return re.sub(r'[^a-z0-9]+', '_', clean.lower()).strip('_')

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

missing_tasks = []
seen_dests = set()

for cat_id, data in CATEGORIES:
    for entry in data:
        word = entry['word']
        query = entry.get('query', word)
        slug = slugify(word) + '.jpg'
        dest = f'public/images/{cat_id}/{slug}'
        if (not os.path.exists(dest) or os.path.getsize(dest) < 1000) and dest not in seen_dests:
            seen_dests.add(dest)
            missing_tasks.append((cat_id, word, query, dest))
            
        for imp in entry.get('impostorWords', []):
            imp_word = imp['word']
            imp_query = imp.get('query', imp_word)
            imp_slug = slugify(imp_word) + '.jpg'
            imp_dest = f'public/images/{cat_id}/{imp_slug}'
            if (not os.path.exists(imp_dest) or os.path.getsize(imp_dest) < 1000) and imp_dest not in seen_dests:
                seen_dests.add(imp_dest)
                missing_tasks.append((cat_id, imp_word, imp_query, imp_dest))

print(f"Total missing images to fetch: {len(missing_tasks)}", flush=True)

def resolve_and_download(task):
    cat_id, word, query, dest = task
    
    # 1. Try search API for 600px thumbnail
    search_queries = [query, word]
    if cat_id == 'movies':
        search_queries.insert(0, f"{word} film")
    elif cat_id == 'countries':
        search_queries.insert(0, f"{word}")
        search_queries.append(f"Tourism in {word}")
    
    for sq in search_queries:
        try:
            search_enc = urllib.parse.quote(sq)
            url = f"https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch={search_enc}&gsrlimit=5&prop=pageimages&pithumbsize=600&format=json"
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=6) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                if 'query' in data and 'pages' in data['query']:
                    for page in data['query']['pages'].values():
                        if 'thumbnail' in page and 'source' in page['thumbnail']:
                            thumb_url = page['thumbnail']['source']
                            req2 = urllib.request.Request(thumb_url, headers=headers)
                            with urllib.request.urlopen(req2, timeout=8) as r2:
                                img_bytes = r2.read()
                                if len(img_bytes) > 500:
                                    with open(dest, 'wb') as f:
                                        f.write(img_bytes)
                                    return True
        except Exception:
            time.sleep(0.3)
            continue
            
    return False

with ThreadPoolExecutor(max_workers=8) as executor:
    results = list(executor.map(resolve_and_download, missing_tasks))

print(f"Successfully fetched and saved: {sum(1 for r in results if r)} / {len(missing_tasks)}", flush=True)
