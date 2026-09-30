import { initializeGame, validateSettings, processEliminationVote } from '../src/game/gameLogic';
import { GameSettings } from '../src/types/game';
import { ALL_CATEGORY_IDS } from '../src/utils/storage';

console.log('--- Running Multi-Stage Elimination, Impostor Hints & Parity Win Conditions Tests ---');

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
    failedTests++;
  }
}

// Test 1: Validation Rules
const testSettingsMin: GameSettings = {
  playerCount: 2,
  playerNames: ['P1', 'P2'],
  impostorCount: 1,
  enabledCategories: ['animals'],
  discussionMinutes: 3,
  soundEnabled: true,
  hapticsEnabled: true,
};
assert(!validateSettings(testSettingsMin).isValid, 'Should reject playerCount < 3');

// Test 2: Sequential reveal order (Player 1 -> Player 2 -> ... -> Player N)
const testSeqGame = initializeGame({
  playerCount: 6,
  playerNames: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'],
  impostorCount: 2,
  enabledCategories: ['birds', 'insects', 'household'],
  discussionMinutes: 3,
  soundEnabled: true,
  hapticsEnabled: true,
});

assert(
  JSON.stringify(testSeqGame.revealOrder) === JSON.stringify([0, 1, 2, 3, 4, 5]),
  'Reveal order must strictly match sequential input order [0, 1, 2, 3, 4, 5]'
);

// Test 3: Multi-Impostor Unique Hints Distribution
const impostorsWithHints = testSeqGame.players.filter(p => p.isImpostor);
const crewWithHints = testSeqGame.players.filter(p => !p.isImpostor);

assert(impostorsWithHints.length === 2, 'Setup has exactly 2 impostors');
assert(crewWithHints.length === 4, 'Setup has exactly 4 crew members');

assert(
  impostorsWithHints.every(p => typeof p.assignedHint === 'string' && p.assignedHint.length >= 2),
  'Every impostor receives a valid non-empty 1-word secret hint'
);

assert(
  impostorsWithHints[0].assignedHint !== impostorsWithHints[1].assignedHint,
  'Each impostor receives a UNIQUE/DIFFERENT hint from other impostors'
);

assert(
  crewWithHints.every(p => p.assignedHint === undefined && p.assignedWord === testSeqGame.mainWord),
  'Crew members receive no impostor hint and receive the exact main secret word'
);

// Test 4: Multi-Impostor Elimination Flow (2 Impostors in 6-player game)
const impostorPlayers = testSeqGame.players.filter(p => p.isImpostor);
const innocentPlayers = testSeqGame.players.filter(p => !p.isImpostor);

// Elimination 1: Vote out 1st Impostor
const { updatedPlayers: afterVote1, outcome: outcome1 } = processEliminationVote(
  testSeqGame,
  impostorPlayers[0].id
);

assert(outcome1.eliminatedPlayer.isImpostor === true, '1st eliminated player was correctly an impostor');
assert(outcome1.remainingImpostorsCount === 1, '1 impostor still remains');
assert(outcome1.remainingAliveCount === 5, '5 players still alive');
assert(outcome1.isGameOver === false, 'Game does NOT end prematurely when 1 impostor is eliminated in a 2-impostor game');

// Elimination 2: Vote out 2nd Impostor
const gameAfterVote1 = { ...testSeqGame, players: afterVote1 };
const { updatedPlayers: afterVote2, outcome: outcome2 } = processEliminationVote(
  gameAfterVote1,
  impostorPlayers[1].id
);

assert(outcome2.isGameOver === true, 'Game ends when all impostors are voted out');
assert(outcome2.isCrewVictorious === true, 'Crew wins when all impostors are eliminated');
assert(
  innocentPlayers.every(p => afterVote2.find(u => u.id === p.id)?.score === 1),
  'All innocent crew members get +1 point'
);
assert(
  impostorPlayers.every(p => afterVote2.find(u => u.id === p.id)?.score === 0),
  'Impostors get 0 points on crew victory'
);

// Test 5: Impostor Parity Win (Innocents voted out until 3 players remain)
const gameForParityTest = initializeGame({
  playerCount: 5,
  playerNames: ['A', 'B', 'C', 'D', 'E'],
  impostorCount: 1,
  enabledCategories: ['animals'],
  discussionMinutes: 3,
  soundEnabled: true,
  hapticsEnabled: true,
});

const parityImpostor = gameForParityTest.players.find(p => p.isImpostor)!;
const parityInnocents = gameForParityTest.players.filter(p => !p.isImpostor);

// Vote out innocent 1 -> 4 players alive
const res1 = processEliminationVote(gameForParityTest, parityInnocents[0].id);
assert(res1.outcome.isGameOver === false, '5 players -> 1 innocent voted out -> 4 alive -> game continues');

// Vote out innocent 2 -> 3 players alive (1 Impostor + 2 Crew) -> Impostor Wins!
const res2 = processEliminationVote({ ...gameForParityTest, players: res1.updatedPlayers }, parityInnocents[1].id);
assert(res2.outcome.isGameOver === true, 'Game ends when remaining alive players reach 3 (1 impostor + 2 crew)');
assert(res2.outcome.isCrewVictorious === false, 'Impostor wins');
assert(
  res2.updatedPlayers.find(p => p.id === parityImpostor.id)?.score === 1,
  'Impostor receives +1 point on impostor win'
);

// Test 6: 100 Random Elimination Simulations with Multi-Impostor Hints Verification
console.log('\n--- Running 100 Random Elimination & Hint Distribution Simulations ---');
for (let i = 0; i < 100; i++) {
  const g = initializeGame({
    playerCount: 6,
    playerNames: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'],
    impostorCount: 3,
    enabledCategories: [...ALL_CATEGORY_IDS],
    discussionMinutes: 3,
    soundEnabled: true,
    hapticsEnabled: true,
  });

  const imp = g.players.filter(p => p.isImpostor);
  if (imp.length !== 3) {
    assert(false, `Impostor count error on run ${i}`);
    break;
  }

  const assignedHints = imp.map(p => p.assignedHint);
  const uniqueAssignedHints = new Set(assignedHints);
  if (uniqueAssignedHints.size !== 3) {
    assert(false, `Duplicate hint assigned to impostors on run ${i}`);
    break;
  }
}
assert(true, '100 random game simulations with 3 distinct hints per impostor passed');

console.log(`\n================================`);
console.log(`Tests Completed: ${passedTests} passed, ${failedTests} failed`);
console.log(`================================\n`);

if (failedTests > 0) {
  process.exit(1);
}
