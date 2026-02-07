"use client";

import { QuizQuestion } from "@/hooks/use-quiz";
import { useQuizGame } from "@/hooks/use-quiz-game";
import ReactPlayer from "react-player";

import { QuizHeader } from "./QuizHeader";
import { CountdownPhase } from "./phases/CountdownPhase";
import { FinishedPhase } from "./phases/FinishedPhase";
import { PlayingPhase } from "./phases/PlayingPhase";
import { ReadyPhase } from "./phases/ReadyPhase";
import { RevealPhase } from "./phases/RevealPhase";

interface QuizGameProps {
  questions: QuizQuestion[];
  type: string;
  onReplay: () => void;
  onReset?: () => void;
  menuHref: string;
  questionDuration?: number;
}

export function QuizGame({
  questions,
  type,
  onReplay,
  onReset,
  menuHref,
  questionDuration = 20,
}: QuizGameProps) {
  const game = useQuizGame({
    questions,
    questionDuration,
  });

  const handleReplay = () => {
    game.replay();
    onReplay();
  };

  // Protection si pas de questions (sauf phase finished)
  if (!game.currentQuestion && game.phase !== "finished") {
    return null;
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950 px-6">
      {/* Background glows */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-blue-500/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-2/3 h-96 w-96 rounded-full bg-purple-500/8 blur-3xl" />
      <div className="pointer-events-none absolute -top-40 left-1/3 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl" />

      {/* Audio Player caché */}
      {game.currentQuestion && (
        <div className="hidden">
          <ReactPlayer
            key={game.currentQuestion.id}
            src={game.currentQuestion.audioUrl || game.currentQuestion.videoUrl}
            playing={game.isPlaying}
            volume={1}
            muted={false}
            width="0"
            height="0"
          />
        </div>
      )}

      <div className="relative w-full max-w-2xl mt-12 transition-all">
        <QuizHeader
          currentIndex={game.currentIndex}
          totalQuestions={game.totalQuestions}
          type={type}
        />

        {game.phase === "ready" && (
          <ReadyPhase
            questionCount={game.totalQuestions}
            type={type}
            onStart={game.startGame}
          />
        )}

        {game.phase === "countdown" && (
          <CountdownPhase countdown={game.initialCountdown} />
        )}

        {(game.phase === "playing" || game.phase === "paused") && (
          <PlayingPhase
            countdown={game.countdown}
            duration={game.questionDuration}
            isPaused={game.phase === "paused"}
            onTogglePause={game.togglePause}
            onSkip={game.skip}
            onReplay={handleReplay}
          />
        )}

        {game.phase === "reveal" && game.revealedQuestion && (
          <RevealPhase question={game.revealedQuestion} />
        )}

        {game.phase === "finished" && (
          <FinishedPhase
            questionCount={game.totalQuestions}
            type={type}
            onReplay={handleReplay}
            onReset={onReset}
            menuHref={menuHref}
          />
        )}
      </div>
    </main>
  );
}
