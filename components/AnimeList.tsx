"use client";

import { TransformedAnime, TransformedTheme } from "@/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, AlertCircle, Calendar, Layers } from "lucide-react";

interface AnimeListProps {
  anime: TransformedAnime[];
}

function ThemeCard({ theme }: { theme: TransformedTheme }) {
  const isOP = theme.type === "OP";
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioUrl = theme.videos?.[0]?.audioUrl ?? theme.videos?.[0]?.link;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying((p) => !p);
  };

  return (
    <div
      className={`group/theme relative flex items-center gap-3 rounded-xl p-3 transition-all ${
        isOP
          ? "bg-blue-500/10 hover:bg-blue-500/20"
          : "bg-purple-500/10 hover:bg-purple-500/20"
      }`}
    >
      {/* Play Button */}
      {audioUrl ? (
        <>
          <button
            onClick={togglePlay}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm text-white transition-all hover:scale-110 active:scale-95 ${
              isOP ? "bg-blue-500 hover:bg-blue-600" : "bg-purple-500 hover:bg-purple-600"
            } ${isPlaying ? "shadow-lg ring-2 ring-offset-2 ring-offset-zinc-900 " + (isOP ? "ring-blue-400" : "ring-purple-400") : ""}`}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 ml-0.5" />
            )}
          </button>

          <audio
            ref={audioRef}
            src={audioUrl}
            preload="none"
            onEnded={() => {
              setIsPlaying(false);
              setProgress(0);
            }}
          />
        </>
      ) : (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-700">
          <AlertCircle className="h-4 w-4 text-zinc-500" />
        </div>
      )}

      {/* Info */}
      <div className="min-w-0 flex-1">
        <span
          className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
            isOP
              ? "bg-blue-500/20 text-blue-400"
              : "bg-purple-500/20 text-purple-400"
          }`}
        >
          {theme.type}
          {theme.sequence ?? ""}
        </span>

        <p className="mt-0.5 truncate text-sm font-medium text-white">
          {theme.song ?? "Unknown"}
        </p>

        {theme.artists.length > 0 && (
          <p className="truncate text-xs text-zinc-400">
            {theme.artists.join(", ")}
          </p>
        )}
      </div>

      {/* Progress bar */}
      {audioUrl && progress > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden rounded-b-xl bg-zinc-700">
          <div
            className={`h-full transition-all ${isOP ? "bg-blue-500" : "bg-purple-500"}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

export function AnimeCard({ anime }: { anime: TransformedAnime }) {
  const allThemes = [...(anime.openings ?? []), ...(anime.endings ?? [])];

  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
      {/* Header with Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
        {anime.image ? (
          <Image
            src={anime.image}
            alt={anime.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Layers className="h-12 w-12 text-zinc-700" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badges top */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {anime.year && (
            <span className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
              <Calendar className="h-3 w-3" />
              {anime.year}
            </span>
          )}
          {anime.season && (
            <span className="rounded-full bg-black/50 px-2 py-0.5 text-xs font-medium capitalize text-white backdrop-blur-sm">
              {anime.season}
            </span>
          )}
        </div>

        {/* Title bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h2 className="line-clamp-2 text-lg font-bold leading-tight text-white drop-shadow-md">
            {anime.name}
          </h2>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="rounded-full bg-blue-500/30 px-2 py-0.5 text-[11px] font-medium text-blue-200 backdrop-blur-sm">
              {anime.openings?.length ?? 0} OP
            </span>
            <span className="rounded-full bg-purple-500/30 px-2 py-0.5 text-[11px] font-medium text-purple-200 backdrop-blur-sm">
              {anime.endings?.length ?? 0} ED
            </span>
          </div>
        </div>
      </div>

      {/* Themes */}
      <div className="custom-scrollbar max-h-[320px] space-y-1 overflow-y-auto p-3">
        {allThemes.map((theme, i) => (
          <ThemeCard
            key={`${anime.id}-${theme.type}-${theme.sequence ?? i}`}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
}

export default function AnimeList({ anime }: AnimeListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {anime.map((a) => (
        <AnimeCard key={a.id} anime={a} />
      ))}
    </div>
  );
}
