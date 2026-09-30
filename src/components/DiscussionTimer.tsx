import React, { useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import { sounds } from '../game/soundEffects';

interface DiscussionTimerProps {
  timeLeft: number;
  isRunning: boolean;
  totalDuration: number;
  onStart: () => void;
  onPause: () => void;
  onReset: (newDuration?: number) => void;
  onTick: () => void;
}

export const DiscussionTimer: React.FC<DiscussionTimerProps> = ({
  timeLeft,
  isRunning,
  totalDuration,
  onStart,
  onPause,
  onReset,
  onTick,
}) => {
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        onTick();
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      sounds.playAlarm();
      onPause();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, onTick, onPause]);

  // Audio ticks for last 5 seconds
  useEffect(() => {
    if (isRunning && timeLeft <= 5 && timeLeft > 0) {
      sounds.playTick();
    }
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const progress = totalDuration > 0 ? (timeLeft / totalDuration) : 0;
  const strokeDashoffset = 283 * (1 - progress);

  const presets = [
    { label: '1m', seconds: 60 },
    { label: '2m', seconds: 120 },
    { label: '3m', seconds: 180 },
    { label: '5m', seconds: 300 },
  ];

  return (
    <div className="flex flex-col items-center gap-6 select-none">
      {/* Circular Timer Display */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* SVG Progress Ring */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            className="stroke-slate-800"
            strokeWidth="5"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            className={`transition-all duration-1000 ease-linear ${
              timeLeft <= 10 ? 'stroke-rose-500' : 'stroke-indigo-500'
            }`}
            strokeWidth="5"
            strokeDasharray="283"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute flex flex-col items-center justify-center">
          <span
            className={`text-5xl font-black tracking-tight tabular-nums transition-colors ${
              timeLeft <= 10 && timeLeft > 0
                ? 'text-rose-400 animate-pulse'
                : 'text-white'
            }`}
          >
            {formattedTime}
          </span>
          <span className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">
            {timeLeft === 0 ? "TIME'S UP!" : isRunning ? 'DISCUSSING' : 'PAUSED'}
          </span>
        </div>
      </div>

      {/* Timer Controls */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => {
            sounds.playTap();
            onReset();
          }}
          aria-label="Reset Timer"
          className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center text-slate-300 hover:text-white active:scale-95 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {isRunning ? (
          <button
            type="button"
            onClick={() => {
              sounds.playTap();
              onPause();
            }}
            aria-label="Pause Timer"
            className="w-16 h-16 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-600/30 active:scale-95 transition-all"
          >
            <Pause className="w-7 h-7" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              sounds.playTap();
              onStart();
            }}
            aria-label="Start Timer"
            className="w-16 h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
          >
            <Play className="w-7 h-7 ml-0.5" />
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            sounds.playAlarm();
          }}
          aria-label="Test Sound"
          title="Play reminder chime"
          className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center text-slate-300 hover:text-white active:scale-95 transition-all"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Preset Duration Chips */}
      <div className="flex items-center gap-2">
        {presets.map((p) => {
          const isActive = totalDuration === p.seconds;
          return (
            <button
              key={p.seconds}
              type="button"
              onClick={() => {
                sounds.playTap();
                onReset(p.seconds);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
