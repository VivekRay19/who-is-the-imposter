import { GameSettings, CategoryId } from '../types/game';

const SETTINGS_KEY = 'impostor_game_settings';
const RECENT_WORDS_KEY = 'impostor_recent_words';

export const ALL_CATEGORY_IDS: CategoryId[] = [
  'animals',
  'fruits',
  'vegetables',
  'household',
  'birds',
  'insects',
  'countries',
  'cities',
  'sports',
  'food',
  'professions',
  'vehicles',
  'movies',
];

export const DEFAULT_SETTINGS: GameSettings = {
  playerCount: 5,
  playerNames: ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5'],
  impostorCount: 1,
  enabledCategories: [...ALL_CATEGORY_IDS],
  selectedCategory: 'animals',
  discussionMinutes: 3,
  soundEnabled: true,
  hapticsEnabled: true,
};

export function loadSettings(): GameSettings {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          enabledCategories:
            parsed.enabledCategories && parsed.enabledCategories.length > 0
              ? parsed.enabledCategories
              : [...ALL_CATEGORY_IDS],
        };
      }
    }
  } catch (e) {
    console.error('Failed to load settings from storage', e);
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: GameSettings): void {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }
  } catch (e) {
    console.error('Failed to save settings to storage', e);
  }
}

export function loadRecentWords(): string[] {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(RECENT_WORDS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    }
  } catch (e) {
    console.error('Failed to load recent words', e);
  }
  return [];
}

export function addRecentWord(word: string): void {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const recents = loadRecentWords();
      const updated = [word, ...recents.filter((w) => w !== word)].slice(0, 30);
      localStorage.setItem(RECENT_WORDS_KEY, JSON.stringify(updated));
    }
  } catch (e) {
    console.error('Failed to save recent word', e);
  }
}
