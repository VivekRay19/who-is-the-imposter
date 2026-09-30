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
  ('birds', BIRDS), ('food', FOOD), ('household', HOUSEHOLD),
  ('insects', INSECTS), ('countries', COUNTRIES), ('cities', CITIES),
  ('sports', SPORTS), ('professions', PROFESSIONS), ('vehicles', VEHICLES),
  ('movies', MOVIES)
]

def slugify(text):
    clean = re.sub(r'\s*\(.*?\)\s*', '', text)
    return re.sub(r'[^a-z0-9]+', '_', clean.lower()).strip('_')

headers = {'User-Agent': 'ImpostorApp/1.0 (local-party-game@offline.app)'}

missing_tasks = []
seen_dests = set()

for cat_id, data in CATEGORIES:
    os.makedirs(f'public/images/{cat_id}', exist_ok=True)
    for entry in data:
        word = entry['word']
        query = entry.get('query', word)
        slug = slugify(word) + '.jpg'
        dest = f'public/images/{cat_id}/{slug}'
        if (not os.path.exists(dest) or os.path.getsize(dest) < 500) and dest not in seen_dests:
            seen_dests.add(dest)
            missing_tasks.append((cat_id, word, query, dest, entry.get('image')))
            
        for imp in entry.get('impostorWords', []):
            imp_word = imp['word']
            imp_query = imp.get('query', imp_word)
            imp_slug = slugify(imp_word) + '.jpg'
            imp_dest = f'public/images/{cat_id}/{imp_slug}'
            if (not os.path.exists(imp_dest) or os.path.getsize(imp_dest) < 500) and imp_dest not in seen_dests:
                seen_dests.add(imp_dest)
                missing_tasks.append((cat_id, imp_word, imp_query, imp_dest, imp.get('image')))

print(f"Total missing images to download: {len(missing_tasks)}", flush=True)

def fetch_image_bytes(url):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=8) as resp:
            b = resp.read()
            if len(b) > 500:
                return b
    except Exception:
        pass
    return None

def resolve_and_save(task):
    cat_id, word, query, dest, direct_url = task
    
    # 1. Direct URL if given
    if direct_url and direct_url.startswith('http'):
        b = fetch_image_bytes(direct_url)
        if b:
            with open(dest, 'wb') as f:
                f.write(b)
            return True

    # 2. Try Wikipedia Summary API
    queries_to_try = [query, word]
    if cat_id == 'movies':
        queries_to_try = [f"{word}_(film)", f"{word}_(2022_film)", f"{word}_(2023_film)", word]
    elif cat_id == 'birds':
        queries_to_try = [query, f"{word}_(bird)", word]
    elif cat_id == 'countries':
        queries_to_try = [word, query, f"Geography_of_{word}"]
    elif cat_id == 'food':
        queries_to_try = [query, f"{word}_(food)", word]
    elif cat_id == 'household':
        queries_to_try = [query, word]

    for q in queries_to_try:
        try:
            title_enc = urllib.parse.quote(q.replace(' ', '_'))
            sum_url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{title_enc}"
            req = urllib.request.Request(sum_url, headers=headers)
            with urllib.request.urlopen(req, timeout=6) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                if 'thumbnail' in data and 'source' in data['thumbnail']:
                    thumb_url = data['thumbnail']['source']
                    b = fetch_image_bytes(thumb_url)
                    if b:
                        with open(dest, 'wb') as f:
                            f.write(b)
                        return True
        except Exception:
            pass

    # 3. Wikipedia search generator
    for q in [query, word, f"{word} {cat_id}"]:
        try:
            search_enc = urllib.parse.quote(q)
            search_url = f"https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch={search_enc}&gsrlimit=5&prop=pageimages&pithumbsize=600&format=json"
            req = urllib.request.Request(search_url, headers=headers)
            with urllib.request.urlopen(req, timeout=6) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                if 'query' in data and 'pages' in data['query']:
                    for page in data['query']['pages'].values():
                        if 'thumbnail' in page and 'source' in page['thumbnail']:
                            thumb_url = page['thumbnail']['source']
                            b = fetch_image_bytes(thumb_url)
                            if b:
                                with open(dest, 'wb') as f:
                                    f.write(b)
                                return True
        except Exception:
            pass

    return False

with ThreadPoolExecutor(max_workers=8) as executor:
    results = list(executor.map(resolve_and_save, missing_tasks))

success = sum(1 for r in results if r)
print(f"Successfully downloaded: {success} / {len(missing_tasks)}", flush=True)
