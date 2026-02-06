import { NextRequest, NextResponse } from "next/server";
import { animeShows } from "@/bdd/anime";
import { movies } from "@/bdd/movie";
import { tvShows } from "@/bdd/serie";
import ytdl from "@distube/ytdl-core";

interface ShowItem {
  id: number;
  name: string;
  query: string;
  year: number;
  genre: string;
  youtubeId?: string;
}

interface ChillTheme {
  id: string;
  title: string;
  year: number;
  genre: string;
  type: "anime" | "tv" | "movie";
  artist?: string;
  audioUrl: string | null;
  imageUrl: string | null;
  youtubeUrl: string;
}

async function searchYouTube(query: string) {
  try {
    const searchQuery = encodeURIComponent(`${query} soundtrack ost`);
    const url = `https://www.youtube.com/results?search_query=${searchQuery}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (!response.ok) {
      console.error(`YouTube search error: ${response.status}`);
      return null;
    }

    const html = await response.text();

    // Extraire les données JSON de la page YouTube
    const ytInitialDataMatch = html.match(
      /var ytInitialData = ({.+?});<\/script>/
    );
    if (!ytInitialDataMatch) {
      console.log(`Pas de données pour: ${query}`);
      return null;
    }

    const ytInitialData = JSON.parse(ytInitialDataMatch[1]);

    // Naviguer dans la structure pour trouver les vidéos
    const contents =
      ytInitialData?.contents?.twoColumnSearchResultsRenderer?.primaryContents
        ?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents;

    if (!contents) {
      console.log(`Structure non trouvée pour: ${query}`);
      return null;
    }

    // Trouver la première vidéo
    const videoData = contents.find(
      (item: Record<string, unknown>) => item.videoRenderer
    )?.videoRenderer;

    if (!videoData) {
      console.log(`Aucune vidéo pour: ${query}`);
      return null;
    }

    const videoId = videoData.videoId;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    return {
      videoId,
      videoUrl,
      title: videoData.title?.runs?.[0]?.text || "Unknown",
      thumbnail:
        videoData.thumbnail?.thumbnails?.slice(-1)?.[0]?.url || null,
      channelTitle:
        videoData.ownerText?.runs?.[0]?.text || "Unknown",
    };
  } catch (error) {
    console.error("Erreur searchYouTube:", error);
    return null;
  }
}

async function getAudioUrl(videoUrl: string) {
  try {
    const info = await ytdl.getInfo(videoUrl);
    const audioFormats = ytdl.filterFormats(info.formats, "audioonly");

    if (audioFormats.length === 0) {
      console.error("Aucun format audio trouvé");
      return null;
    }

    const bestAudio = audioFormats[0];
    return bestAudio.url;
  } catch (error) {
    console.error("Erreur getAudioUrl:", error);
    return null;
  }
}

function getItemType(item: ShowItem): "anime" | "tv" | "movie" {
  if (animeShows.find((a) => a.id === item.id && a.query === item.query))
    return "anime";
  if (tvShows.find((t) => t.id === item.id && t.query === item.query))
    return "tv";
  return "movie";
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "all";
    const limit = parseInt(searchParams.get("limit") || "12");

    console.log(`🎧 [chill] Fetching ${type} themes via YouTube...`);

    let dataSource: ShowItem[];
    switch (type) {
      case "anime":
        dataSource = animeShows;
        break;
      case "tv":
        dataSource = tvShows;
        break;
      case "movie":
        dataSource = movies;
        break;
      case "tv-movie":
        dataSource = [...tvShows, ...movies];
        break;
      case "all":
      default:
        dataSource = [...animeShows, ...tvShows, ...movies];
        break;
    }

    const shuffled = [...dataSource].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, limit * 3);

    const themes: ChillTheme[] = [];

    for (const item of selected) {
      if (themes.length >= limit) break;

      let videoId: string;
      let videoUrl: string;
      let thumbnail: string | null = null;
      let channelTitle: string = "Unknown";

      // Si youtubeId existe, on l'utilise directement
      if (item.youtubeId) {
        console.log(`⚡ Utilisation du youtubeId existant: ${item.youtubeId}`);
        videoId = item.youtubeId;
        videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      } else {
        // Sinon on fait la recherche
        console.log(`🔍 Recherche: ${item.query}`);

        const youtubeData = await searchYouTube(item.query);

        if (!youtubeData) {
          console.log(`⏭️  Skip ${item.name} - pas de vidéo YouTube`);
          continue;
        }

        console.log(`📹 Vidéo trouvée: ${youtubeData.title} (ID: ${youtubeData.videoId})`);
        console.log(`💡 Ajoute youtubeId: "${youtubeData.videoId}" pour ${item.name}`);

        videoId = youtubeData.videoId;
        videoUrl = youtubeData.videoUrl;
        thumbnail = youtubeData.thumbnail;
        channelTitle = youtubeData.channelTitle;
      }

      const audioUrl = await getAudioUrl(videoUrl);

      if (!audioUrl) {
        console.log(`⏭️  Skip ${item.name} - pas d'audio`);
        continue;
      }

      console.log(`✅ Audio extrait pour ${item.name}`);

      themes.push({
        id: `${type}-${item.id}`,
        title: item.name,
        year: item.year,
        genre: item.genre,
        type: getItemType(item),
        artist: channelTitle,
        audioUrl,
        imageUrl: thumbnail,
        youtubeUrl: videoUrl,
      });

      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    console.log(`✅ [chill] Found ${themes.length}/${limit} themes with audio`);

    if (themes.length === 0) {
      return NextResponse.json(
        { error: "Aucun thème avec audio trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      count: themes.length,
      questions: themes,
      cachedAt: new Date().toISOString(),
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ [chill] Error:", errorMessage);

    return NextResponse.json(
      {
        error: "Failed to fetch themes",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
