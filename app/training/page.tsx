"use client";

import AnimeList from "@/components/AnimeList";
import { SkeletonGrid } from "@/components/Skeleton";
import { useInfiniteAnime } from "@/hooks/use-fetch";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Search, Sparkles, Loader2, ArrowUpCircle } from "lucide-react";

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

  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Merge animes from all pages (avoid duplicates)
  const animes = useMemo(() => {
    const animeMap = new Map<
      number,
      NonNullable<typeof data>["pages"][0]["animes"][0]
    >();
    for (const page of data?.pages ?? []) {
      for (const anime of page.animes) {
        if (animeMap.has(anime.id)) {
          const existing = animeMap.get(anime.id)!;
          const existingKeys = new Set(
            [...existing.openings, ...existing.endings].map(
              (t) => `${t.type}-${t.sequence}`
            )
          );
          for (const op of anime.openings) {
            if (!existingKeys.has(`${op.type}-${op.sequence}`)) {
              existing.openings.push(op);
            }
          }
          for (const ed of anime.endings) {
            if (!existingKeys.has(`${ed.type}-${ed.sequence}`)) {
              existing.endings.push(ed);
            }
          }
        } else {
          animeMap.set(anime.id, { ...anime });
        }
      }
    }
    return Array.from(animeMap.values());
  }, [data]);

  // Filter animes by search query
  const filteredAnimes = useMemo(() => {
    if (!searchQuery.trim()) return animes;
    const q = searchQuery.toLowerCase();
    return animes.filter((anime) => {
      if (anime.name.toLowerCase().includes(q)) return true;
      const allThemes = [...anime.openings, ...anime.endings];
      return allThemes.some(
        (theme) =>
          theme.song?.toLowerCase().includes(q) ||
          theme.artists.some((a) => a.toLowerCase().includes(q))
      );
    });
  }, [animes, searchQuery]);

  return (
    <main className="relative min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950">
        {/* Decorative blurs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-900/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-purple-900/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-16 text-center">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-800 bg-indigo-950/50 px-4 py-1.5 text-sm font-medium text-indigo-300">
            <Sparkles className="h-4 w-4" />
            Hyperbolic Time Chamber
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            La salle de l&apos;esprit
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              et du temps
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
            Entraînez votre oreille musicale en écoutant les openings et endings
            de vos animes préférés.
          </p>

          {/* Search Bar */}
          <div className="mx-auto mt-8 max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un anime, une chanson, un artiste..."
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-12 pr-4 text-sm text-white placeholder-zinc-500 shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        {isLoading ? (
          <SkeletonGrid />
        ) : isError ? (
          <div className="mx-auto max-w-md rounded-2xl border border-red-900 bg-red-950/50 p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-900/50">
              <span className="text-2xl">!</span>
            </div>
            <h3 className="text-lg font-semibold text-red-300">
              Erreur de chargement
            </h3>
            <p className="mt-2 text-sm text-red-400">{error.message}</p>
          </div>
        ) : filteredAnimes.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900">
              <Search className="h-8 w-8 text-zinc-600" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-300">
              Aucun résultat
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Aucun anime ne correspond à &quot;{searchQuery}&quot;
            </p>
          </div>
        ) : (
          <>
            <AnimeList anime={filteredAnimes} />

            <div ref={ref} className="mt-10 flex justify-center py-6">
              {isFetchingNextPage ? (
                <div className="flex items-center gap-2 text-indigo-400">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-sm font-medium">Chargement...</span>
                </div>
              ) : hasNextPage ? (
                <p className="text-sm text-zinc-500">
                  Continuez de scroller pour charger plus
                </p>
              ) : (
                <div className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400 shadow-sm">
                  Fin de la base de données
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 rounded-full bg-indigo-600 p-3 text-white shadow-lg transition-all hover:bg-indigo-500 hover:scale-105 ${
          showScrollTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        aria-label="Retour en haut"
      >
        <ArrowUpCircle className="h-6 w-6" />
      </button>
    </main>
  );
}
