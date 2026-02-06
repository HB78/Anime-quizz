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
  const shuffled = withYoutube.sort(() => 0.5 - Math.random());

  const themes = shuffled.map((item) => ({
    id: `${getItemType(item)}-${item.id}`,
    title: item.name,
    year: item.year,
    genre: item.genre,
    type: getItemType(item),
    imageUrl: `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`,
    youtubeUrl: `https://www.youtube.com/watch?v=${item.youtubeId}`,
  }));

  return NextResponse.json({
    count: themes.length,
    themes,
  });
}
