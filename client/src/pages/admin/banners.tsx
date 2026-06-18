import { Navigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { AdminLayout } from "@/shared/components/admin-layout";
import { ROUTES } from "@/shared/constants";

const mockBanners = [
  { id: "1", title: "Top Up Mobile Legends", subtitle: "Dapatkan diamond MLBB dengan harga terbaik", active: true },
  { id: "2", title: "Free Fire Diamond", subtitle: "Top up Free Fire murah dan cepat", active: true },
  { id: "3", title: "PUBG Mobile UC", subtitle: "Beli UC PUBG Mobile dengan harga promo", active: true },
];

export function AdminBannersPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to={ROUTES.login} />;
  if (user?.role !== "ADMIN") return <Navigate to={ROUTES.dashboard} />;

  return (
    <AdminLayout>
      <h1 className="mb-6 text-2xl font-bold text-textPrimary">Banners</h1>
      <div className="space-y-3">
        {mockBanners.map((b) => (
          <Card key={b.id} className="backdrop-blur-xl bg-surface/80 border-white/5">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-textPrimary">{b.title}</p>
                <p className="text-sm text-textSecondary">{b.subtitle}</p>
              </div>
              <Badge variant={b.active ? "success" : "secondary"}>
                {b.active ? "Active" : "Inactive"}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
