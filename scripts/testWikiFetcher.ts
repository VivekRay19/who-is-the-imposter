import { CATEGORIES } from '../src/data/categories';
import * as fs from 'fs';

// Helper to query Wikipedia REST API for a high-res thumbnail
async function getWikiImage(title: string): Promise<string | null> {
  try {
    const formattedTitle = encodeURIComponent(title.replace(/\s+/g, '_'));
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${formattedTitle}`, {
      headers: { 'User-Agent': 'ImpostorGame/2.0 (education game)' }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.thumbnail && data.thumbnail.source) {
        // Upgrade thumbnail size to 800px if it's a wikimedia url
        let src: string = data.thumbnail.source;
        src = src.replace(/\/\d+px-/, '/800px-');
        return src;
      }
    }
  } catch (e) {
    // ignore
  }
  return null;
}

// Let's test a few words like Buffalo, Bison, Cow, Tiger, Apple, Pizza, Doctor, Motorcycle
async function test() {
  const words = ['Water buffalo', 'American bison', 'Cow', 'Bengal tiger', 'Apple', 'Pizza', 'Physician', 'Motorcycle'];
  for (const w of words) {
    const img = await getWikiImage(w);
    console.log(`${w}:`, img);
  }
}

test();
