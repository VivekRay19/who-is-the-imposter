import json
import urllib.request
import urllib.parse
import os
import re
import sys
import threading
import time
import socket

socket.setdefaulttimeout(6)

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

CACHE_FILE = "scripts/wiki_cache.json"
wiki_cache = {}
cache_lock = threading.Lock()
fetch_count = 0

if os.path.exists(CACHE_FILE):
    try:
        with open(CACHE_FILE, "r", encoding="utf-8") as f:
            wiki_cache = json.load(f)
    except Exception:
        pass

def save_cache():
    with cache_lock:
        with open(CACHE_FILE, "w", encoding="utf-8") as f:
            json.dump(wiki_cache, f, indent=2)

def fetch_wiki_image(query):
    global fetch_count
    query = query.strip()
    if not query:
        return ""
    
    with cache_lock:
        if query in wiki_cache and wiki_cache[query]:
            return wiki_cache[query]
    
    headers = {'User-Agent': 'ImpostorTriviaBot/1.0 (contact@game.internal)'}
    
    # 1. Direct summary endpoint
    for attempt in range(2):
        try:
            title_enc = urllib.parse.quote(query.replace(' ', '_'))
            url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{title_enc}"
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=5) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                if 'thumbnail' in data and 'source' in data['thumbnail']:
                    src = data['thumbnail']['source']
                    src = re.sub(r'/\d+px-', '/800px-', src)
                    with cache_lock:
                        wiki_cache[query] = src
                        fetch_count += 1
                        if fetch_count % 30 == 0:
                            with open(CACHE_FILE, "w", encoding="utf-8") as f:
                                json.dump(wiki_cache, f, indent=2)
                    return src
        except urllib.error.HTTPError as e:
            if e.code == 429:
                time.sleep(0.3 * (attempt + 1))
                continue
            break
        except Exception:
            time.sleep(0.1)
            continue

    # 2. Search API (check top 5 results for thumbnail)
    for attempt in range(2):
        try:
            search_enc = urllib.parse.quote(query)
            url = f"https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch={search_enc}&gsrlimit=5&prop=pageimages&pithumbsize=800&format=json&origin=*"
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=5) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                if 'query' in data and 'pages' in data['query']:
                    pages = list(data['query']['pages'].values())
                    for page in pages:
                        if 'thumbnail' in page and 'source' in page['thumbnail']:
                            src = page['thumbnail']['source']
                            with cache_lock:
                                wiki_cache[query] = src
                                fetch_count += 1
                                if fetch_count % 10 == 0:
                                    with open(CACHE_FILE, "w", encoding="utf-8") as f:
                                        json.dump(wiki_cache, f, indent=2)
                            return src
        except urllib.error.HTTPError as e:
            if e.code == 429:
                time.sleep(0.3 * (attempt + 1))
                continue
            break
        except Exception:
            time.sleep(0.1)
            continue

    with cache_lock:
        wiki_cache[query] = ""
    return ""

print("Fetcher engine with socket timeout ready", flush=True)
