import React from 'react';
import { CategoryInfo } from '../types/game';
import { Check } from 'lucide-react';
import { sounds } from '../game/soundEffects';

interface CategoryCardProps {
  category: CategoryInfo;
  isSelected?: boolean;
  onSelect?: () => void;
  showWordCount?: boolean;
  interactive?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected = false,
  onSelect,
  showWordCount = true,
  interactive = true,
}) => {
  const handleClick = () => {
    if (interactive && onSelect) {
      sounds.playTap();
      onSelect();
    }
  };

  return (
    <div
      onClick={handleClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`
        relative rounded-3xl p-5 transition-all duration-200 text-left select-none outline-none
        ${interactive ? 'cursor-pointer active:scale-[0.98]' : ''}
        ${
          isSelected
            ? 'glass-card border-indigo-500 ring-2 ring-indigo-500/50 glow-indigo'
            : 'bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700'
        }
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-3xl flex-shrink-0 shadow-inner">
            {category.emoji}
          </div>

          <div>
            <h3 className="font-bold text-white text-lg leading-tight">
              {category.name}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
              {category.description}
            </p>
          </div>
        </div>

        {isSelected ? (
          <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
        ) : showWordCount ? (
          <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700/60 text-xs font-semibold text-slate-400 flex-shrink-0">
            {category.words.length} words
          </span>
        ) : null}
      </div>
    </div>
  );
};
