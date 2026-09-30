import { initializeGame, processEliminationVote } from '../src/game/gameLogic';
import { GameSettings, CategoryId } from '../src/types/game';
import fs from 'fs';

console.log('=== RUNNING SCENARIO VALIDATION TESTS ===\n');

// Test 1: 6 players, 1 impostor, Animals
const settings1: GameSettings = {
  playerCount: 6,
  impostorCount: 1,
  playerNames: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'],
  discussionMinutes: 3,
  soundEnabled: false,
  hapticsEnabled: false,
  selectedCategory: 'animals',
  enabledCategories: ['animals']
};

const game1 = initializeGame(settings1);
console.log('--- TEST 1: 6 Players, 1 Impostor (Animals) ---');
console.log(`Main Word: ${game1.mainWord}`);

game1.players.forEach((p) => {
  if (p.isImpostor) {
    console.log(`Player: ${p.name} | Role: IMPOSTOR | Hint: "${p.assignedHint}" | Word: "${p.assignedWord}" (Hidden)`);
    if (!p.assignedHint || p.assignedHint.length < 2) {
      throw new Error(`Impostor did not receive a valid hint!`);
    }
  } else {
    const imageExists = fs.existsSync(`public${p.assignedWordImage}`);
    console.log(`Player: ${p.name} | Role: CREWMATE | Word: ${p.assignedWord} | Image Path: ${p.assignedWordImage} (File Exists: ${imageExists})`);
    if (!imageExists) {
      throw new Error(`Missing image file for ${p.assignedWord}: public${p.assignedWordImage}`);
    }
  }
});

// Test 2: 8 players, 2 impostors, Animals
const settings2: GameSettings = {
  playerCount: 8,
  impostorCount: 2,
  playerNames: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
  discussionMinutes: 3,
  soundEnabled: false,
  hapticsEnabled: false,
  selectedCategory: 'animals',
  enabledCategories: ['animals']
};

const game2 = initializeGame(settings2);
console.log('\n--- TEST 2: 8 Players, 2 Impostors (Animals) ---');
console.log(`Main Word: ${game2.mainWord}`);

const impostors2 = game2.players.filter(p => p.isImpostor);
console.log(`Total Impostors: ${impostors2.length}`);
impostors2.forEach((imp, idx) => {
  console.log(`Impostor ${idx + 1}: ${imp.name} -> Hint: "${imp.assignedHint}"`);
  if (!imp.assignedHint) {
    throw new Error(`Impostor ${idx + 1} did not receive a hint!`);
  }
});

if (impostors2[0].assignedHint === impostors2[1].assignedHint) {
  throw new Error(`Impostors received duplicate hint: ${impostors2[0].assignedHint}`);
}
console.log(`✓ 2 impostors received 2 different unique hints!`);

// Test 3: 10 players, 3 impostors, Fruits
const settings3: GameSettings = {
  playerCount: 10,
  impostorCount: 3,
  playerNames: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10'],
  discussionMinutes: 3,
  soundEnabled: false,
  hapticsEnabled: false,
  selectedCategory: 'fruits',
  enabledCategories: ['fruits']
};

const game3 = initializeGame(settings3);
console.log('\n--- TEST 3: 10 Players, 3 Impostors (Fruits) ---');
console.log(`Main Word: ${game3.mainWord}`);

const impostors3 = game3.players.filter(p => p.isImpostor);
console.log(`Total Impostors: ${impostors3.length}`);
const hints3 = new Set<string>();
impostors3.forEach((imp, idx) => {
  console.log(`Impostor ${idx + 1}: ${imp.name} -> Hint: "${imp.assignedHint}"`);
  if (!imp.assignedHint) {
    throw new Error(`Impostor ${idx + 1} did not receive a hint!`);
  }
  hints3.add(imp.assignedHint);
});

if (hints3.size !== 3) {
  throw new Error(`Duplicate hints found among 3 impostors!`);
}
console.log(`✓ 3 impostors received 3 different unique hints!`);

// Simulate voting out an impostor
const firstImpostor = impostors2[0];
const vote1 = processEliminationVote(game2, firstImpostor.id);
console.log(`\nSimulating Vote 1 (Voting out Impostor ${firstImpostor.name}):`);
console.log(`Outcome isGameOver: ${vote1.outcome.isGameOver} (Expected: false)`);
console.log(`Remaining alive players: ${vote1.outcome.remainingAliveCount}`);

if (vote1.outcome.isGameOver) {
  throw new Error('Game ended prematurely after 1 vote!');
}

console.log('\n--- TEST 3: Verification of Animals, Fruits, Birds, Food, Vegetables ---');
const priorityCats: CategoryId[] = ['animals', 'fruits', 'vegetables', 'birds', 'food'];

for (const cat of priorityCats) {
  const files = fs.readdirSync(`public/images/${cat}`);
  console.log(`Category: ${cat.padEnd(12)} -> Total image files on disk: ${files.length} ✓`);
}

console.log('\n🌟 ALL SCENARIO VALIDATION TESTS PASSED WITH 100% SUCCESS!');
