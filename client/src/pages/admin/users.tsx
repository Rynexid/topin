import { Navigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth";
import { Card, CardContent } from "@/shared/components/ui/card";
import { AdminLayout } from "@/shared/components/admin-layout";
import { ROUTES } from "@/shared/constants";

const mockUsers = [
  { id: "1", name: "Admin", email: "admin@topin.com", role: "ADMIN", status: "Active" },
  { id: "2", name: "User Demo", email: "user@demo.com", role: "USER", status: "Active" },
];

export function AdminUsersPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to={ROUTES.login} />;
  if (user?.role !== "ADMIN") return <Navigate to={ROUTES.dashboard} />;

  return (
    <AdminLayout>
      <h1 className="mb-6 text-2xl font-bold text-textPrimary">Users</h1>
      <div className="space-y-3">
        {mockUsers.map((u) => (
          <Card key={u.id} className="backdrop-blur-xl bg-surface/80 border-white/5">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-textPrimary">{u.name}</p>
                <p className="text-sm text-textSecondary">{u.email}</p>
              </div>
              <div className="text-right text-sm">
                <p className="text-textSecondary">{u.role}</p>
                <p className="text-success">{u.status}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
