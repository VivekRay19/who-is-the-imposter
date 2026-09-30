import { CATEGORIES } from '../src/data/categories';
import { STATIC_IMAGE_MAP } from '../src/utils/imageMap';
import * as fs from 'fs';

console.log('Static image map keys count:', Object.keys(STATIC_IMAGE_MAP).length);

const allWords: { category: string; word: string; hasDirectMap: boolean }[] = [];

for (const cat of CATEGORIES) {
  for (const w of cat.words) {
    const raw = w.word.trim().toLowerCase();
    const clean = w.word.replace(/\s*\(.*?\)\s*/g, '').trim().toLowerCase();
    const hasDirectMap = Boolean(STATIC_IMAGE_MAP[raw] || STATIC_IMAGE_MAP[clean]);
    allWords.push({ category: cat.id, word: w.word, hasDirectMap });
  }
}

const missing = allWords.filter(w => !w.hasDirectMap);
console.log(`Total items: ${allWords.length}, Mapped: ${allWords.length - missing.length}, Missing: ${missing.length}`);

fs.writeFileSync('./scripts/all_words.json', JSON.stringify(allWords, null, 2));
