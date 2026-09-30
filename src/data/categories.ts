import { CategoryId, CategoryInfo } from '../types/game';
import { animalsWords } from './animals';
import { fruitsWords } from './fruits';
import { vegetablesWords } from './vegetables';
import { countriesWords } from './countries';
import { citiesWords } from './cities';
import { sportsWords } from './sports';
import { foodWords } from './food';
import { professionsWords } from './professions';
import { vehiclesWords } from './vehicles';
import { moviesWords } from './movies';
import { householdWords } from './household';
import { birdsWords } from './birds';
import { insectsWords } from './insects';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'animals',
    name: 'Animals',
    emoji: '🐯',
    description: 'Wild beasts, aquatic creatures, and furry companions.',
    color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
    words: animalsWords,
  },
  {
    id: 'fruits',
    name: 'Fruits',
    emoji: '🍎',
    description: 'Sweet, sour, and tropical fruits from around the world.',
    color: 'from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-400',
    words: fruitsWords,
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    emoji: '🥕',
    description: 'Greens, roots, herbs, and culinary plant delights.',
    color: 'from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-400',
    words: vegetablesWords,
  },
  {
    id: 'household',
    name: 'Household Objects',
    emoji: '🏠',
    description: 'Everyday furniture, appliances, kitchenware, and home items.',
    color: 'from-amber-600/20 to-yellow-500/20 border-amber-600/30 text-amber-400',
    words: householdWords,
  },
  {
    id: 'birds',
    name: 'Birds',
    emoji: '🦅',
    description: 'Feathered fliers, songbirds, raptors, and aquatic species.',
    color: 'from-cyan-500/20 to-sky-500/20 border-cyan-500/30 text-cyan-400',
    words: birdsWords,
  },
  {
    id: 'insects',
    name: 'Insects',
    emoji: '🐞',
    description: 'Creepy crawlies, winged bugs, pollinators, and arachnids.',
    color: 'from-lime-500/20 to-emerald-500/20 border-lime-500/30 text-lime-400',
    words: insectsWords,
  },
  {
    id: 'countries',
    name: 'Countries',
    emoji: '🌍',
    description: 'Nations, cultures, and lands across every continent.',
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
    words: countriesWords,
  },
  {
    id: 'cities',
    name: 'Cities',
    emoji: '🏙️',
    description: 'Iconic world capitals, metropolises, and tourist hubs.',
    color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-400',
    words: citiesWords,
  },
  {
    id: 'sports',
    name: 'Sports',
    emoji: '⚽',
    description: 'Competitive games, athletic pursuits, and Olympic events.',
    color: 'from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-400',
    words: sportsWords,
  },
  {
    id: 'food',
    name: 'Food',
    emoji: '🍕',
    description: 'Popular dishes, comfort food, snacks, and sweet desserts.',
    color: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-400',
    words: foodWords,
  },
  {
    id: 'professions',
    name: 'Professions',
    emoji: '💼',
    description: 'Careers, vocations, crafts, and heroic occupations.',
    color: 'from-teal-500/20 to-cyan-500/20 border-teal-500/30 text-teal-400',
    words: professionsWords,
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    emoji: '🚗',
    description: 'Modes of transport by land, sea, sky, and outer space.',
    color: 'from-indigo-500/20 to-violet-500/20 border-indigo-500/30 text-indigo-400',
    words: vehiclesWords,
  },
  {
    id: 'movies',
    name: 'Movies',
    emoji: '🎬',
    description: 'Blockbusters, classics, animated favorites, and sci-fi hits.',
    color: 'from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/30 text-fuchsia-400',
    words: moviesWords,
  },
];

export function getCategoryById(id: CategoryId): CategoryInfo {
  const category = CATEGORIES.find((c) => c.id === id);
  if (!category) {
    return CATEGORIES[0];
  }
  return category;
}
