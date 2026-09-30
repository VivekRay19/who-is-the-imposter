import React from 'react';
import { Play, Sparkles, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface HomeScreenProps {
  onNewGame: () => void;
  onOpenRules: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNewGame,
  onOpenRules,
}) => {
  return (
    <main className="w-full max-w-md mx-auto flex-1 flex flex-col justify-between items-center px-4 py-8 select-none">
      {/* Top Badge */}
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 text-xs font-semibold tracking-wide">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Party Deduction Game</span>
      </div>

      {/* Hero Title Section */}
      <div className="text-center my-auto space-y-4">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl glass-card border border-indigo-500/30 flex items-center justify-center text-5xl sm:text-6xl mx-auto shadow-2xl glow-indigo transform hover:scale-105 transition-transform">
          🕵️
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none uppercase">
            Who Is The <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-rose-400 to-amber-400">
              Imposter?
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 font-medium max-w-xs mx-auto">
            Find the player who doesn't belong.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3.5 pt-4">
        <Button
          variant="primary"
          size="xl"
          leftIcon={<Play className="w-6 h-6 fill-current" />}
          onClick={onNewGame}
        >
          NEW GAME
        </Button>

        <button
          type="button"
          onClick={onOpenRules}
          className="w-full text-center py-2 text-sm font-semibold text-slate-400 hover:text-slate-200 transition-colors flex items-center justify-center gap-1.5"
        >
          <HelpCircle className="w-4 h-4" />
          <span>How to play</span>
        </button>
      </div>
    </main>
  );
};
