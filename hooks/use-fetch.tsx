import { fetchAnimePage } from "@/lib/animeThemes";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useAnime = (page: number = 1) => {
  return useQuery({
    queryKey: ["animes", page],
    queryFn: () => fetchAnimePage(page),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useInfiniteAnime = () => {
  return useInfiniteQuery({
    queryKey: ["animes", "v2"],
    queryFn: ({ pageParam }) => fetchAnimePage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
