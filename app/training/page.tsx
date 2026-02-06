"use client";

import AnimeList from "@/components/AnimeList";
import { useInfiniteAnime } from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteAnime();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-zinc-50 px-6 py-10 dark:bg-black">
        <h1 className="mb-8 text-3xl font-bold">Anime Openings Database</h1>
        <p className="text-zinc-500">Loading...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-zinc-50 px-6 py-10 dark:bg-black">
        <h1 className="mb-8 text-3xl font-bold">Anime Openings Database</h1>
        <p className="text-red-500">Error: {error.message}</p>
      </main>
    );
  }

  // Fusionner les anime de toutes les pages (évite les doublons)
  const animeMap = new Map<
    number,
    NonNullable<typeof data>["pages"][0]["animes"][0]
  >();
  for (const page of data?.pages ?? []) {
    for (const anime of page.animes) {
      if (animeMap.has(anime.id)) {
        const existing = animeMap.get(anime.id)!;
        existing.openings.push(...anime.openings);
        existing.endings.push(...anime.endings);
      } else {
        animeMap.set(anime.id, { ...anime });
      }
    }
  }
  const animes = Array.from(animeMap.values());

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 dark:bg-black">
      <h1 className="mb-8 text-3xl font-bold text-center">
        La page de l&apos;esprit et du temps : entrainez vous !
      </h1>

      {animes.length === 0 ? (
        <p className="text-zinc-500">No data found.</p>
      ) : (
        <>
          <AnimeList anime={animes} />

          <div ref={ref} className="mt-8 flex justify-center py-4">
            {isFetchingNextPage ? (
              <p className="text-zinc-500">Loading more...</p>
            ) : hasNextPage ? (
              <p className="text-zinc-400">Scroll for more</p>
            ) : (
              <p className="text-zinc-400">No more results</p>
            )}
          </div>
        </>
      )}
    </main>
  );
}
