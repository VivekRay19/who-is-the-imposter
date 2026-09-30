import React from 'react';
import { ArrowLeft, Volume2, VolumeX, HelpCircle } from 'lucide-react';
import { sounds } from '../game/soundEffects';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
  onOpenRules?: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onBack,
  showBack = false,
  onOpenRules,
  soundEnabled,
  onToggleSound,
}) => {
  const handleSoundToggle = () => {
    sounds.enabled = !soundEnabled;
    onToggleSound();
    if (!soundEnabled) {
      // If toggling on, play test sound
      sounds.playTap();
    }
  };

  return (
    <header className="w-full max-w-lg mx-auto flex items-center justify-between px-4 py-4 select-none z-20">
      <div className="flex items-center gap-3">
        {showBack && onBack ? (
          <button
            onClick={() => {
              sounds.playTap();
              onBack();
            }}
            aria-label="Go Back"
            className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-2xl">🕵️</span>
          </div>
        )}

        {title && (
          <div className="flex flex-col">
            <h1 className="font-bold text-slate-100 text-base leading-tight tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <span className="text-xs text-slate-400 font-medium">{subtitle}</span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {onOpenRules && (
          <button
            onClick={() => {
              sounds.playTap();
              onOpenRules();
            }}
            aria-label="How to play"
            className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 active:scale-95 transition-all"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={handleSoundToggle}
          aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
          className={`w-10 h-10 rounded-xl glass-panel flex items-center justify-center active:scale-95 transition-all ${
            soundEnabled ? 'text-indigo-400 hover:text-indigo-300' : 'text-slate-500 hover:text-slate-400'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};
