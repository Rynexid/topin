import { useState } from "react";
import { Search, Gamepad2 } from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { ArtworkCard } from "@/shared/components/ui/artwork-card";
import { getGames } from "@/shared/constants/games";

export function GamesPage() {
  const [search, setSearch] = useState("");

  const games = getGames();

  const filtered = games.filter(
    (g) => g.name.toLowerCase().includes(search.toLowerCase()) || g.genre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textPrimary">Games</h1>
        <p className="mt-2 text-textSecondary">Choose your game and start top up</p>
      </div>

      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-textSecondary" />
        <Input
          placeholder="Search games..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <Gamepad2 className="mx-auto mb-4 h-12 w-12 text-textSecondary" />
          <p className="text-textSecondary">No games found matching "{search}"</p>
        </Card>
      ) : (
        <div className="grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-6">
          {filtered.map((game) => (
            <ArtworkCard
              key={game.id}
              slug={game.slug}
              name={game.name}
              gradient={game.gradient}
            />
          ))}
        </div>
      )}
    </div>
  );
}
