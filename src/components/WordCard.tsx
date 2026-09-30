import React from 'react';
import { Eye, ShieldAlert, ArrowRight, Lock } from 'lucide-react';
import { Button } from './ui/Button';
import { WordImage } from './ui/WordImage';
import { CategoryId } from '../types/game';
import { sounds } from '../game/soundEffects';

interface WordCardProps {
  playerName: string;
  word: string;
  image?: string;
  hint?: string;
  category?: CategoryId;
  isImpostor: boolean;
  isRevealed: boolean;
  onReveal: () => void;
  onNext: () => void;
  isLastPlayer: boolean;
}

export const WordCard: React.FC<WordCardProps> = ({
  playerName,
  word,
  image,
  hint,
  category,
  isImpostor,
  isRevealed,
  onReveal,
  onNext,
  isLastPlayer,
}) => {
  const handleRevealClick = () => {
    sounds.playReveal();
    onReveal();
  };

  const handleNextClick = () => {
    sounds.playHide();
    onNext();
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-4 animate-scale-in select-none">
      {/* Turn Header */}
      <div className="text-center space-y-0.5">
        <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-slate-800/90 border border-slate-700/60 text-[11px] font-extrabold text-indigo-400 uppercase tracking-widest">
          Current Turn
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight break-words">
          {playerName}
        </h2>
      </div>

      {/* Main Secret Card */}
      <div
        className={`w-full rounded-3xl p-5 sm:p-6 flex flex-col items-center justify-center text-center transition-all duration-300 relative overflow-hidden ${
          isRevealed
            ? isImpostor
              ? 'glass-card border-rose-500/40 shadow-2xl glow-red bg-slate-900/90'
              : 'glass-card border-indigo-500/50 shadow-2xl glow-indigo bg-slate-900/90'
            : 'bg-slate-900/95 border border-slate-800 shadow-xl min-h-[380px]'
        }`}
      >
        {isRevealed ? (
          <div className="space-y-4 animate-scale-in w-full flex flex-col items-center">
            {isImpostor ? (
              /* IMPOSTOR VIEW: ONE DISTINCT HINT (NO SECRET WORD / NO IMAGE) */
              <div className="w-full space-y-4 flex flex-col items-center">
                {/* Header Icon / Badge */}
                <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-3xl shadow-lg shadow-rose-950/50">
                  🕵️
                </div>

                {/* Secret Hint Title Banner */}
                <div className="w-full space-y-1.5">
                  <span className="text-[11px] uppercase font-black tracking-widest text-rose-400 block">
                    Your Hint
                  </span>
                  <div className="text-3xl sm:text-4xl font-black tracking-wider px-4 py-4 rounded-2xl border select-none shadow-inner break-words border-rose-500/40 bg-slate-950/80 text-rose-100">
                    {hint ? hint.toUpperCase() : 'SECRET'}
                  </div>
                </div>

                {/* Role Badge & Strategic Advice */}
                <div className="w-full space-y-1.5 pt-1">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-black uppercase tracking-wider shadow-md animate-pulse">
                    <span>🕵️ YOU ARE THE IMPOSTOR</span>
                  </div>
                  <p className="text-xs text-rose-200/90 font-medium max-w-[300px] mx-auto leading-relaxed pt-0.5">
                    Play smart. Blend in. Do not reveal your hint.
                  </p>
                </div>
              </div>
            ) : (
              /* CREWMATE VIEW: SECRET WORD + IMAGE */
              <>
                {/* Big Hero Image */}
                <div className="w-full">
                  <WordImage
                    word={word}
                    directUrl={image}
                    category={category}
                    size="hero"
                    allowZoom={true}
                    className="w-full border-2 shadow-2xl border-slate-700/80"
                  />
                </div>

                {/* Secret Word Title Banner */}
                <div className="w-full space-y-1.5">
                  <span className="text-[11px] uppercase font-black tracking-widest text-slate-400 block">
                    Your Secret Word
                  </span>
                  <div className="text-3xl sm:text-4xl font-black tracking-wider px-4 py-3 rounded-2xl border select-none shadow-inner break-words border-indigo-500/40 bg-slate-950/80 text-white">
                    {word.toUpperCase()}
                  </div>
                </div>

                {/* Private Role Indicator & Strategy Advice */}
                <div className="w-full space-y-1.5 pt-1">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider shadow-sm">
                    <span>🛡️ CREWMATE</span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium max-w-[300px] mx-auto leading-relaxed pt-0.5">
                    You have the common word. Listen carefully to everyone's clues.
                  </p>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4 py-12">
            <div className="w-20 h-20 rounded-3xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center mx-auto text-indigo-400 shadow-xl">
              <Lock className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-200 tracking-wide">
                YOUR SECRET WORD
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Tap below to reveal your secret word
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Privacy Warning */}
      <div className="flex items-center gap-2 text-xs text-slate-400 px-3.5 py-1.5 rounded-xl bg-slate-900/70 border border-slate-800">
        <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
        <span>Make sure only you can see the screen.</span>
      </div>

      {/* Action Button */}
      <div className="w-full pt-1">
        {!isRevealed ? (
          <Button
            variant="primary"
            size="xl"
            leftIcon={<Eye className="w-6 h-6" />}
            onClick={handleRevealClick}
          >
            SHOW SECRET WORD
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="xl"
            className="bg-indigo-600 hover:bg-indigo-500 border-indigo-400/30 text-white shadow-indigo-900/30"
            rightIcon={<ArrowRight className="w-6 h-6" />}
            onClick={handleNextClick}
          >
            {isLastPlayer ? 'FINISH REVEAL' : 'GIVE IT TO NEXT PERSON'}
          </Button>
        )}
      </div>
    </div>
  );
};
