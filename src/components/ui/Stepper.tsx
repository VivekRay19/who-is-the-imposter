import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { sounds } from '../../game/soundEffects';

interface StepperProps {
  value: number;
  min: number;
  max: number;
  onChange: (newValue: number) => void;
  label?: string;
  subtitle?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  value,
  min,
  max,
  onChange,
  label,
  subtitle,
}) => {
  const handleDecrement = () => {
    if (value > min) {
      sounds.playTap();
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      sounds.playTap();
      onChange(value + 1);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {(label || subtitle) && (
        <div className="flex items-baseline justify-between px-1">
          {label && <span className="font-semibold text-slate-200 text-base">{label}</span>}
          {subtitle && <span className="text-xs text-slate-400 font-medium">{subtitle}</span>}
        </div>
      )}

      <div className="flex items-center justify-between glass-panel rounded-2xl p-2 border border-slate-700/60 bg-slate-900/60">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          aria-label="Decrease"
          className="w-14 h-14 rounded-xl flex items-center justify-center bg-slate-800/80 hover:bg-slate-700 text-slate-200 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all duration-150 border border-slate-700/50"
        >
          <Minus className="w-6 h-6 stroke-[2.5]" />
        </button>

        <div className="flex flex-col items-center justify-center px-4">
          <span className="text-3xl font-extrabold text-white tracking-tight tabular-nums">
            {value}
          </span>
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          aria-label="Increase"
          className="w-14 h-14 rounded-xl flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all duration-150 shadow-md shadow-indigo-600/20"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
