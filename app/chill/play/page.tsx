"use client";

import { QuizError, QuizGame, QuizLoading } from "@/components/quiz";
import { ChillTheme, useChill } from "@/hooks/use-chill";
import { QuizQuestion } from "@/hooks/use-quiz";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useMemo, useRef, useState } from "react";

type FilterType = "anime" | "tv" | "movie" | "tv-movie" | "all";

const QUIZ_SIZE = 15;

function toQuizQuestion(theme: ChillTheme): QuizQuestion {
  return {
    id: theme.id,
    audioUrl: theme.youtubeUrl,
    videoUrl: theme.youtubeUrl,
    correctAnswer: theme.title,
    source: theme.title,
    imageUrl: theme.imageUrl,
    type: theme.type === "anime" ? ("OP" as const) : ("ED" as const),
    artist: "",
    year: theme.year,
    sequence: null,
  };
}

function ChillPlayContent() {
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") as FilterType) || "all";

  const { data, isLoading, error } = useChill({ type });

  // IDs déjà joués (persiste entre les replays)
  const playedIdsRef = useRef<Set<string>>(new Set());
  // Compteur pour forcer le re-calcul à chaque replay
  const [round, setRound] = useState(0);

  const questions: QuizQuestion[] = useMemo(() => {
    if (!data?.themes) return [];

    const available = data.themes.filter(
      (theme) => !playedIdsRef.current.has(theme.id),
    );

    const picked = available.slice(0, QUIZ_SIZE);

    // Marquer comme joués
    picked.forEach((theme) => playedIdsRef.current.add(theme.id));

    return picked.map(toQuizQuestion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, round]);

  const handleReplay = useCallback(() => {
    const remaining = (data?.themes || []).filter(
      (theme) => !playedIdsRef.current.has(theme.id),
    );

    if (remaining.length < QUIZ_SIZE) {
      playedIdsRef.current.clear();
    }

    setRound((r) => r + 1);
  }, [data]);

  const handleReset = useCallback(() => {
    playedIdsRef.current.clear();
    setRound((r) => r + 1);
  }, []);

  if (isLoading || !data) {
    return <QuizLoading type="soundtrack" />;
  }

  if (error) {
    return (
      <QuizError
        message={error.message}
        onRetry={() => setRound((r) => r + 1)}
        menuHref="/chill"
      />
    );
  }

  if (questions.length === 0) {
    return (
      <QuizError
        message="Aucun thème disponible"
        onRetry={() => setRound((r) => r + 1)}
        menuHref="/chill"
      />
    );
  }

  return (
    <QuizGame
      key={round}
      questions={questions}
      type="soundtrack"
      onReplay={handleReplay}
      onReset={handleReset}
      menuHref="/chill"
    />
  );
}

export default function ChillPlayPage() {
  return (
    <Suspense fallback={<QuizLoading type="soundtrack" />}>
      <ChillPlayContent />
    </Suspense>
  );
}
