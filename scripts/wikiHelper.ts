import * as fs from 'fs';
import * as path from 'path';

// Let's create an asynchronous Wikipedia image fetcher with in-memory caching and fallback retries
const wikiCache = new Map<string, string>();

async function fetchWikiImage(query: string): Promise<string> {
  const clean = query.trim();
  if (wikiCache.has(clean)) return wikiCache.get(clean)!;

  // 1. Direct page summary query
  try {
    const formattedTitle = encodeURIComponent(clean.replace(/\s+/g, '_'));
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${formattedTitle}`, {
      headers: { 'User-Agent': 'ImpostorPartyGame/2.0 (game education tool)' }
    });
    if (res.ok) {
      const data: any = await res.json();
      if (data.thumbnail && data.thumbnail.source) {
        let src: string = data.thumbnail.source;
        src = src.replace(/\/\d+px-/, '/800px-');
        wikiCache.set(clean, src);
        return src;
      }
    }
  } catch {}

  // 2. Search generator API fallback
  try {
    const searchApiUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      clean
    )}&gsrlimit=1&prop=pageimages&pithumbsize=800&format=json&origin=*`;
    const res = await fetch(searchApiUrl, {
      headers: { 'User-Agent': 'ImpostorPartyGame/2.0 (game education tool)' }
    });
    if (res.ok) {
      const data: any = await res.json();
      if (data.query && data.query.pages) {
        const pages = Object.values(data.query.pages) as any[];
        if (pages.length > 0 && pages[0].thumbnail && pages[0].thumbnail.source) {
          const src: string = pages[0].thumbnail.source;
          wikiCache.set(clean, src);
          return src;
        }
      }
    }
  } catch {}

  console.warn(`⚠️ Could not resolve image for query: "${query}"`);
  return '';
}

export { fetchWikiImage };
