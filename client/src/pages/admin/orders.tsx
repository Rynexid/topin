import { Navigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { formatPrice, formatDate } from "@/shared/lib/utils";
import { ORDER_STATUS, ROUTES } from "@/shared/constants";
import { AdminLayout } from "@/shared/components/admin-layout";

interface OrderData {
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  customerName?: string;
  gameUserId?: string;
}

export function AdminOrdersPage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  const stored = localStorage.getItem("topin_orders");
  const orders: OrderData[] = stored ? JSON.parse(stored) : [];

  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to={ROUTES.login} />;
  if (user?.role !== "ADMIN") return <Navigate to={ROUTES.dashboard} />;

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-textPrimary">Orders</h1>
        <p className="mt-1 text-sm text-textSecondary">{orders.length} orders total</p>
      </div>

      {orders.length === 0 ? (
        <Card className="backdrop-blur-xl bg-surface/80 border-white/5 p-12 text-center">
          <p className="text-textSecondary">No orders found</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {orders.map((order, i) => (
            <Card key={i} className="backdrop-blur-xl bg-surface/80 border-white/5">
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium text-textPrimary">{order.orderNumber}</p>
                  <p className="text-sm text-textSecondary">
                    {order.customerName || "Guest"} &middot; {formatDate(order.createdAt)}
                  </p>
                  {order.gameUserId && (
                    <p className="text-sm text-textSecondary">Game ID: {order.gameUserId}</p>
                  )}
                </div>
                <div className="text-right">
                  <Badge variant={ORDER_STATUS[order.status]?.color?.split(" ")[0] as any || "default"}>
                    {ORDER_STATUS[order.status]?.label || order.status}
                  </Badge>
                  <p className="mt-1 font-semibold text-textPrimary">{formatPrice(order.totalAmount)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
