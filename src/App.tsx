import React, { useState, useEffect } from 'react';
import { GamePhase, GameSettings, GameState } from './types/game';
import { loadSettings, saveSettings } from './utils/storage';
import { initializeGame, processEliminationVote } from './game/gameLogic';
import { sounds } from './game/soundEffects';

import { Header } from './components/Header';
import { RulesModal } from './components/RulesModal';
import { HomeScreen } from './pages/HomeScreen';
import { SetupScreen } from './pages/SetupScreen';
import { PassPhoneScreen } from './pages/PassPhoneScreen';
import { WordCard } from './components/WordCard';
import { AllRevealedScreen } from './pages/AllRevealedScreen';
import { VotingScreen } from './pages/VotingScreen';
import { EliminationScreen } from './pages/EliminationScreen';
import { ResultsScreen } from './pages/ResultsScreen';

export const App: React.FC = () => {
  const [settings, setSettings] = useState<GameSettings>(() => loadSettings());
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentPhase, setCurrentPhase] = useState<GamePhase>('home');
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);

  // Sync sound settings with audio engine
  useEffect(() => {
    sounds.enabled = settings.soundEnabled;
    sounds.haptics = settings.hapticsEnabled;
  }, [settings.soundEnabled, settings.hapticsEnabled]);

  const handleUpdateSettings = (newSettings: GameSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleToggleSound = () => {
    const updated = { ...settings, soundEnabled: !settings.soundEnabled };
    handleUpdateSettings(updated);
  };

  // Start / Reset Game Flow
  const handleStartGame = (resetScores: boolean = true) => {
    const existingPlayers = !resetScores && gameState ? gameState.players : undefined;
    const nextRound = !resetScores && gameState ? gameState.round + 1 : 1;

    const newGame = initializeGame(settings, existingPlayers, nextRound);
    setGameState(newGame);
    setCurrentPhase('pass_phone');
  };

  const handleReadyToReveal = () => {
    setCurrentPhase('revealing');
  };

  const handleShowWord = () => {
    if (!gameState) return;
    setGameState({
      ...gameState,
      isWordRevealed: true,
    });
  };

  const handleNextPlayer = () => {
    if (!gameState) return;

    const nextIndex = gameState.currentRevealIndex + 1;
    const isFinished = nextIndex >= gameState.revealOrder.length;

    if (isFinished) {
      setGameState({
        ...gameState,
        isWordRevealed: false,
        phase: 'all_revealed',
      });
      setCurrentPhase('all_revealed');
    } else {
      setGameState({
        ...gameState,
        currentRevealIndex: nextIndex,
        isWordRevealed: false,
        phase: 'pass_phone',
      });
      setCurrentPhase('pass_phone');
    }
  };

  const handleStartVoting = () => {
    setCurrentPhase('voting');
  };

  const handleSubmitVote = (eliminatedPlayerId: string) => {
    if (!gameState) return;

    const { updatedPlayers, outcome } = processEliminationVote(
      gameState,
      eliminatedPlayerId
    );

    setGameState({
      ...gameState,
      players: updatedPlayers,
      latestElimination: outcome,
      phase: 'elimination_result',
    });
    setCurrentPhase('elimination_result');
  };

  const handleNextVotingRound = () => {
    if (!gameState) return;
    setGameState({
      ...gameState,
      votingRound: gameState.votingRound + 1,
      phase: 'voting',
    });
    setCurrentPhase('voting');
  };

  const handleViewFinalResults = () => {
    setCurrentPhase('reveal_results');
  };

  const handleContinueGame = () => {
    handleStartGame(false); // Preserve player names & cumulative scores for round N+1
  };

  const handleNewGameSetup = () => {
    setCurrentPhase('setup');
  };

  const handleGoHome = () => {
    setCurrentPhase('home');
    setGameState(null);
  };

  // Header configuration per phase
  const getHeaderProps = () => {
    switch (currentPhase) {
      case 'home':
        return { showBack: false };
      case 'setup':
        return {
          title: 'Game Setup',
          subtitle: 'Configure your party',
          showBack: true,
          onBack: () => setCurrentPhase('home'),
        };
      case 'pass_phone':
      case 'revealing':
        return {
          title: `Round ${gameState?.round || 1} • Pass Device`,
          subtitle: `Category: ${gameState?.category.toUpperCase()}`,
          showBack: true,
          onBack: handleGoHome,
        };
      case 'all_revealed':
        return {
          title: `Round ${gameState?.round || 1} • Ready`,
          showBack: true,
          onBack: handleGoHome,
        };
      case 'voting':
        return {
          title: `Round ${gameState?.round || 1} • Vote ${gameState?.votingRound || 1}`,
          subtitle: 'Eliminate one suspect',
          showBack: true,
          onBack: handleGoHome,
        };
      case 'elimination_result':
        return {
          title: 'Elimination Result',
          showBack: false,
        };
      case 'reveal_results':
        return {
          title: `Round ${gameState?.round || 1} Final Results`,
          showBack: false,
        };
      default:
        return { showBack: false };
    }
  };

  const getCurrentPlayer = () => {
    if (!gameState) return null;
    const playerIndex = gameState.revealOrder[gameState.currentRevealIndex];
    return gameState.players[playerIndex];
  };

  const currentPlayer = getCurrentPlayer();
  const isLastPlayer = gameState
    ? gameState.currentRevealIndex === gameState.revealOrder.length - 1
    : false;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-x-hidden">
      {/* Top App Header */}
      <Header
        {...getHeaderProps()}
        soundEnabled={settings.soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenRules={() => setIsRulesOpen(true)}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-lg mx-auto py-2">
        {currentPhase === 'home' && (
          <HomeScreen
            onNewGame={() => setCurrentPhase('setup')}
            onOpenRules={() => setIsRulesOpen(true)}
          />
        )}

        {currentPhase === 'setup' && (
          <SetupScreen
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onStartGame={() => handleStartGame(true)}
          />
        )}

        {currentPhase === 'pass_phone' && currentPlayer && gameState && (
          <PassPhoneScreen
            playerName={currentPlayer.name}
            playerIndex={gameState.currentRevealIndex}
            totalPlayers={gameState.players.length}
            onReady={handleReadyToReveal}
          />
        )}

        {currentPhase === 'revealing' && currentPlayer && (
          <main className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center items-center px-4 py-6 select-none">
            <WordCard
              playerName={currentPlayer.name}
              word={currentPlayer.assignedWord}
              image={currentPlayer.assignedWordImage}
              hint={currentPlayer.assignedHint}
              category={gameState?.category}
              isImpostor={currentPlayer.isImpostor}
              isRevealed={gameState?.isWordRevealed || false}
              onReveal={handleShowWord}
              onNext={handleNextPlayer}
              isLastPlayer={isLastPlayer}
            />
          </main>
        )}

        {currentPhase === 'all_revealed' && (
          <AllRevealedScreen
            onStartVoting={handleStartVoting}
            onHome={handleGoHome}
          />
        )}

        {currentPhase === 'voting' && gameState && (
          <VotingScreen
            votingRound={gameState.votingRound}
            players={gameState.players}
            onSubmitVote={handleSubmitVote}
            onExitGame={handleGoHome}
          />
        )}

        {currentPhase === 'elimination_result' && gameState && gameState.latestElimination && (
          <EliminationScreen
            votingRound={gameState.votingRound}
            outcome={gameState.latestElimination}
            onNextVotingRound={handleNextVotingRound}
            onViewFinalResults={handleViewFinalResults}
          />
        )}

        {currentPhase === 'reveal_results' && gameState && (
          <ResultsScreen
            round={gameState.round}
            players={gameState.players}
            mainWord={gameState.mainWord}
            category={gameState.category}
            latestElimination={gameState.latestElimination}
            onContinueGame={handleContinueGame}
            onNewGame={handleNewGameSetup}
            onHome={handleGoHome}
          />
        )}
      </div>

      {/* Rules Modal */}
      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />
    </div>
  );
};

export default App;
