import json
import urllib.request
import urllib.parse
import os
import re
import time

CACHE_FILE = "scripts/wiki_cache.json"
wiki_cache = {}
if os.path.exists(CACHE_FILE):
    try:
        with open(CACHE_FILE, "r", encoding="utf-8") as f:
            wiki_cache = json.load(f)
    except Exception:
        pass

def save_cache():
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(wiki_cache, f, indent=2)

def fetch_wiki_image(query):
    query = query.strip()
    if query in wiki_cache and wiki_cache[query]:
        return wiki_cache[query]
    
    # Direct summary endpoint
    try:
        title_enc = urllib.parse.quote(query.replace(' ', '_'))
        url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{title_enc}"
        req = urllib.request.Request(url, headers={'User-Agent': 'ImpostorPartyGame/2.0 (edu tool)'})
        with urllib.request.urlopen(req, timeout=6) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            if 'thumbnail' in data and 'source' in data['thumbnail']:
                src = data['thumbnail']['source']
                src = re.sub(r'/\d+px-', '/800px-', src)
                wiki_cache[query] = src
                return src
    except Exception:
        pass

    # Search API
    try:
        search_enc = urllib.parse.quote(query)
        url = f"https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch={search_enc}&gsrlimit=1&prop=pageimages&pithumbsize=800&format=json&origin=*"
        req = urllib.request.Request(url, headers={'User-Agent': 'ImpostorPartyGame/2.0 (edu tool)'})
        with urllib.request.urlopen(req, timeout=6) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            if 'query' in data and 'pages' in data['query']:
                pages = list(data['query']['pages'].values())
                if len(pages) > 0 and 'thumbnail' in pages[0] and 'source' in pages[0]['thumbnail']:
                    src = pages[0]['thumbnail']['source']
                    wiki_cache[query] = src
                    return src
    except Exception:
        pass

    return ""

print("Fetcher ready with caching")
