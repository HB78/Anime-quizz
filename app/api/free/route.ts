import { NextRequest, NextResponse } from "next/server";

/* =======================
   Interfaces API
======================= */

interface ApiAudio {
  basename: string;
  link: string;
  size: number;
}

interface ApiVideo {
  basename: string;
  link: string;
  resolution: number;
  source: string;
  tags: {
    nc: boolean;
    subbed: boolean;
    lyrics: boolean;
    uncen: boolean;
  };
  audio?: ApiAudio;
}

interface ApiThemeEntry {
  episodes: string | null;
  nsfw: boolean;
  spoiler: boolean;
  videos: ApiVideo[];
}

interface ApiArtist {
  name: string;
  slug: string;
}

interface ApiSong {
  title: string | null;
  artists: ApiArtist[];
}

interface ApiAnime {
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

/* =======================
   GET
======================= */

export async function GET(req: NextRequest) {
  try {
    const allThemes: ApiAnimeTheme[] = [];
    const maxThemes = 4000;
    const pageSize = 50;

    let page = 1;
    let hasNext = true;

    while (hasNext && allThemes.length < maxThemes) {
      const url = new URL("https://api.animethemes.moe/animetheme");
      url.searchParams.set("filter[type]", "OP");
      url.searchParams.set("page[size]", pageSize.toString());
      url.searchParams.set("page[number]", page.toString());
      url.searchParams.set(
        "include",
        "anime,anime.images,song.artists,animethemeentries.videos.audio",
      );

      console.log(url.toString());
      const response = await fetch(url.toString(), {
        next: { revalidate: 86400 },
        headers: {
          Accept: "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });

      if (!response?.ok) {
        const text = await response.text();
        console.error(`❌ AnimeThemes API error (page ${page}):`, text);
        throw new Error(`AnimeThemes API error: ${response.status}`);
      }

      let data: ApiResponse;
      try {
        data = await response.json();
      } catch (err) {
        console.error(`❌ Failed to parse JSON (page ${page}):`, err);
        break;
      }

      if (!data.animethemes || data.animethemes.length === 0) {
        break;
      }

      allThemes.push(...data.animethemes);

      hasNext = Boolean(data.links?.next) && allThemes.length < maxThemes;
      page++;

      // Petite pause pour éviter de surcharger l'API
      if (hasNext) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    const themes = allThemes.slice(0, maxThemes).map((theme) => {
      const entry = theme.animethemeentries?.[0];
      const video = entry?.videos?.[0];

      return {
        id: theme.id,
        anime: theme.anime.name,
        year: theme.anime.year,
        image: theme.anime.images?.[0]?.link ?? null,

        type: theme.type,
        sequence: theme.sequence,

        songTitle: theme.song?.title ?? "Unknown",
        artist: theme.song?.artists?.[0]?.name ?? "Unknown",

        videoUrl: video?.link ?? null,
        audioUrl: video?.audio?.link ?? null,
      };
    });

    return NextResponse.json({
      count: themes.length,
      themes,
      cachedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Error fetching anime themes:", error);
    return NextResponse.json(
      { error: "Failed to fetch anime themes" },
      { status: 500 },
    );
  }
}
