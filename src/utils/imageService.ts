import { CategoryId } from '../types/game';
import { getImageForWord } from '../data/wordImages';

/**
 * Clean complex word titles for image search
 */
export function extractCleanSearchTerm(word: string): string {
  if (!word) return '';
  let cleaned = word.trim();
  const matchParen = cleaned.match(/^(.*?)\s*\((.*?)\)$/);
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
  cleaned = cleaned.replace(/\s*\(.*?\)\s*/g, '').trim();
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
    let searchTitle = cleanTerm.replace(/\s+/g, '_');
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
        src = src.replace(/\/\d+px-/, '/800px-');
        return src;
      }
    }
  } catch {}

  // Return null if unavailable (shows clean [Image unavailable] UI, never wrong photo)
  return null;
}
