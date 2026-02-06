import { QuizQuestion } from "@/hooks/use-quiz";
import { useCallback, useEffect, useRef, useState } from "react";

export type GamePhase =
  | "ready"
  | "countdown"
  | "playing"
  | "paused"
  | "reveal"
  | "finished";

interface UseQuizGameOptions {
  questions: QuizQuestion[];
  questionDuration?: number;
  revealDuration?: number;
  countdownFrom?: number;
}

export function useQuizGame({
  questions,
  questionDuration = 15,
  revealDuration = 2000,
  countdownFrom = 3,
}: UseQuizGameOptions) {
  // État du jeu
  const [phase, setPhase] = useState<GamePhase>("ready");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [countdown, setCountdown] = useState(questionDuration);
  const [initialCountdown, setInitialCountdown] = useState(countdownFrom);
  const [isPlaying, setIsPlaying] = useState(false);
  const [revealedQuestion, setRevealedQuestion] = useState<QuizQuestion | null>(
    null
  );

  // Refs pour accéder aux valeurs courantes dans les closures des timers
  const currentIndexRef = useRef(currentIndex);
  const questionsRef = useRef(questions);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    questionsRef.current = questions;
  }, [questions]);

  // Refs pour les timers
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const revealTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialCountdownRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup des timers
  const clearAllTimers = useCallback(() => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (revealTimeoutRef.current) {
      clearTimeout(revealTimeoutRef.current);
      revealTimeoutRef.current = null;
    }
    if (initialCountdownRef.current) {
      clearInterval(initialCountdownRef.current);
      initialCountdownRef.current = null;
    }
  }, []);

  // Cleanup au unmount
  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  // Ref pour handleQuestionEnd afin d'éviter les closures stales
  const handleQuestionEndRef = useRef<() => void>(() => {});

  // Démarre le timer de question
  const startCountdownTimer = useCallback(
    (startValue: number) => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }

      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (countdownIntervalRef.current) {
              clearInterval(countdownIntervalRef.current);
              countdownIntervalRef.current = null;
            }
            // Appel via ref pour toujours avoir la version à jour
            setTimeout(() => handleQuestionEndRef.current(), 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    []
  );

  // Démarre une question
  const startQuestion = useCallback(() => {
    clearAllTimers();
    setIsPlaying(false);
    setCountdown(questionDuration);
    setPhase("playing");

    setTimeout(() => {
      setIsPlaying(true);
      startCountdownTimer(questionDuration);
    }, 100);
  }, [clearAllTimers, questionDuration, startCountdownTimer]);

  // Démarre le countdown initial (3, 2, 1...)
  const startCountdownPhase = useCallback(() => {
    setPhase("countdown");
    setInitialCountdown(countdownFrom);

    initialCountdownRef.current = setInterval(() => {
      setInitialCountdown((prev) => {
        if (prev <= 1) {
          if (initialCountdownRef.current) {
            clearInterval(initialCountdownRef.current);
            initialCountdownRef.current = null;
          }
          setTimeout(() => startQuestion(), 0);
          return countdownFrom;
        }
        return prev - 1;
      });
    }, 1000);
  }, [countdownFrom, startQuestion]);

  // Fin d'une question
  const handleQuestionEnd = useCallback(() => {
    const idx = currentIndexRef.current;
    const qs = questionsRef.current;

    setIsPlaying(false);
    clearAllTimers();

    // Sauvegarder la question avant reveal
    setRevealedQuestion(qs[idx]);
    setPhase("reveal");

    revealTimeoutRef.current = setTimeout(() => {
      if (idx < qs.length - 1) {
        setCurrentIndex(idx + 1);
        setTimeout(() => startCountdownPhase(), 100);
      } else {
        setPhase("finished");
      }
    }, revealDuration);
  }, [
    clearAllTimers,
    revealDuration,
    startCountdownPhase,
  ]);

  // Garder la ref à jour
  useEffect(() => {
    handleQuestionEndRef.current = handleQuestionEnd;
  }, [handleQuestionEnd]);

  // === ACTIONS PUBLIQUES ===

  const startGame = useCallback(() => {
    startCountdownPhase();
  }, [startCountdownPhase]);

  const togglePause = useCallback(() => {
    if (phase === "playing") {
      setPhase("paused");
      setIsPlaying(false);
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    } else if (phase === "paused") {
      setPhase("playing");
      setIsPlaying(true);
      startCountdownTimer(countdown);
    }
  }, [phase, countdown, startCountdownTimer]);

  const skip = useCallback(() => {
    clearAllTimers();
    setIsPlaying(false);
    handleQuestionEnd();
  }, [clearAllTimers, handleQuestionEnd]);

  const replay = useCallback(() => {
    clearAllTimers();
    setIsPlaying(false);
    setCurrentIndex(0);
    setCountdown(questionDuration);
    setPhase("ready");
    setRevealedQuestion(null);
  }, [clearAllTimers, questionDuration]);

  return {
    // État
    phase,
    currentQuestion: questions[currentIndex],
    currentIndex,
    totalQuestions: questions.length,
    countdown,
    initialCountdown,
    isPlaying,
    revealedQuestion,
    questionDuration,

    // Actions
    startGame,
    togglePause,
    skip,
    replay,
  };
}
