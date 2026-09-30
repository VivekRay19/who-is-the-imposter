import json
import urllib.request
import urllib.parse
import os
import re
import time

WIKI_CACHE = {}

def get_wiki_image(query):
    query = query.strip()
    if query in WIKI_CACHE:
        return WIKI_CACHE[query]
    
    # Try summary endpoint
    try:
        title_enc = urllib.parse.quote(query.replace(' ', '_'))
        url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{title_enc}"
        req = urllib.request.Request(url, headers={'User-Agent': 'ImpostorPartyGame/2.0 (game education tool)'})
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            if 'thumbnail' in data and 'source' in data['thumbnail']:
                src = data['thumbnail']['source']
                src = re.sub(r'/\d+px-', '/800px-', src)
                WIKI_CACHE[query] = src
                return src
    except Exception:
        pass
    
    # Try search query generator endpoint
    try:
        search_enc = urllib.parse.quote(query)
        url = f"https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch={search_enc}&gsrlimit=1&prop=pageimages&pithumbsize=800&format=json&origin=*"
        req = urllib.request.Request(url, headers={'User-Agent': 'ImpostorPartyGame/2.0 (game education tool)'})
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            if 'query' in data and 'pages' in data['query']:
                pages = list(data['query']['pages'].values())
                if len(pages) > 0 and 'thumbnail' in pages[0] and 'source' in pages[0]['thumbnail']:
                    src = pages[0]['thumbnail']['source']
                    WIKI_CACHE[query] = src
                    return src
    except Exception:
        pass

    return ""

print("Wiki fetcher ready")
