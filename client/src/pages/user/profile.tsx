import { Navigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/constants";

export function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to={ROUTES.login} />;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold text-textPrimary">Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-textSecondary">Name</label>
            <p className="font-medium text-textPrimary">{user?.name}</p>
          </div>
          <div>
            <label className="text-sm text-textSecondary">Email</label>
            <p className="font-medium text-textPrimary">{user?.email}</p>
          </div>
          <div>
            <label className="text-sm text-textSecondary">Role</label>
            <p className="font-medium text-textPrimary">{user?.role}</p>
          </div>
          <div>
            <label className="text-sm text-textSecondary">Member Since</label>
            <p className="font-medium text-textPrimary">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("id-ID") : "-"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
