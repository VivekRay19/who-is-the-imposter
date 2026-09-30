import React, { useState } from 'react';
import { Player } from '../types/game';
import { Button } from '../components/ui/Button';
import { Skull, AlertCircle, Check, Vote } from 'lucide-react';
import { sounds } from '../game/soundEffects';

interface VotingScreenProps {
  votingRound: number;
  players: Player[];
  onSubmitVote: (eliminatedPlayerId: string) => void;
  onExitGame: () => void;
}

export const VotingScreen: React.FC<VotingScreenProps> = ({
  votingRound,
  players,
  onSubmitVote,
  onExitGame,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Filter only active, non-eliminated players
  const alivePlayers = players.filter((p) => !p.isEliminated);

  const handleSelectPlayer = (id: string) => {
    sounds.playTap();
    setError(null);
    setSelectedId(id === selectedId ? null : id);
  };

  const handleConfirmVote = () => {
    if (!selectedId) {
      setError('Please select one player to vote out.');
      return;
    }
    sounds.playSuspense();
    onSubmitVote(selectedId);
  };

  return (
    <main className="w-full max-w-md mx-auto flex-1 flex flex-col justify-between px-4 py-4 select-none animate-fade-in">
      {/* Header */}
      <div className="space-y-4 pt-1">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <Vote className="w-3.5 h-3.5" />
            <span>Voting Round {votingRound}</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">
            Vote Out Suspect
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Tap the player you suspect is an impostor to eliminate them.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold animate-scale-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Player Selection List (Alive Players Only) */}
        <div className="space-y-2.5 max-h-[calc(100vh-250px)] overflow-y-auto no-scrollbar pr-1">
          {alivePlayers.map((player, idx) => {
            const isSelected = selectedId === player.id;
            return (
              <button
                key={player.id}
                type="button"
                onClick={() => handleSelectPlayer(player.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-200 text-left active:scale-[0.98] ${
                  isSelected
                    ? 'glass-card border-rose-500 ring-2 ring-rose-500/50 glow-red'
                    : 'bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isSelected
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {idx + 1}
                  </div>

                  <div>
                    <span className="font-bold text-white text-base block">
                      {player.name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Score: <strong className="text-amber-400">{player.score} pts</strong>
                    </span>
                  </div>
                </div>

                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'bg-rose-600 border-rose-500 text-white shadow-md'
                      : 'border-slate-700 bg-slate-800/50 text-transparent'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-2.5 pt-4">
        <Button
          variant="danger"
          size="xl"
          leftIcon={<Skull className="w-6 h-6" />}
          onClick={handleConfirmVote}
        >
          VOTE OUT SUSPECT
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onExitGame}
        >
          Exit Game
        </Button>
      </div>
    </main>
  );
};
