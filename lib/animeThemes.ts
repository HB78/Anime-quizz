import { TransformedAnime, TransformedTheme } from "@/types";

interface ApiVideo {
  resolution: number;
  source: string;
  link: string;
  tags: {
    nc: boolean;
    subbed: boolean;
    lyrics: boolean;
    uncen: boolean;
  };
  audio?: {
    link: string;
  };
}

interface ApiThemeEntry {
  videos: ApiVideo[];
}

interface ApiArtist {
  name: string;
}

interface ApiSong {
  title: string | null;
  artists: ApiArtist[];
}

interface ApiAnime {
  id: number;
  name: string;
  slug: string;
  year: number | null;
  season: string | null;
  images?: Array<{
    facet: string;
    link: string;
  }>;
}

interface ApiAnimeTheme {
  id: number;
  type: "OP" | "ED";
  sequence: number | null;
  slug: string;
  anime: ApiAnime;
  song: ApiSong | null;
  animethemeentries: ApiThemeEntry[];
}

interface ApiResponse {
  animethemes: ApiAnimeTheme[];
  links: {
    next: string | null;
  };
}

export interface AnimePageResult {
  animes: TransformedAnime[];
  nextPage: number | null;
}

export async function fetchAnimePage(
  page: number = 1,
): Promise<AnimePageResult> {
  const url = new URL("https://api.animethemes.moe/animetheme");
  url.searchParams.set("page[size]", "25");
  url.searchParams.set("page[number]", page.toString());
  url.searchParams.set(
    "include",
    "anime,anime.images,song.artists,animethemeentries.videos,animethemeentries.videos.audio",
  );

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error("Failed to fetch anime themes");
  }

  const data: ApiResponse = await res.json();

  // Grouper par anime
  const animeMap = new Map<number, TransformedAnime>();

  for (const theme of data.animethemes ?? []) {
    const animeId = theme.anime.id;

    if (!animeMap.has(animeId)) {
      animeMap.set(animeId, {
        id: animeId,
        name: theme.anime.name,
        year: theme.anime.year,
        season: theme.anime.season,
        image: theme.anime.images?.[0]?.link ?? null,
        openings: [],
        endings: [],
      });
    }

    const anime = animeMap.get(animeId)!;

    const transformedTheme: TransformedTheme = {
      type: theme.type,
      sequence: theme.sequence,
      song: theme.song?.title ?? null,
      artists: theme.song?.artists.map((a) => a.name) ?? [],
      videos: theme.animethemeentries.flatMap((entry) =>
        entry.videos.map((video) => ({
          resolution: video.resolution,
          source: video.source,
          link: video.link,
          audioUrl: video.audio?.link ?? null,
        })),
      ),
    };

    if (theme.type === "OP") {
      anime.openings.push(transformedTheme);
    } else {
      anime.endings.push(transformedTheme);
    }
  }

  return {
    animes: Array.from(animeMap.values()),
    nextPage: data.links.next !== null ? page + 1 : null,
  };
}
