// hooks/use-chill.tsx
import { useQuery } from "@tanstack/react-query";

export interface ChillTheme {
  id: string;
  title: string;
  year: number;
  genre: string;
  type: "anime" | "tv" | "movie";
  imageUrl: string;
  youtubeUrl: string;
}

export interface ChillResponse {
  count: number;
  themes: ChillTheme[];
}

interface UseChillOptions {
  type: "anime" | "tv" | "movie" | "tv-movie" | "all";
}

export function useChill({ type }: UseChillOptions) {
  return useQuery<ChillResponse>({
    queryKey: ["chill", type],
    queryFn: async () => {
      const response = await fetch(`/api/chill?type=${type}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors du chargement des thèmes");
      }

      return response.json();
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
