import { CATEGORIES } from '../src/data/categories';
import * as fs from 'fs';

const summary: Record<string, any[]> = {};
for (const cat of CATEGORIES) {
  summary[cat.id] = cat.words.map(w => ({
    word: w.word,
    hints: w.impostorHints
  }));
}

fs.writeFileSync('./scripts/current_category_words.json', JSON.stringify(summary, null, 2));
console.log('Saved current_category_words.json');
