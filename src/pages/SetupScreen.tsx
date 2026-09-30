import React, { useState } from 'react';
import { GameSettings, CategoryId } from '../types/game';
import { CATEGORIES } from '../data/categories';
import { ALL_CATEGORY_IDS } from '../utils/storage';
import { Stepper } from '../components/ui/Stepper';
import { Button } from '../components/ui/Button';
import { Play, AlertCircle, Sparkles } from 'lucide-react';
import { validateSettings } from '../game/gameLogic';
import { sounds } from '../game/soundEffects';

interface SetupScreenProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: GameSettings) => void;
  onStartGame: () => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({
  settings,
  onUpdateSettings,
  onStartGame,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const maxImpostors = Math.floor(settings.playerCount / 2);
  const enabledCategories = settings.enabledCategories || [...ALL_CATEGORY_IDS];

  const handlePlayerCountChange = (count: number) => {
    const updatedNames = [...settings.playerNames];
    while (updatedNames.length < count) {
      updatedNames.push(`Player ${updatedNames.length + 1}`);
    }
    const trimmedNames = updatedNames.slice(0, count);
    const newMaxImpostors = Math.floor(count / 2);
    const newImpostors = Math.min(settings.impostorCount, newMaxImpostors);

    onUpdateSettings({
      ...settings,
      playerCount: count,
      playerNames: trimmedNames,
      impostorCount: Math.max(1, newImpostors),
    });
    setErrorMessage(null);
  };

  const handleImpostorCountChange = (count: number) => {
    onUpdateSettings({
      ...settings,
      impostorCount: count,
    });
    setErrorMessage(null);
  };

  const handleNameChange = (index: number, value: string) => {
    const updated = [...settings.playerNames];
    updated[index] = value;
    onUpdateSettings({
      ...settings,
      playerNames: updated,
    });
    setErrorMessage(null);
  };

  const handleToggleCategory = (catId: CategoryId) => {
    sounds.playTap();
    let updated: CategoryId[];
    if (enabledCategories.includes(catId)) {
      updated = enabledCategories.filter((id) => id !== catId);
    } else {
      updated = [...enabledCategories, catId];
    }
    onUpdateSettings({
      ...settings,
      enabledCategories: updated,
    });
    setErrorMessage(null);
  };

  const handleSelectOnlyCategory = (catId: CategoryId) => {
    sounds.playTap();
    onUpdateSettings({
      ...settings,
      enabledCategories: [catId],
    });
    setErrorMessage(null);
  };

  const handleSelectAllCategories = () => {
    sounds.playTap();
    onUpdateSettings({
      ...settings,
      enabledCategories: [...ALL_CATEGORY_IDS],
    });
    setErrorMessage(null);
  };

  const handleDeselectAllCategories = () => {
    sounds.playTap();
    onUpdateSettings({
      ...settings,
      enabledCategories: [],
    });
  };

  const isAllSelected = enabledCategories.length === CATEGORIES.length;

  const handleStart = () => {
    const validation = validateSettings(settings);
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Please check your settings.');
      return;
    }
    onStartGame();
  };

  return (
    <main className="w-full max-w-md mx-auto flex-1 flex flex-col justify-between px-4 pb-8 select-none">
      <div className="space-y-6 pt-2 overflow-y-auto no-scrollbar max-h-[calc(100vh-170px)] pr-1">
        {/* Error Notification */}
        {errorMessage && (
          <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-semibold animate-scale-in">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Players Stepper */}
        <Stepper
          label="Number of Players"
          subtitle="Min: 3 • Max: 20"
          value={settings.playerCount}
          min={3}
          max={20}
          onChange={handlePlayerCountChange}
        />

        {/* Impostors Stepper */}
        <Stepper
          label="Number of Impostors"
          subtitle={`Max: ${maxImpostors} for ${settings.playerCount} players`}
          value={settings.impostorCount}
          min={1}
          max={maxImpostors}
          onChange={handleImpostorCountChange}
        />

        {/* Category Selection with On/Off Switches */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div>
              <span className="font-semibold text-slate-200 text-base block">
                Category Pool
              </span>
              <span className="text-xs text-indigo-400 font-medium">
                {enabledCategories.length === 0
                  ? 'None enabled'
                  : isAllSelected
                  ? 'All 13 Categories (Full Random Deck)'
                  : enabledCategories.length === 1
                  ? '1 Category Active'
                  : `${enabledCategories.length} Categories Active (Randomized)`}
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={
                  isAllSelected
                    ? handleDeselectAllCategories
                    : handleSelectAllCategories
                }
                className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 active:scale-95 transition-all"
              >
                {isAllSelected ? 'Turn Off All' : 'Select All'}
              </button>
            </div>
          </div>

          {/* Category Toggle Cards */}
          <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar pr-1">
            {CATEGORIES.map((cat) => {
              const isEnabled = enabledCategories.includes(cat.id);
              return (
                <div
                  key={cat.id}
                  className={`flex items-center justify-between p-3 rounded-2xl transition-all duration-200 border ${
                    isEnabled
                      ? 'glass-card border-indigo-500/40 bg-indigo-950/20'
                      : 'bg-slate-900/50 border-slate-800 opacity-60'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleToggleCategory(cat.id)}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    <div>
                      <div className="font-bold text-white text-sm">
                        {cat.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {cat.words.length} words
                      </div>
                    </div>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectOnlyCategory(cat.id)}
                      title="Play only this category"
                      className="px-2 py-0.5 text-[10px] font-bold text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg border border-slate-700/50"
                    >
                      Only
                    </button>

                    {/* Toggle Switch */}
                    <button
                      type="button"
                      onClick={() => handleToggleCategory(cat.id)}
                      aria-label={`Toggle ${cat.name}`}
                      className="p-1 text-slate-300 hover:text-white"
                    >
                      {isEnabled ? (
                        <div className="w-11 h-6 bg-indigo-600 rounded-full p-0.5 flex items-center justify-end shadow-md">
                          <div className="w-5 h-5 bg-white rounded-full shadow" />
                        </div>
                      ) : (
                        <div className="w-11 h-6 bg-slate-800 rounded-full p-0.5 flex items-center justify-start border border-slate-700">
                          <div className="w-5 h-5 bg-slate-500 rounded-full" />
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Player Names Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div>
              <span className="font-semibold text-slate-200 text-base block">
                Player Names (Turn Order)
              </span>
              <span className="text-xs text-slate-400">
                Words will be revealed sequentially in this exact order
              </span>
            </div>
          </div>

          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1 no-scrollbar">
            {Array.from({ length: settings.playerCount }).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-2 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-400 flex-shrink-0">
                  {idx + 1}
                </div>
                <input
                  type="text"
                  placeholder={`Player ${idx + 1}`}
                  value={settings.playerNames[idx] || ''}
                  onChange={(e) => handleNameChange(idx, e.target.value)}
                  maxLength={20}
                  className="w-full bg-transparent text-white font-medium text-sm focus:outline-none placeholder-slate-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="pt-4">
        <Button
          variant="primary"
          size="xl"
          leftIcon={<Sparkles className="w-6 h-6" />}
          rightIcon={<Play className="w-5 h-5 fill-current" />}
          onClick={handleStart}
        >
          START GAME
        </Button>
      </div>
    </main>
  );
};
