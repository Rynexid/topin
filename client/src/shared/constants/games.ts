export interface TopUpField {
  key: string;
  label: string;
  placeholder: string;
  required?: boolean;
}

export interface GameData {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  publisher: string;
  genre: string;
  gradient: string;
  featured: boolean;
  sortOrder: number;
  rating: number;
  coverBg?: string;
  topUpFields?: TopUpField[];
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 15);
}

const presetGradients = [
  "from-blue-600 to-blue-400",
  "from-red-600 to-orange-500",
  "from-amber-600 to-yellow-500",
  "from-red-500 to-rose-600",
  "from-emerald-500 to-teal-400",
  "from-purple-600 to-violet-500",
  "from-pink-500 to-rose-400",
  "from-cyan-600 to-blue-500",
  "from-orange-600 to-amber-500",
  "from-emerald-600 to-green-500",
  "from-indigo-600 to-blue-500",
  "from-rose-600 to-pink-500",
  "from-red-700 to-red-500",
  "from-lime-600 to-green-500",
  "from-sky-600 to-cyan-500",
];

const defaultGames: Omit<GameData, "id">[] = [
  { name: "Mobile Legends", slug: "mobile-legends", shortDescription: "Popular MOBA game by Moonton", publisher: "Moonton", genre: "MOBA", gradient: "from-blue-600 to-blue-400", featured: true, sortOrder: 1, rating: 4.8, topUpFields: [{ key: "gameId", label: "Game ID", placeholder: "Masukkan ID game", required: true }, { key: "serverId", label: "Server ID", placeholder: "Masukkan server ID", required: true }] },
  { name: "Free Fire", slug: "free-fire", shortDescription: "Battle royale game by Garena", publisher: "Garena", genre: "Battle Royale", gradient: "from-red-600 to-orange-500", featured: true, sortOrder: 2, rating: 4.5, topUpFields: [{ key: "gameId", label: "Nickname", placeholder: "Masukkan nickname", required: true }] },
  { name: "PUBG Mobile", slug: "pubg-mobile", shortDescription: "Battle royale game by Tencent", publisher: "Tencent", genre: "Battle Royale", gradient: "from-amber-600 to-yellow-500", featured: true, sortOrder: 3, rating: 4.6, topUpFields: [{ key: "gameId", label: "Character ID", placeholder: "Masukkan character ID", required: true }] },
  { name: "Valorant", slug: "valorant", shortDescription: "Tactical FPS by Riot Games", publisher: "Riot Games", genre: "FPS", gradient: "from-red-500 to-rose-600", featured: true, sortOrder: 4, rating: 4.7, topUpFields: [{ key: "gameId", label: "Riot ID", placeholder: "Nama#Tag", required: true }] },
  { name: "Genshin Impact", slug: "genshin-impact", shortDescription: "Open-world RPG by HoYoverse", publisher: "HoYoverse", genre: "RPG", gradient: "from-emerald-500 to-teal-400", featured: true, sortOrder: 5, rating: 4.4, topUpFields: [{ key: "gameId", label: "UID", placeholder: "Masukkan UID 9 digit", required: true }] },
  { name: "Honkai Star Rail", slug: "honkai-star-rail", shortDescription: "Space fantasy RPG by HoYoverse", publisher: "HoYoverse", genre: "RPG", gradient: "from-purple-600 to-violet-500", featured: true, sortOrder: 6, rating: 4.3, topUpFields: [{ key: "gameId", label: "UID", placeholder: "Masukkan UID", required: true }] },
  { name: "Roblox", slug: "roblox", shortDescription: "Online game platform and creation system", publisher: "Roblox Corporation", genre: "Platform", gradient: "from-pink-500 to-rose-400", featured: true, sortOrder: 7, rating: 4.2, topUpFields: [{ key: "gameId", label: "Username", placeholder: "Masukkan username Roblox", required: true }] },
  { name: "Steam Wallet", slug: "steam-wallet", shortDescription: "Digital wallet for Steam platform", publisher: "Valve", genre: "Digital Wallet", gradient: "from-cyan-600 to-blue-500", featured: true, sortOrder: 8, rating: 4.6, topUpFields: [{ key: "gameId", label: "Steam ID", placeholder: "Masukkan Steam ID", required: true }] },
  { name: "Call of Duty Mobile", slug: "cod-mobile", shortDescription: "FPS game by Activision", publisher: "Activision", genre: "FPS", gradient: "from-orange-600 to-amber-500", featured: true, sortOrder: 9, rating: 4.5, topUpFields: [{ key: "gameId", label: "Game ID", placeholder: "Masukkan ID game", required: true }] },
  { name: "Arena Breakout", slug: "arena-breakout", shortDescription: "Tactical FPS by Tencent", publisher: "Tencent", genre: "FPS", gradient: "from-emerald-600 to-green-500", featured: true, sortOrder: 10, rating: 4.1, topUpFields: [{ key: "gameId", label: "Game ID", placeholder: "Masukkan ID game", required: true }] },
  { name: "League of Legends Wild Rift", slug: "wild-rift", shortDescription: "MOBA by Riot Games", publisher: "Riot Games", genre: "MOBA", gradient: "from-indigo-600 to-blue-500", featured: true, sortOrder: 11, rating: 4.3, topUpFields: [{ key: "gameId", label: "Riot ID", placeholder: "Nama#Tag", required: true }] },
  { name: "Point Blank", slug: "point-blank", shortDescription: "FPS game by Zepetto", publisher: "Zepetto", genre: "FPS", gradient: "from-rose-600 to-pink-500", featured: true, sortOrder: 12, rating: 4.0, topUpFields: [{ key: "gameId", label: "Game ID", placeholder: "Masukkan ID game", required: true }] },
  { name: "Blood Strike", slug: "blood-strike", shortDescription: "Fast-paced FPS battle royale", publisher: "NetEase", genre: "FPS", gradient: "from-red-700 to-red-500", featured: true, sortOrder: 13, rating: 4.2, topUpFields: [{ key: "gameId", label: "Game ID", placeholder: "Masukkan ID game", required: true }] },
  { name: "Delta Force", slug: "delta-force", shortDescription: "Tactical FPS by TiMi Studio", publisher: "TiMi Studio", genre: "FPS", gradient: "from-lime-600 to-green-500", featured: true, sortOrder: 14, rating: 4.4, topUpFields: [{ key: "gameId", label: "Game ID", placeholder: "Masukkan ID game", required: true }] },
  { name: "FC Mobile", slug: "fc-mobile", shortDescription: "Football game by EA Sports", publisher: "EA Sports", genre: "Sports", gradient: "from-sky-600 to-cyan-500", featured: true, sortOrder: 15, rating: 4.1, topUpFields: [{ key: "gameId", label: "Game ID", placeholder: "Masukkan ID game", required: true }] },
];

export function getGames(): GameData[] {
  const stored = localStorage.getItem("topin_games");
  if (stored) {
    try {
      const games: GameData[] = JSON.parse(stored);
      let migrated = false;
      const defaultMap = new Map(defaultGames.map((g) => [g.slug, g]));
      for (const game of games) {
        const def = defaultMap.get(game.slug);
        if (def?.topUpFields && JSON.stringify(game.topUpFields) !== JSON.stringify(def.topUpFields)) {
          game.topUpFields = def.topUpFields;
          migrated = true;
        }
      }
      if (migrated) localStorage.setItem("topin_games", JSON.stringify(games));
      return games;
    } catch {
      // fall through
    }
  }
  const initial = defaultGames.map((g, i) => ({ ...g, id: generateId() }));
  localStorage.setItem("topin_games", JSON.stringify(initial));
  return initial;
}

export function getGameBySlug(slug: string): GameData | undefined {
  return getGames().find((g) => g.slug === slug);
}

export function saveGame(game: GameData): void {
  const games = getGames();
  const idx = games.findIndex((g) => g.id === game.id);
  if (idx >= 0) {
    games[idx] = game;
  } else {
    games.push(game);
  }
  localStorage.setItem("topin_games", JSON.stringify(games));
}

export function deleteGame(id: string): void {
  const games = getGames().filter((g) => g.id !== id);
  localStorage.setItem("topin_games", JSON.stringify(games));
}

export function createGame(data: Omit<GameData, "id">): GameData {
  const game: GameData = { ...data, id: generateId() };
  const games = getGames();
  games.push(game);
  localStorage.setItem("topin_games", JSON.stringify(games));
  return game;
}

export const cardImages: Record<string, string> = {
  "mobile-legends": "/assets/Cards/MobileLegends.jpg",
};

export const heroImages: Record<string, string> = {
  "mobile-legends": "/assets/Details/MobileLegends.jpeg",
};

export function getNextGradient(): string {
  const games = getGames();
  const used = new Set(games.map((g) => g.gradient));
  const available = presetGradients.find((g) => !used.has(g));
  return available || presetGradients[games.length % presetGradients.length];
}
