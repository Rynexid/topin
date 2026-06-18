import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/constants";

export function DashboardPage() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to={ROUTES.login} />;
  if (user?.role === "ADMIN") return <Navigate to={ROUTES.admin} />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-textPrimary">Welcome, {user?.name}</h1>
      <p className="mb-8 text-textSecondary">Manage your account and view your orders</p>

      <div className="grid gap-6 md:grid-cols-3">
        <Link to={ROUTES.myOrders}>
          <Card className="cursor-pointer transition-all hover:border-primary/50">
            <CardContent className="p-6">
              <CardTitle className="mb-2">My Orders</CardTitle>
              <p className="text-sm text-textSecondary">View your order history</p>
            </CardContent>
          </Card>
        </Link>
        <Link to={ROUTES.profile}>
          <Card className="cursor-pointer transition-all hover:border-primary/50">
            <CardContent className="p-6">
              <CardTitle className="mb-2">Profile</CardTitle>
              <p className="text-sm text-textSecondary">Manage your profile</p>
            </CardContent>
          </Card>
        </Link>
        <Link to={ROUTES.security}>
          <Card className="cursor-pointer transition-all hover:border-primary/50">
            <CardContent className="p-6">
              <CardTitle className="mb-2">Security</CardTitle>
              <p className="text-sm text-textSecondary">Security settings</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
