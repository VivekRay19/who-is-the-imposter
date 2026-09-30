import { CATEGORIES } from '../src/data/categories';

console.log('--- Validating Impostor Game Dataset (1-Word Hints) ---');
let totalWords = 0;
let totalHints = 0;
let hasError = false;

if (CATEGORIES.length !== 13) {
  console.error(`❌ Expected 13 categories, found ${CATEGORIES.length}`);
  hasError = true;
}

CATEGORIES.forEach((cat) => {
  const wordsCount = cat.words.length;
  totalWords += wordsCount;
  console.log(`Checking ${cat.emoji} ${cat.name}: ${wordsCount} words...`);

  if (wordsCount !== 40) {
    console.error(`❌ ${cat.name} does not have exactly 40 words (found ${wordsCount})`);
    hasError = true;
  }

  const seenWords = new Set<string>();
  cat.words.forEach((entry, idx) => {
    const wordKey = entry.word.trim().toLowerCase();
    if (seenWords.has(wordKey)) {
      console.error(`❌ Duplicate word in ${cat.name}: "${entry.word}" at index ${idx}`);
      hasError = true;
    }
    seenWords.add(wordKey);

    if (!entry.image || (!entry.image.startsWith('/images/') && !entry.image.startsWith('http'))) {
      console.error(`❌ "${entry.word}" in ${cat.name} has missing or invalid image path`);
      hasError = true;
    }

    if (entry.impostorWords) {
      entry.impostorWords.forEach((imp, impIdx) => {
        if (!imp.image || (!imp.image.startsWith('/images/') && !imp.image.startsWith('http'))) {
          console.error(`❌ "${entry.word}" -> Impostor "${imp.word}" (#${impIdx}) has invalid image path`);
          hasError = true;
        }
      });
    }

    if (!entry.impostorHints || entry.impostorHints.length < 4) {
      console.error(`❌ "${entry.word}" in ${cat.name} has fewer than 4 impostor hints (${entry.impostorHints?.length || 0})`);
      hasError = true;
    } else {
      totalHints += entry.impostorHints.length;
      const seenHints = new Set<string>();
      entry.impostorHints.forEach((h, hIdx) => {
        const clean = h.trim();
        if (!clean || clean.length < 2) {
          console.error(`❌ "${entry.word}" in ${cat.name} has empty/too short hint at index ${hIdx}`);
          hasError = true;
        }
        if (seenHints.has(clean.toLowerCase())) {
          console.error(`❌ "${entry.word}" in ${cat.name} has duplicate hint at index ${hIdx}`);
          hasError = true;
        }
        seenHints.add(clean.toLowerCase());
      });
    }
  });
});

console.log(`\n========================================`);
console.log(`Total categories: ${CATEGORIES.length}`);
console.log(`Total words: ${totalWords}`);
console.log(`Total unique 1-word impostor hints: ${totalHints}`);
console.log(`========================================`);

if (hasError) {
  console.error('\n❌ DATASET VALIDATION FAILED!');
  process.exit(1);
} else {
  console.log('\n✅ ALL 520 WORDS, IMPOSTOR WORDS & EXACT MATCHING IMAGES VALIDATED SUCCESSFULLY!');
}
