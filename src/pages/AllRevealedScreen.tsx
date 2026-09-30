import React from 'react';
import { CheckCircle2, Home, Vote } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface AllRevealedScreenProps {
  onStartVoting: () => void;
  onHome: () => void;
}

export const AllRevealedScreen: React.FC<AllRevealedScreenProps> = ({
  onStartVoting,
  onHome,
}) => {
  return (
    <main className="w-full max-w-md mx-auto flex-1 flex flex-col justify-between items-center px-4 py-8 select-none">
      {/* Top Status */}
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>All Words Assigned</span>
      </div>

      {/* Main Announcement */}
      <div className="text-center my-auto space-y-5 animate-scale-in">
        <div className="w-24 h-24 rounded-3xl glass-card border border-emerald-500/30 flex items-center justify-center text-5xl mx-auto shadow-2xl">
          🕵️
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Everyone has <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-emerald-400 to-teal-400">
              their word!
            </span>
          </h2>
          <p className="text-base text-slate-300 font-medium max-w-xs mx-auto pt-2">
            Discuss clues aloud among yourselves. When ready, tap below to vote out the impostor!
          </p>
        </div>

        <div className="p-4 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 text-left space-y-1.5 text-xs text-slate-400">
          <div className="font-semibold text-slate-200">💡 Elimination Rules:</div>
          <div>Vote out one player per round. Impostors win if they survive until only 3 players remain!</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3 pt-4">
        <Button
          variant="danger"
          size="xl"
          leftIcon={<Vote className="w-6 h-6" />}
          onClick={onStartVoting}
        >
          START VOTING
        </Button>

        <Button
          variant="ghost"
          size="sm"
          leftIcon={<Home className="w-4 h-4" />}
          onClick={onHome}
        >
          Exit Game
        </Button>
      </div>
    </main>
  );
};
