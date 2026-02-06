// ===== API TYPES =====

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

interface ApiAnimeTheme {
  type: string;
  sequence: number | null;
  song: ApiSong | null;
  animethemeentries: ApiThemeEntry[];
}

interface ApiAnime {
  id: number;
  name: string;
  year: number | null;
  season: string | null;
  animethemes: ApiAnimeTheme[];
}

interface ApiResponse {
  anime: ApiAnime[];
  links: {
    next: string | null;
  };
}

// app/types/anime.ts

export interface TransformedVideo {
  resolution: number;
  source: string;
  link: string;
  audioUrl: string | null;
}

export interface TransformedTheme {
  type: "OP" | "ED";
  sequence: number | null;
  song: string | null;
  artists: string[];
  videos: TransformedVideo[];
}

export interface TransformedAnime {
  id: number;
  name: string;
  year: number | null;
  season: string | null;
  image: string | null;
  openings: TransformedTheme[];
  endings: TransformedTheme[];
}
