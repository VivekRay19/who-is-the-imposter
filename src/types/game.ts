export type CategoryId =
  | 'animals'
  | 'fruits'
  | 'vegetables'
  | 'countries'
  | 'cities'
  | 'sports'
  | 'food'
  | 'professions'
  | 'vehicles'
  | 'movies'
  | 'household'
  | 'birds'
  | 'insects';

export interface ImpostorWordOption {
  word: string;
  image?: string;
  hint?: string;
}

export interface WordEntry {
  id?: string;
  category: CategoryId;
  word: string;
  image?: string;
  hintSets?: [string, string][];
  impostorHints?: string[];
  impostorWords?: ImpostorWordOption[];
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  emoji: string;
  description: string;
  color: string;
  words: WordEntry[];
}

export interface Player {
  id: string;
  name: string;
  isImpostor: boolean;
  assignedWord: string;
  assignedWordImage?: string;
  assignedHints?: [string, string];
  assignedHint?: string;
  score: number;
  isEliminated: boolean;
}

export type GamePhase =
  | 'home'
  | 'categories'
  | 'setup'
  | 'pass_phone'
  | 'revealing'
  | 'all_revealed'
  | 'voting'
  | 'elimination_result'
  | 'reveal_results';

export interface GameSettings {
  playerCount: number;
  playerNames: string[];
  impostorCount: number;
  enabledCategories: CategoryId[];
  selectedCategory?: CategoryId;
  discussionMinutes: number;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
}

export interface EliminationOutcome {
  eliminatedPlayer: Player;
  remainingAliveCount: number;
  remainingImpostorsCount: number;
  isGameOver: boolean;
  isCrewVictorious: boolean;
}

export interface GameState {
  round: number;
  votingRound: number;
  phase: GamePhase;
  settings: GameSettings;
  players: Player[];
  revealOrder: number[];
  currentRevealIndex: number;
  isWordRevealed: boolean;
  mainWord: string;
  usedImpostorHints: string[];
  category: CategoryId;
  latestElimination: EliminationOutcome | null;
  history: string[];
}
