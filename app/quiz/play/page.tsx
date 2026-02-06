"use client";

import { QuizError, QuizGame, QuizLoading } from "@/components/quiz";
import { useQuiz } from "@/hooks/use-quiz";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function QuizPlayContent() {
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") as "opening" | "ending") || "opening";

  const { data, isLoading, error, refetch } = useQuiz({
    subCategory: type,
    count: 15,
  });

  if (isLoading || !data) {
    return <QuizLoading type={type} />;
  }

  if (error) {
    return <QuizError message={error.message} onRetry={refetch} />;
  }

  return (
    <QuizGame
      questions={data.questions}
      type={type}
      onReplay={refetch}
      menuHref="/quiz"
    />
  );
}

export default function QuizPlayPage() {
  return (
    <Suspense fallback={<QuizLoading />}>
      <QuizPlayContent />
    </Suspense>
  );
}
