import { Navigate } from "react-router-dom";
import { TrendingUp, Gamepad2, ShoppingCart, DollarSign } from "lucide-react";
import { useAuth } from "@/shared/hooks/useAuth";
import { Card } from "@/shared/components/ui/card";
import { AdminLayout } from "@/shared/components/admin-layout";
import { getGames } from "@/shared/constants/games";
import { ROUTES } from "@/shared/constants";

export function AdminDashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to={ROUTES.login} />;
  if (user?.role !== "ADMIN") return <Navigate to={ROUTES.dashboard} />;

  const games = getGames();

  const stats = [
    { label: "Total Games", value: games.length, icon: Gamepad2, change: "+3", changeType: "up" },
    { label: "Active Orders", value: "24", icon: ShoppingCart, change: "+12%", changeType: "up" },
    { label: "Total Revenue", value: "Rp 45.8M", icon: DollarSign, change: "+8.2%", changeType: "up" },
    { label: "Avg. Rating", value: "4.3", icon: TrendingUp, change: "+0.2", changeType: "up" },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-textPrimary">Overview</h1>
        <p className="mt-1 text-sm text-textSecondary">Welcome back, {user?.name}</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="backdrop-blur-xl bg-surface/80 border-white/5 p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-textSecondary">{stat.label}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-textPrimary">{stat.value}</div>
            <div className="mt-1 text-xs text-success">{stat.change} this month</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="backdrop-blur-xl bg-surface/80 border-white/5 p-6">
          <h3 className="mb-4 font-semibold text-textPrimary">Recent Games</h3>
          <div className="space-y-3">
            {games.slice(0, 5).map((game) => (
              <div key={game.id} className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${game.gradient}`}>
                  <span className="text-sm font-bold text-white">{game.name[0]}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-textPrimary">{game.name}</p>
                  <p className="text-xs text-textSecondary">{game.genre}</p>
                </div>
                <span className="text-xs text-warning">{game.rating}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="backdrop-blur-xl bg-surface/80 border-white/5 p-6">
          <h3 className="mb-4 font-semibold text-textPrimary">Quick Actions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-[12px] bg-background p-3">
              <span className="text-sm text-textPrimary">Add New Game</span>
              <span className="text-xs text-textSecondary">Games → Add</span>
            </div>
            <div className="flex items-center justify-between rounded-[12px] bg-background p-3">
              <span className="text-sm text-textPrimary">View Orders</span>
              <span className="text-xs text-textSecondary">Orders → List</span>
            </div>
            <div className="flex items-center justify-between rounded-[12px] bg-background p-3">
              <span className="text-sm text-textPrimary">Update Settings</span>
              <span className="text-xs text-textSecondary">Settings → Edit</span>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
