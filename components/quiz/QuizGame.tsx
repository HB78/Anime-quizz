"use client";

import { QuizQuestion } from "@/hooks/use-quiz";
import { useQuizGame } from "@/hooks/use-quiz-game";
import ReactPlayer from "react-player";

import { MeshBackground } from "./MeshBackground";

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
  questionDuration = 25,
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
    <main className="relative flex h-screen items-center justify-center overflow-hidden bg-[#050505] px-6">
      <MeshBackground />

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
            onPlay={game.confirmPlaying}
          />
        </div>
      )}

      {(game.phase === "countdown" || game.phase === "playing" || game.phase === "paused") && (
        <QuizHeader
          currentIndex={game.currentIndex}
          totalQuestions={game.totalQuestions}
          type={type}
          menuHref={menuHref}
          status={game.phase === "paused" ? "EN PAUSE" : undefined}
        />
      )}

      <div className="relative z-10 w-full max-w-2xl mt-12 transition-all">

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
            isBuffering={game.isBuffering}
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
