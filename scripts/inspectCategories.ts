import { CATEGORIES } from '../src/data/categories';
import fs from 'fs';

const hints = JSON.parse(fs.readFileSync('scripts/natural_hints.json', 'utf-8'));
let totalMissing = 0;

for (const cat of CATEGORIES) {
  cat.words.forEach((w) => {
    if (!hints[w.word]) {
      console.log(`Missing in ${cat.name}: "${w.word}"`);
      totalMissing++;
    }
  });
}

console.log(`Total missing main words: ${totalMissing}`);
