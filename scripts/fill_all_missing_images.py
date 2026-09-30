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

print(f"Total missing images to fetch: {len(missing_tasks)}", flush=True)

def fetch_and_save(task):
    cat_id, word, query, dest, direct_url = task
    
    # 1. If direct url in cache / data
    urls_to_try = []
    if direct_url:
        urls_to_try.append(direct_url)
    
    cached = cache.get(query) or cache.get(word) or cache.get(word.lower())
    if cached:
        urls_to_try.append(cached)
        
    for u in urls_to_try:
        # Try both direct and thumb
        candidates = [u]
        if '/thumb/' in u:
            # direct raw
            raw = u.split('?')[0].replace('/thumb/', '/').rsplit('/', 1)[0]
            candidates.append(raw)
        for cand in candidates:
            try:
                req = urllib.request.Request(cand, headers=headers)
                with urllib.request.urlopen(req, timeout=7) as resp:
                    b = resp.read()
                    if len(b) > 500:
                        with open(dest, 'wb') as f:
                            f.write(b)
                        return True
            except Exception:
                pass

    # 2. Search Wikipedia pageimages API
    search_queries = [query, word]
    if cat_id == 'movies':
        search_queries = [f"{word} film poster", f"{word} (film)", word]
    elif cat_id == 'countries':
        search_queries = [f"{word} country", f"{word} landscape", word]
    elif cat_id == 'birds':
        search_queries = [f"{word} bird", word]
    elif cat_id == 'food':
        search_queries = [f"{word} dish", f"{word} food", word]
    elif cat_id == 'insects':
        search_queries = [f"{word} insect", word]
    elif cat_id == 'household':
        search_queries = [f"{word} appliance", f"{word} furniture", word]

    for sq in search_queries:
        try:
            search_enc = urllib.parse.quote(sq)
            url = f"https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch={search_enc}&gsrlimit=6&prop=pageimages&pithumbsize=600&format=json"
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=7) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                if 'query' in data and 'pages' in data['query']:
                    pages = list(data['query']['pages'].values())
                    for page in pages:
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

with ThreadPoolExecutor(max_workers=10) as executor:
    results = list(executor.map(fetch_and_save, missing_tasks))

success = sum(1 for r in results if r)
print(f"Downloaded and saved: {success} / {len(missing_tasks)}", flush=True)
