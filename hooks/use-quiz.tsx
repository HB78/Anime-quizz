// hooks/use-quiz.ts
import { useQuery } from "@tanstack/react-query";

export interface QuizQuestion {
  id: string;
  videoUrl: string;
  audioUrl: string;
  correctAnswer: string;
  source: string;
  imageUrl: string | null;
  type: "OP" | "ED";
  sequence: number | null;
  artist: string;
  year: number | null;
}

export interface QuizResponse {
  quizId: string;
  category: string;
  subCategory: string;
  questions: QuizQuestion[];
  generatedAt: string;
}

interface UseQuizOptions {
  subCategory: "opening" | "ending";
  count?: number;
}

export function useQuiz({ subCategory, count = 15 }: UseQuizOptions) {
  return useQuery<QuizResponse>({
    queryKey: ["quiz", subCategory, count],
    queryFn: async () => {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subCategory, count }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur génération quiz");
      }

      return response.json();
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}
