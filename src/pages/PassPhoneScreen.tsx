import React from 'react';
import { Smartphone, Shield, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface PassPhoneScreenProps {
  playerName: string;
  playerIndex: number;
  totalPlayers: number;
  onReady: () => void;
}

export const PassPhoneScreen: React.FC<PassPhoneScreenProps> = ({
  playerName,
  playerIndex,
  totalPlayers,
  onReady,
}) => {
  return (
    <main className="w-full max-w-md mx-auto flex-1 flex flex-col justify-between items-center px-4 py-8 select-none">
      {/* Turn indicator badge */}
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-semibold">
        <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
        <span>Player {playerIndex + 1} of {totalPlayers}</span>
      </div>

      {/* Center Pass Phone Banner */}
      <div className="text-center my-auto space-y-6 animate-scale-in">
        <div className="relative w-24 h-24 rounded-3xl glass-card border border-indigo-500/30 flex items-center justify-center text-5xl mx-auto shadow-2xl glow-indigo">
          📱
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold border-2 border-slate-900 shadow-md">
            {playerIndex + 1}
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-400">
            Pass the device to
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight break-words">
            {playerName}
          </h2>
          <p className="text-sm text-slate-400 font-medium max-w-xs mx-auto pt-2">
            Make sure no one else can see your screen before tapping below.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
          <Shield className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>Keep your word strictly confidential</span>
        </div>
      </div>

      {/* Confirmation Button */}
      <div className="w-full pt-4">
        <Button
          variant="primary"
          size="xl"
          rightIcon={<ArrowRight className="w-6 h-6" />}
          onClick={onReady}
        >
          I AM {playerName.toUpperCase()}
        </Button>
      </div>
    </main>
  );
};
