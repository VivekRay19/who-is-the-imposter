import { GameSettings, GameState, Player, WordEntry, CategoryId, EliminationOutcome } from '../types/game';
import { getCategoryById } from '../data/categories';
import { pickRandom, pickRandomDistinct } from './randomizer';
import { addRecentWord, loadRecentWords } from '../utils/storage';
import { preloadImages } from '../data/wordImages';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateSettings(settings: GameSettings): ValidationResult {
  if (settings.playerCount < 3) {
    return { isValid: false, error: 'You need at least 3 players to start the game.' };
  }
  if (settings.playerCount > 20) {
    return { isValid: false, error: 'Maximum 20 players supported.' };
  }

  const maxImpostors = Math.floor(settings.playerCount / 2);
  if (settings.impostorCount < 1) {
    return { isValid: false, error: 'You need at least 1 impostor.' };
  }
  if (settings.impostorCount > maxImpostors) {
    return {
      isValid: false,
      error: `For ${settings.playerCount} players, maximum ${maxImpostors} impostor${maxImpostors > 1 ? 's' : ''} allowed.`,
    };
  }

  if (!settings.enabledCategories || settings.enabledCategories.length === 0) {
    return { isValid: false, error: 'Please enable at least one category to play.' };
  }

  // Ensure clean player names & prevent duplicates
  const cleanedNames: string[] = [];
  for (let i = 0; i < settings.playerCount; i++) {
    const raw = settings.playerNames[i]?.trim();
    const name = raw && raw.length > 0 ? raw : `Player ${i + 1}`;
    cleanedNames.push(name);
  }

  const uniqueNames = new Set(cleanedNames.map((n) => n.toLowerCase()));
  if (uniqueNames.size !== cleanedNames.length) {
    return { isValid: false, error: 'Each player must have a unique name.' };
  }

  return { isValid: true };
}

export function initializeGame(
  settings: GameSettings,
  existingPlayers?: Player[],
  round: number = 1
): GameState {
  const enabled =
    settings.enabledCategories && settings.enabledCategories.length > 0
      ? settings.enabledCategories
      : (['animals'] as CategoryId[]);
  const chosenCategoryId: CategoryId = pickRandom(enabled);

  const categoryInfo = getCategoryById(chosenCategoryId);
  const recentWords = loadRecentWords();

  // Pick a main word, preferring one not recently played
  const eligibleWords = categoryInfo.words.filter(
    (w) => !recentWords.includes(w.word)
  );
  const chosenEntry: WordEntry =
    eligibleWords.length > 0
      ? pickRandom(eligibleWords)
      : pickRandom(categoryInfo.words);

  const mainWord = chosenEntry.word;
  const mainImage = chosenEntry.image || '';
  addRecentWord(mainWord);

  const requiredImpostors = Math.min(
    settings.impostorCount,
    Math.max(1, settings.playerCount - 1)
  );

  // Extract distinct single hints for each impostor from the chosen entry
  const availableHints =
    chosenEntry.impostorHints && chosenEntry.impostorHints.length > 0
      ? chosenEntry.impostorHints
      : ['Secret'];

  // Randomly select distinct hints so no two impostors receive the same hint in the round
  const selectedImpostorHints: string[] = pickRandomDistinct(
    availableHints,
    requiredImpostors
  );
  while (selectedImpostorHints.length < requiredImpostors) {
    selectedImpostorHints.push(pickRandom(availableHints));
  }

  // Preload round image (only main word image needed)
  const allRoundImages = [mainImage].filter(Boolean) as string[];
  preloadImages(allRoundImages);

  // Preserve existing cumulative scores
  const existingScoresMap = new Map<string, number>();
  if (existingPlayers) {
    existingPlayers.forEach((p, idx) => {
      existingScoresMap.set(p.name.toLowerCase(), p.score);
      existingScoresMap.set(`idx-${idx}`, p.score);
    });
  }

  const rawPlayers: { id: string; name: string; score: number }[] = [];
  for (let i = 0; i < settings.playerCount; i++) {
    const raw = settings.playerNames[i]?.trim();
    const name = raw && raw.length > 0 ? raw : `Player ${i + 1}`;
    const preservedScore =
      existingScoresMap.get(name.toLowerCase()) ??
      existingScoresMap.get(`idx-${i}`) ??
      0;
    rawPlayers.push({
      id: `p-${i + 1}`,
      name,
      score: preservedScore,
    });
  }

  // Randomly select which player indices are impostors
  const allIndices = Array.from({ length: settings.playerCount }, (_, i) => i);
  const impostorIndices = new Set(
    pickRandomDistinct(allIndices, requiredImpostors)
  );

  let impostorAssignIndex = 0;
  const players: Player[] = rawPlayers.map((p, idx) => {
    const isImpostor = impostorIndices.has(idx);
    let assignedWord = mainWord;
    let assignedWordImage: string | undefined = mainImage;
    let assignedHint: string | undefined = undefined;

    if (isImpostor) {
      const hint =
        selectedImpostorHints[impostorAssignIndex++] ||
        selectedImpostorHints[0];
      assignedWord = ''; // Impostor does NOT receive the secret word
      assignedWordImage = undefined; // Impostor does NOT receive the secret image
      assignedHint = hint; // Exactly ONE unique hint for this impostor
    }

    return {
      id: p.id,
      name: p.name,
      isImpostor,
      assignedWord,
      assignedWordImage,
      assignedHint,
      score: p.score,
      isEliminated: false,
    };
  });

  // Strict sequential order matching the entered names
  const revealOrder = Array.from({ length: settings.playerCount }, (_, i) => i);

  return {
    round,
    votingRound: 1,
    phase: 'pass_phone',
    settings: {
      ...settings,
      selectedCategory: chosenCategoryId,
    },
    players,
    revealOrder,
    currentRevealIndex: 0,
    isWordRevealed: false,
    mainWord,
    usedImpostorHints: selectedImpostorHints,
    category: chosenCategoryId,
    latestElimination: null,
    history: [mainWord, ...recentWords],
  };
}

export function processEliminationVote(
  gameState: GameState,
  eliminatedPlayerId: string
): { updatedPlayers: Player[]; outcome: EliminationOutcome } {
  // Mark player as eliminated
  let eliminatedPlayer: Player = gameState.players.find((p) => p.id === eliminatedPlayerId)!;

  const currentPlayers = gameState.players.map((p) => {
    if (p.id === eliminatedPlayerId) {
      eliminatedPlayer = { ...p, isEliminated: true };
      return eliminatedPlayer;
    }
    return p;
  });

  const alivePlayers = currentPlayers.filter((p) => !p.isEliminated);
  const aliveImpostors = alivePlayers.filter((p) => p.isImpostor);
  const aliveCrewmates = alivePlayers.filter((p) => !p.isImpostor);

  // Win Conditions:
  // 1. All impostors are eliminated -> Crew immediately wins!
  const allImpostorsEliminated = aliveImpostors.length === 0;

  // 2. Impostors win if they equal or outnumber alive crewmates, or if <= 2 players remain and an impostor is still alive
  const impostorsWon =
    aliveImpostors.length >= aliveCrewmates.length ||
    (alivePlayers.length <= 2 && aliveImpostors.length > 0);

  const isGameOver = allImpostorsEliminated || impostorsWon;
  const isCrewVictorious = allImpostorsEliminated;

  // Update scores when final game-ending condition is reached
  let finalPlayers = currentPlayers;
  if (isGameOver) {
    finalPlayers = currentPlayers.map((p) => {
      if (isCrewVictorious) {
        // Crew won: +1 pt to innocent crew members
        return {
          ...p,
          score: p.isImpostor ? p.score : p.score + 1,
        };
      } else {
        // Impostors won: +1 pt to impostors
        return {
          ...p,
          score: p.isImpostor ? p.score + 1 : p.score,
        };
      }
    });
  }

  const outcome: EliminationOutcome = {
    eliminatedPlayer,
    remainingAliveCount: alivePlayers.length,
    remainingImpostorsCount: aliveImpostors.length,
    isGameOver,
    isCrewVictorious,
  };

  return { updatedPlayers: finalPlayers, outcome };
}
