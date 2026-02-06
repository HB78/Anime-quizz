// scripts/fetch-youtube-ids.ts
// Script pour récupérer les youtubeId et mettre à jour les fichiers BDD
// Usage: npx tsx scripts/fetch-youtube-ids.ts

import * as fs from "fs";
import * as path from "path";

interface ShowItem {
  id: number;
  name: string;
  query: string;
  year: number;
  genre: string;
  youtubeId?: string;
}

const BDD_FILES = [
  { path: "bdd/movie.ts", varName: "movies" },
  { path: "bdd/serie.ts", varName: "tvShows" },
  { path: "bdd/anime.ts", varName: "animeShows" },
];

async function searchYouTube(query: string, retries = 3): Promise<string | null> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const searchQuery = encodeURIComponent(`${query}`);
      const url = `https://www.youtube.com/results?search_query=${searchQuery}`;

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        redirect: "manual",
        signal: controller.signal,
      });

      clearTimeout(timeout);

      // Si redirection, on récupère quand même le contenu
      if (response.status >= 300 && response.status < 400) {
        console.log(`⚠️ Redirection détectée, tentative ${attempt}/${retries}`);
        if (attempt < retries) {
          await new Promise((r) => setTimeout(r, 1000 * attempt));
          continue;
        }
        return null;
      }

      if (!response.ok) {
        console.error(`❌ YouTube search error: ${response.status}`);
        if (attempt < retries) {
          await new Promise((r) => setTimeout(r, 1000 * attempt));
          continue;
        }
        return null;
      }

      const html = await response.text();

      // Extraire les données JSON de la page YouTube
      const ytInitialDataMatch = html.match(
        /var ytInitialData = ({.+?});<\/script>/
      );
      if (!ytInitialDataMatch) {
        // Essayer une autre regex
        const altMatch = html.match(/ytInitialData\s*=\s*({.+?});/);
        if (!altMatch) {
          if (attempt < retries) {
            await new Promise((r) => setTimeout(r, 1000 * attempt));
            continue;
          }
          return null;
        }
        const ytInitialData = JSON.parse(altMatch[1]);
        return extractVideoId(ytInitialData);
      }

      const ytInitialData = JSON.parse(ytInitialDataMatch[1]);
      return extractVideoId(ytInitialData);
    } catch (error) {
      if (attempt < retries) {
        console.log(`⚠️ Erreur, nouvelle tentative ${attempt + 1}/${retries}...`);
        await new Promise((r) => setTimeout(r, 1000 * attempt));
        continue;
      }
      console.error(`❌ Erreur searchYouTube:`, error);
      return null;
    }
  }
  return null;
}

function extractVideoId(ytInitialData: Record<string, unknown>): string | null {
  try {
    // Naviguer dans la structure pour trouver les vidéos
    const contents =
      // @ts-expect-error - structure YouTube complexe
      ytInitialData?.contents?.twoColumnSearchResultsRenderer?.primaryContents
        ?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents;

    if (!contents) {
      return null;
    }

    // Trouver la première vidéo
    const videoData = contents.find(
      (item: Record<string, unknown>) => item.videoRenderer
    )?.videoRenderer;

    if (!videoData) {
      return null;
    }

    return videoData.videoId;
  } catch {
    return null;
  }
}

function parseFileContent(content: string): ShowItem[] {
  // Extraire le tableau JSON du fichier TypeScript
  const match = content.match(/export const \w+ = (\[[\s\S]*\]);/);
  if (!match) {
    throw new Error("Impossible de parser le fichier");
  }

  // Évaluer le tableau (attention: ceci est sûr car on contrôle le contenu)
  const arrayStr = match[1];
  // Convertir en JSON valide
  const jsonStr = arrayStr
    .replace(/(\w+):/g, '"$1":') // Ajouter des guillemets aux clés
    .replace(/'/g, '"') // Remplacer les apostrophes par des guillemets
    .replace(/,\s*}/g, "}") // Supprimer les virgules trailing
    .replace(/,\s*]/g, "]"); // Supprimer les virgules trailing

  try {
    return JSON.parse(jsonStr);
  } catch {
    // Si le parsing JSON échoue, utiliser eval (moins sûr mais fonctionne)
    return eval(arrayStr);
  }
}

function generateFileContent(
  items: ShowItem[],
  varName: string,
  originalContent: string
): string {
  // Extraire le commentaire d'en-tête s'il existe
  const headerMatch = originalContent.match(/^(\/\/[^\n]*\n)*/);
  const header = headerMatch ? headerMatch[0] : "";

  // Générer le nouveau contenu
  let content = header;
  content += `export const ${varName} = [\n`;

  items.forEach((item, index) => {
    // Chercher les commentaires de section dans l'original
    const originalLines = originalContent.split("\n");
    for (const line of originalLines) {
      if (line.includes(`id: ${item.id},`) || line.includes(`id: ${item.id}`)) {
        // Chercher un commentaire de section avant cet item
        const lineIndex = originalLines.indexOf(line);
        for (let i = lineIndex - 1; i >= 0; i--) {
          const prevLine = originalLines[i].trim();
          if (prevLine.startsWith("// ===")) {
            if (index > 0) content += `\n  ${prevLine}\n`;
            else content += `  ${prevLine}\n`;
            break;
          }
          if (prevLine.includes("id:")) break;
        }
        break;
      }
    }

    content += "  {\n";
    content += `    id: ${item.id},\n`;
    content += `    name: "${item.name.replace(/"/g, '\\"')}",\n`;
    content += `    query: "${item.query.replace(/"/g, '\\"')}",\n`;
    content += `    year: ${item.year},\n`;
    content += `    genre: "${item.genre}",\n`;
    if (item.youtubeId) {
      content += `    youtubeId: "${item.youtubeId}",\n`;
    }
    content += "  },\n";
  });

  content += "];\n";

  return content;
}

async function processFile(
  filePath: string,
  varName: string
): Promise<{ total: number; found: number; skipped: number }> {
  const fullPath = path.join(process.cwd(), filePath);
  console.log(`\n📂 Traitement de ${filePath}...`);

  const content = fs.readFileSync(fullPath, "utf-8");

  // Parser le contenu existant
  let items: ShowItem[];
  try {
    // Import dynamique du fichier
    const imported = await import(fullPath);
    items = imported[varName] || imported.default;
  } catch {
    console.log("⚠️ Import direct échoué, parsing manuel...");
    items = parseFileContent(content);
  }

  console.log(`📊 ${items.length} items trouvés`);

  let found = 0;
  let skipped = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    // Si déjà un youtubeId, on skip
    if (item.youtubeId) {
      console.log(`⏭️  [${i + 1}/${items.length}] ${item.name} - déjà un ID`);
      skipped++;
      continue;
    }

    console.log(`🔍 [${i + 1}/${items.length}] Recherche: ${item.name}...`);

    const youtubeId = await searchYouTube(item.query);

    if (youtubeId) {
      items[i].youtubeId = youtubeId;
      console.log(`✅ ${item.name} -> ${youtubeId}`);
      found++;
    } else {
      console.log(`❌ ${item.name} - pas trouvé`);
    }

    // Délai plus long pour éviter le rate limiting YouTube
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  // Réécrire le fichier
  const newContent = generateFileContent(items, varName, content);
  fs.writeFileSync(fullPath, newContent, "utf-8");

  console.log(`\n💾 Fichier ${filePath} mis à jour!`);

  return { total: items.length, found, skipped };
}

async function main() {
  console.log("🚀 Démarrage du script de récupération des YouTube IDs\n");
  console.log("=".repeat(60));

  const stats = {
    total: 0,
    found: 0,
    skipped: 0,
  };

  for (const file of BDD_FILES) {
    try {
      const result = await processFile(file.path, file.varName);
      stats.total += result.total;
      stats.found += result.found;
      stats.skipped += result.skipped;
    } catch (error) {
      console.error(`❌ Erreur sur ${file.path}:`, error);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("📊 RÉSUMÉ:");
  console.log(`   Total items: ${stats.total}`);
  console.log(`   IDs trouvés: ${stats.found}`);
  console.log(`   Déjà présents: ${stats.skipped}`);
  console.log(`   Non trouvés: ${stats.total - stats.found - stats.skipped}`);
  console.log("\n✅ Terminé!");
}

main().catch(console.error);
