import React from 'react';
import { X, Users, EyeOff, MessageSquare, Award } from 'lucide-react';
import { Button } from './ui/Button';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md glass-card rounded-3xl p-6 border border-slate-700/80 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🕵️</span>
            <h2 className="text-xl font-bold text-white">How To Play</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close rules"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white bg-slate-800/60 active:scale-90 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 py-4 text-sm text-slate-300">
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">1. Receive Your Word</h3>
              <p className="text-slate-400 mt-0.5">
                Pass the phone around. Normal players receive the <span className="text-emerald-400 font-semibold">same main word</span>. Each impostor secretly receives a <span className="text-rose-400 font-semibold">different related word</span>.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <EyeOff className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">2. Keep It Secret</h3>
              <p className="text-slate-400 mt-0.5">
                You won't be told if you're the impostor! You only see your word. Memorize it and pass the device to the next player.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">3. Discuss & Blend In</h3>
              <p className="text-slate-400 mt-0.5">
                Take turns saying subtle one-sentence clues about your word. If your clue sounds slightly off, people might suspect you!
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">4. Vote & Reveal</h3>
              <p className="text-slate-400 mt-0.5">
                Vote on who you think the impostor is. Tap <span className="text-white font-semibold">Reveal Imposters</span> to discover the truth!
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Button variant="primary" size="md" onClick={onClose}>
            Got it!
          </Button>
        </div>
      </div>
    </div>
  );
};
