import React from 'react';
import { DiscussionTimer } from '../components/DiscussionTimer';
import { Button } from '../components/ui/Button';
import { Vote, RotateCcw, Home } from 'lucide-react';
import { sounds } from '../game/soundEffects';

interface DiscussionScreenProps {
  timeLeft: number;
  isRunning: boolean;
  totalDuration: number;
  onStartTimer: () => void;
  onPauseTimer: () => void;
  onResetTimer: (newSeconds?: number) => void;
  onTickTimer: () => void;
  onGoToVoting: () => void;
  onHome: () => void;
}

export const DiscussionScreen: React.FC<DiscussionScreenProps> = ({
  timeLeft,
  isRunning,
  totalDuration,
  onStartTimer,
  onPauseTimer,
  onResetTimer,
  onTickTimer,
  onGoToVoting,
  onHome,
}) => {
  const handleVoteClick = () => {
    sounds.playTap();
    onGoToVoting();
  };

  return (
    <main className="w-full max-w-md mx-auto flex-1 flex flex-col justify-between items-center px-4 py-6 select-none">
      {/* Title */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-black text-white tracking-tight uppercase">
          Discussion Time
        </h2>
        <p className="text-xs text-slate-400 font-medium">
          Ask questions, give subtle clues, and find the impostor.
        </p>
      </div>

      {/* Discussion Timer Widget */}
      <div className="my-auto py-2">
        <DiscussionTimer
          timeLeft={timeLeft}
          isRunning={isRunning}
          totalDuration={totalDuration}
          onStart={onStartTimer}
          onPause={onPauseTimer}
          onReset={onResetTimer}
          onTick={onTickTimer}
        />
      </div>

      {/* Bottom Actions */}
      <div className="w-full space-y-3 pt-2">
        <Button
          variant="danger"
          size="xl"
          leftIcon={<Vote className="w-6 h-6" />}
          onClick={handleVoteClick}
        >
          VOTE FOR IMPOSTOR
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="md"
            leftIcon={<RotateCcw className="w-4 h-4" />}
            onClick={() => onResetTimer(180)}
          >
            Reset 3m
          </Button>

          <Button
            variant="ghost"
            size="md"
            leftIcon={<Home className="w-4 h-4" />}
            onClick={onHome}
          >
            Exit Game
          </Button>
        </div>
      </div>
    </main>
  );
};
