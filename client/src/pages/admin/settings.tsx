import { Navigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { AdminLayout } from "@/shared/components/admin-layout";
import { ROUTES } from "@/shared/constants";

export function AdminSettingsPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to={ROUTES.login} />;
  if (user?.role !== "ADMIN") return <Navigate to={ROUTES.dashboard} />;

  return (
    <AdminLayout>
      <h1 className="mb-6 text-2xl font-bold text-textPrimary">Settings</h1>
      <Card className="backdrop-blur-xl bg-surface/80 border-white/5 max-w-2xl">
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-textSecondary">Site Name</label>
            <Input defaultValue="TOPIN" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-textSecondary">Contact Email</label>
            <Input type="email" defaultValue="support@topin.com" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-textSecondary">Site Description</label>
            <Input defaultValue="Game Top Up Platform" />
          </div>
          <Button>Save Settings</Button>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
