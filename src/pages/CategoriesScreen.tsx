import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { CategoryInfo } from '../types/game';
import { CategoryCard } from '../components/CategoryCard';
import { X, Search, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface CategoriesScreenProps {
  onBack: () => void;
  onSelectCategoryForGame?: (categoryId: string) => void;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  onBack,
  onSelectCategoryForGame,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryInfo | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWords = selectedCategory
    ? selectedCategory.words.filter(
        (w) =>
          w.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (w.impostorHints || []).some((hint) =>
            hint.toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
    : [];

  return (
    <main className="w-full max-w-md mx-auto flex-1 flex flex-col justify-between px-4 pb-6 select-none">
      {/* Category List */}
      <div className="space-y-4 pt-1">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>520 Curated Words Across 13 Categories</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Word Decks
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Browse all categories, explore words, and view related impostor clues.
          </p>
        </div>

        <div className="space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto no-scrollbar pr-1">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onSelect={() => setSelectedCategory(category)}
            />
          ))}
        </div>
      </div>

      {/* Category Detail Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md glass-card rounded-3xl p-6 border border-slate-700 shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedCategory.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {selectedCategory.name}
                  </h3>
                  <span className="text-xs text-indigo-400 font-semibold">
                    {selectedCategory.words.length} Curated Words
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm('');
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white bg-slate-800/60 active:scale-90 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search filter within category */}
            <div className="py-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-sm">
                <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search words or hints..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-white w-full focus:outline-none placeholder-slate-500 text-xs"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Words List */}
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 pr-1 py-1">
              {filteredWords.map((entry, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl glass-panel bg-slate-900/50 border border-slate-800/80 text-left space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">
                      {idx + 1}. {entry.word}
                    </span>
                  </div>
                  <div className="space-y-1 pt-1 text-[11px] text-slate-400">
                    <span className="text-slate-500 font-bold block text-[10px] uppercase tracking-wider">
                      Impostor Clue Hints:
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                      {(entry.impostorHints || []).slice(0, 2).map((hint, hIdx) => (
                        <li key={hIdx} className="truncate">
                          "{hint}"
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {filteredWords.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-500">
                  No matching words found.
                </div>
              )}
            </div>

            {/* Close / Action */}
            <div className="pt-4 border-t border-slate-800 flex gap-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  if (onSelectCategoryForGame) {
                    onSelectCategoryForGame(selectedCategory.id);
                  }
                  setSelectedCategory(null);
                }}
              >
                Play with {selectedCategory.name}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Back to Home Button */}
      <div className="pt-4">
        <Button variant="secondary" size="lg" onClick={onBack}>
          Back to Home
        </Button>
      </div>
    </main>
  );
};
