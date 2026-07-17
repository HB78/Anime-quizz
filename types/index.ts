// ===== TRANSFORMED TYPES =====

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
