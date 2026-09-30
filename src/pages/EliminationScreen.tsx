import React from 'react';
import { EliminationOutcome } from '../types/game';
import { Button } from '../components/ui/Button';
import { Skull, ArrowRight, Trophy, Users } from 'lucide-react';
import { sounds } from '../game/soundEffects';

interface EliminationScreenProps {
  votingRound: number;
  outcome: EliminationOutcome;
  onNextVotingRound: () => void;
  onViewFinalResults: () => void;
}

export const EliminationScreen: React.FC<EliminationScreenProps> = ({
  votingRound,
  outcome,
  onNextVotingRound,
  onViewFinalResults,
}) => {
  const { eliminatedPlayer, remainingAliveCount, isGameOver } = outcome;

  const handleAction = () => {
    sounds.playTap();
    if (isGameOver) {
      onViewFinalResults();
    } else {
      onNextVotingRound();
    }
  };

  return (
    <main className="w-full max-w-md mx-auto flex-1 flex flex-col justify-between items-center px-4 py-6 select-none animate-fade-in">
      {/* Header Badge */}
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-bold uppercase tracking-wider">
        <span>Voting Round {votingRound} Result</span>
      </div>

      {/* Main Elimination Card */}
      <div className="w-full text-center my-auto space-y-5 animate-scale-in">
        <div
          className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mx-auto shadow-2xl border glass-card ${
            eliminatedPlayer.isImpostor
              ? 'border-rose-500/50 bg-rose-950/30 glow-red'
              : 'border-emerald-500/50 bg-emerald-950/30 glow-indigo'
          }`}
        >
          {eliminatedPlayer.isImpostor ? '🕵️' : '🛡️'}
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 block">
            Player Eliminated
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight break-words">
            {eliminatedPlayer.name}
          </h2>

          <div className="pt-2">
            {eliminatedPlayer.isImpostor ? (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-500/20 border border-rose-500/50 text-rose-300 font-black text-base sm:text-lg tracking-wide shadow-xl animate-pulse">
                <Skull className="w-5 h-5 text-rose-400" />
                <span>{eliminatedPlayer.name.toUpperCase()} WAS AN IMPOSTOR!</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-black text-base sm:text-lg tracking-wide shadow-xl">
                <span>🛡️ {eliminatedPlayer.name.toUpperCase()} WAS A CREWMATE!</span>
              </div>
            )}
          </div>
        </div>

        {/* Live Game Status Ticker */}
        <div className="p-4 rounded-2xl glass-panel bg-slate-900/80 border border-slate-800 text-left space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-400" /> Players Alive
            </span>
            <span className="font-bold text-white text-sm">
              {remainingAliveCount} Remaining
            </span>
          </div>
        </div>

        {/* Status Notice */}
        {!isGameOver ? (
          <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-xs mx-auto">
            {eliminatedPlayer.isImpostor
              ? 'An impostor was caught! However, another impostor is still among you. Keep investigating!'
              : 'An innocent crewmate was eliminated! The impostor is still at large. Keep investigating!'}
          </p>
        ) : (
          <p className="text-xs text-amber-300 font-bold leading-relaxed max-w-xs mx-auto">
            {outcome.isCrewVictorious
              ? 'All impostors have been eliminated! The crew members win the round!'
              : 'The impostors have survived and taken over! Impostors win the round!'}
          </p>
        )}
      </div>

      {/* Action Button */}
      <div className="w-full pt-4">
        {isGameOver ? (
          <Button
            variant="primary"
            size="xl"
            leftIcon={<Trophy className="w-6 h-6 fill-current" />}
            onClick={handleAction}
          >
            SEE FINAL RESULTS
          </Button>
        ) : (
          <Button
            variant="danger"
            size="xl"
            rightIcon={<ArrowRight className="w-6 h-6" />}
            onClick={handleAction}
          >
            NEXT VOTING ROUND
          </Button>
        )}
      </div>
    </main>
  );
};
