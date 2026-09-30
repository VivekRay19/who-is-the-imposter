import * as fs from 'fs';
import * as path from 'path';

// Definition of categories with main words and 4 related impostor words each
// Let's ensure exact subject matches for all 13 categories!
export interface CategoryDataDef {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  entries: {
    word: string;
    wikiQuery: string;
    impostorWords: { word: string; wikiQuery: string; hint: string }[];
    hints: string[];
  }[];
}

console.log('Script template ready');
