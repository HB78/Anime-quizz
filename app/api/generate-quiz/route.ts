// app/api/generate-quiz/route.ts
import { NextRequest, NextResponse } from "next/server";

// ✅ Interface corrigée avec audio
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
  audio?: ApiAudio; // ✅ Audio est optionnel
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
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subCategory = "opening", count = 15 } = body;

    if (!["opening", "ending"].includes(subCategory)) {
      return NextResponse.json(
        { error: 'subCategory doit être "opening" ou "ending"' },
        { status: 400 },
      );
    }

    const type = subCategory === "opening" ? "OP" : "ED";

    console.log(`🎵 Génération quiz: ${type}, count: ${count}`);

    // Fetch simplifié : une seule page, seulement audio et images
    const response = await fetch(
      `https://api.animethemes.moe/animetheme?` +
        `filter[type]=${type}&` +
        `page[size]=${count * 2}&` +
        `sort=random&` +
        `include=anime.images,song.artists,animethemeentries.videos.audio`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ AnimeThemes API error:", response.status, errorText);
      throw new Error(`AnimeThemes API error: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    console.log(`📦 Reçu ${data.animethemes?.length || 0} thèmes de l'API`);

    // ✅ Filtrer UNIQUEMENT ceux qui ont un audio
    const questions = data.animethemes
      .filter((theme) => {
        const entry = theme.animethemeentries?.[0];
        const video = entry?.videos?.[0];
        const hasAudio = video?.audio != null;

        if (!hasAudio) {
          console.log(`⏭️  Skip ${theme.anime.name} - pas d'audio`);
        }

        return hasAudio;
      })
      .slice(0, count)
      .map((theme, index) => {
        const anime = theme.anime;
        const song = theme.song;
        const entry = theme.animethemeentries[0];
        const video = entry.videos[0];

        return {
          id: `${theme.id}-${index}`,

          // URLs complètes
          videoUrl: video.link,
          audioUrl: video.audio!.link,
          // Info du quiz
          correctAnswer: song?.title ?? "Unknown",
          source: anime.name,
          type: theme.type,
          sequence: theme.sequence,

          // Image
          imageUrl: anime.images?.[0]?.link ?? null,

          // Métadonnées
          artist: song?.artists?.[0]?.name ?? "Unknown",
          year: anime.year,
        };
      });

    console.log(`✅ Généré ${questions.length}/${count} questions avec audio`);

    if (questions.length === 0) {
      return NextResponse.json(
        { error: "Aucune question avec audio trouvée" },
        { status: 404 },
      );
    }

    if (questions.length < count) {
      console.warn(
        `⚠️ Seulement ${questions.length}/${count} questions disponibles`,
      );
    }

    return NextResponse.json({
      quizId: crypto.randomUUID(),
      category: "anime",
      subCategory,
      questions,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Erreur génération quiz:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erreur lors de la génération du quiz";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
