import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Home, Skull, Trophy, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { WordImage } from '../components/ui/WordImage';
import { Player, CategoryId, EliminationOutcome } from '../types/game';
import { getCategoryById } from '../data/categories';
import { sounds } from '../game/soundEffects';

interface ResultsScreenProps {
  round: number;
  players: Player[];
  mainWord: string;
  category: CategoryId;
  latestElimination: EliminationOutcome | null;
  onContinueGame: () => void;
  onNewGame: () => void;
  onHome: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  round,
  players,
  mainWord,
  category,
  latestElimination,
  onContinueGame,
  onNewGame,
  onHome,
}) => {
  const impostors = players.filter((p) => p.isImpostor);
  const categoryInfo = getCategoryById(category);

  const isCrewWin = latestElimination?.isCrewVictorious ?? false;

  useEffect(() => {
    if (isCrewWin) {
      sounds.playVictory();
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10b981', '#6366f1', '#38bdf8', '#f59e0b'],
        });
      } catch {
        // Confetti fallback
      }
    } else {
      sounds.playSuspense();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#ef4444', '#f97316', '#78716c'],
        });
      } catch {
        // Confetti fallback
      }
    }
  }, [isCrewWin]);

  // Sort players for leaderboard
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <main className="w-full max-w-md mx-auto flex-1 flex flex-col justify-between px-4 py-4 select-none animate-fade-in">
      <div className="space-y-4 overflow-y-auto no-scrollbar max-h-[calc(100vh-210px)] pr-1">
        {/* Round Badge */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-bold uppercase tracking-wider text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Round {round} Completed</span>
          </div>
        </div>

        {/* Victory/Defeat Banner */}
        <div
          className={`p-6 rounded-3xl text-center space-y-2 border ${
            isCrewWin
              ? 'glass-card border-emerald-500/50 glow-indigo bg-emerald-950/40'
              : 'glass-card border-rose-500/50 glow-red bg-rose-950/40'
          }`}
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-4xl shadow-md">
            {isCrewWin ? '🎉' : '🕵️'}
          </div>

          <h2 className="text-3xl font-black text-white tracking-tight uppercase">
            {isCrewWin ? 'Crew Members Win!' : 'Impostors Win!'}
          </h2>

          <p className="text-sm font-semibold">
            {isCrewWin ? (
              <span className="text-emerald-400">
                All impostors were voted out! (+1 pt to all Crew)
              </span>
            ) : (
              <span className="text-rose-400">
                Impostors survived and took over! (+1 pt to Impostor(s))
              </span>
            )}
          </p>
        </div>

        {/* Impostor Identity Box */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 px-1">
            <Skull className="w-3.5 h-3.5" />
            <span>The Impostors</span>
          </div>

          {impostors.map((imp) => (
            <div
              key={imp.id}
              className="p-4 rounded-2xl glass-card border border-rose-500/40 glow-red flex flex-col gap-2.5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                    <Skull className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-extrabold text-white text-base">
                      {imp.name}
                    </div>
                    <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">
                      Impostor
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/30">
                    {imp.score} pts
                  </span>
                </div>
              </div>

              {imp.assignedHint && (
                <div className="bg-slate-950/70 border border-rose-500/30 rounded-xl p-2.5 text-xs text-rose-200">
                  <span className="text-[10px] uppercase font-bold text-rose-400 block mb-0.5">
                    Assigned Secret Hint:
                  </span>
                  <span className="text-sm font-extrabold text-rose-200">
                    "{imp.assignedHint}"
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Word Breakdown with Photo Preview */}
        <div className="p-4 rounded-2xl glass-panel bg-slate-900/80 border border-slate-700/80 space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <span>{categoryInfo.emoji}</span> Category: {categoryInfo.name}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <WordImage
                word={mainWord}
                category={category}
                size="sm"
                allowZoom={true}
                className="rounded-xl flex-shrink-0 border-emerald-500/40"
              />
              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
                  Main Secret Word:
                </span>
                <span className="text-base font-black text-emerald-400">
                  {mainWord}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Scoreboard */}
        <div className="p-4 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Scoreboard (After Round {round})</span>
            </div>
          </div>

          <div className="space-y-1.5">
            {sortedPlayers.map((player, rank) => (
              <div
                key={player.id}
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/40 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 font-bold text-slate-500">
                    #{rank + 1}
                  </span>
                  <span className="font-semibold text-white">
                    {player.name}
                  </span>
                  {player.isImpostor ? (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 font-semibold">
                      Impostor
                    </span>
                  ) : (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                      Crew
                    </span>
                  )}
                </div>

                <span className="font-extrabold text-amber-400">
                  {player.score} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-2.5 pt-3">
        <Button
          variant="primary"
          size="xl"
          leftIcon={<RotateCcw className="w-6 h-6" />}
          onClick={onContinueGame}
        >
          CONTINUE GAME (ROUND {round + 1})
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="md"
            onClick={onNewGame}
          >
            New Game Setup
          </Button>

          <Button
            variant="ghost"
            size="md"
            leftIcon={<Home className="w-4 h-4" />}
            onClick={onHome}
          >
            Home
          </Button>
        </div>
      </div>
    </main>
  );
};
