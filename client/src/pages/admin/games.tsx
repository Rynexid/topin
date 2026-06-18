import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useAuth } from "@/shared/hooks/useAuth";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Rating } from "@/shared/components/ui/rating";
import { Dialog } from "@/shared/components/ui/dialog";
import { Select } from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { AdminLayout } from "@/shared/components/admin-layout";
import { getGames, saveGame, deleteGame, createGame, getNextGradient } from "@/shared/constants/games";
import type { GameData } from "@/shared/constants/games";
import { ROUTES } from "@/shared/constants";

const genres = ["MOBA", "Battle Royale", "FPS", "RPG", "Sports", "Platform", "Digital Wallet"];

export function AdminGamesPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const [games, setGames] = useState<GameData[]>([]);
  const [search, setSearch] = useState("");
  const [editingGame, setEditingGame] = useState<GameData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<GameData>>({});

  useEffect(() => {
    setGames(getGames());
  }, []);

  const refresh = () => setGames(getGames());

  const filtered = games.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.publisher.toLowerCase().includes(search.toLowerCase()) ||
      g.genre.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditingGame(null);
    setFormData({
      name: "",
      slug: "",
      shortDescription: "",
      publisher: "",
      genre: "MOBA",
      gradient: getNextGradient(),
      featured: false,
      sortOrder: games.length + 1,
      rating: 0,
      topUpFields: [{ key: "gameId", label: "Game ID", placeholder: "Masukkan ID game", required: true }],
    });
    setShowForm(true);
  };

  const openEdit = (game: GameData) => {
    setEditingGame(game);
    setFormData({ ...game });
    setShowForm(true);
  };

  const handleSave = () => {
    const data = formData as GameData;
    if (!data.name || !data.slug || !data.publisher) return;

    if (editingGame) {
      saveGame({ ...editingGame, ...data });
    } else {
      createGame(data);
    }
    setShowForm(false);
    refresh();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      deleteGame(id);
      refresh();
    }
  };

  const handleChange = (field: keyof GameData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (authLoading) return null;
  if (!isAuthenticated) return <Navigate to={ROUTES.login} />;
  if (user?.role !== "ADMIN") return <Navigate to={ROUTES.dashboard} />;

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">Games</h1>
          <p className="mt-1 text-sm text-textSecondary">{games.length} games total</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" /> Add Game
        </Button>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-textSecondary" />
        <Input
          placeholder="Search by name, publisher, genre..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((game) => (
          <Card
            key={game.id}
            className="group overflow-hidden backdrop-blur-xl bg-surface/80 border-white/5 transition-all hover:border-primary/30"
          >
            {/* Cover */}
            <div className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${game.gradient} md:h-40`}>
              <span className="text-4xl font-bold text-white/90 drop-shadow-sm">
                {game.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </span>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => { e.preventDefault(); openEdit(game); }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => { e.preventDefault(); handleDelete(game.id); }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/50 text-danger backdrop-blur-sm hover:bg-black/70 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {game.featured && (
                <div className="absolute left-2 top-2">
                  <Badge variant="default">Top Pick</Badge>
                </div>
              )}
            </div>

            {/* Info */}
            <CardContent className="p-4">
              <div className="mb-1 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-textPrimary">{game.name}</h3>
                  <p className="text-xs text-textSecondary">{game.publisher}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <Badge variant="secondary" className="text-[10px]">{game.genre}</Badge>
                <Rating value={game.rating} readonly size="sm" showValue />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="backdrop-blur-xl bg-surface/80 border-white/5 p-12 text-center">
          <p className="text-textSecondary">No games found</p>
        </Card>
      )}

      {/* Add/Edit Dialog */}
      <Dialog
        open={showForm}
        onClose={() => setShowForm(false)}
        title={editingGame ? "Edit Game" : "Add Game"}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="mb-1 block text-sm text-textSecondary">Name</label>
              <Input
                value={formData.name || ""}
                onChange={(e) => {
                  handleChange("name", e.target.value);
                  if (!editingGame) {
                    handleChange("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"));
                  }
                }}
                placeholder="Game name"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="mb-1 block text-sm text-textSecondary">Slug</label>
              <Input
                value={formData.slug || ""}
                onChange={(e) => handleChange("slug", e.target.value)}
                placeholder="game-slug"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-textSecondary">Short Description</label>
            <Textarea
              value={formData.shortDescription || ""}
              onChange={(e) => handleChange("shortDescription", e.target.value)}
              placeholder="Brief description of the game"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm text-textSecondary">Publisher</label>
              <Input
                value={formData.publisher || ""}
                onChange={(e) => handleChange("publisher", e.target.value)}
                placeholder="Publisher name"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-textSecondary">Genre</label>
              <Select
                value={formData.genre || "MOBA"}
                onChange={(e) => handleChange("genre", e.target.value)}
              >
                {genres.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm text-textSecondary">Sort Order</label>
              <Input
                type="number"
                value={formData.sortOrder || 0}
                onChange={(e) => handleChange("sortOrder", parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-textSecondary">Rating</label>
              <div className="flex h-10 items-center">
                <Rating
                  value={formData.rating || 0}
                  onChange={(v) => handleChange("rating", v)}
                  size="lg"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured || false}
              onChange={(e) => handleChange("featured", e.target.checked)}
              className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary"
            />
            <label htmlFor="featured" className="text-sm text-textPrimary">Top Pick</label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={!formData.name || !formData.slug || !formData.publisher}>
              {editingGame ? "Save Changes" : "Create Game"}
            </Button>
          </div>
        </div>
      </Dialog>
    </AdminLayout>
  );
}
