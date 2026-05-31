import { animeShows } from "@/bdd/anime";
import { movies } from "@/bdd/movie";
import { tvShows } from "@/bdd/serie";
import { NextRequest, NextResponse } from "next/server";

interface ShowItem {
  id: number;
  name: string;
  query: string;
  year: number;
  genre: string;
  youtubeId?: string;
}

function getItemType(item: ShowItem): "anime" | "tv" | "movie" {
  if (animeShows.find((a) => a.id === item.id && a.query === item.query))
    return "anime";
  if (tvShows.find((t) => t.id === item.id && t.query === item.query))
    return "tv";
  return "movie";
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "all";

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

  // Ne garder que ceux qui ont un youtubeId
  const withYoutube = dataSource.filter((item) => item.youtubeId);

  // Shuffle
  function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const shuffled = shuffle(withYoutube);

  const themes = shuffled.map((item) => ({
    id: `${getItemType(item)}-${item.id}`,
    title: item.name,
    year: item.year,
    genre: item.genre,
    type: getItemType(item),
    imageUrl: `https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`,
    youtubeUrl: `https://www.youtube-nocookie.com/watch?v=${item.youtubeId}`,
  }));

  return NextResponse.json({
    count: themes.length,
    themes,
  });
}
//ancien lien youtube : `https://www.youtube.com/watch?v=${item.youtubeId}`,
// youtubeUrl: `https://www.youtube.com/watch?v=${item.youtubeId}`,
