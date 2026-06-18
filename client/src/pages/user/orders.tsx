import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/shared/hooks/useAuth";
import { api } from "@/shared/services/api";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { formatPrice, formatDate } from "@/shared/lib/utils";
import { ORDER_STATUS, ROUTES } from "@/shared/constants";
import type { Order, PaginatedResponse } from "@/shared/types";

export function MyOrdersPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["myOrders"],
    queryFn: () => api.get<PaginatedResponse<Order>>("/v1/orders"),
    enabled: isAuthenticated,
  });

  if (authLoading) return null;
  if (!isAuthenticated) return <Navigate to={ROUTES.login} />;

  const orders = data?.data || [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold text-textPrimary">My Orders</h1>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="h-24 animate-pulse" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-textSecondary">No orders yet</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-textPrimary">{order.orderNumber}</p>
                    <p className="text-sm text-textSecondary">{formatDate(order.createdAt)}</p>
                    {order.orderItems && (
                      <p className="mt-1 text-sm text-textSecondary">
                        {order.orderItems.map((i) => i.product?.name).join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <Badge variant={ORDER_STATUS[order.status]?.color?.split(" ")[0] as any || "default"}>
                      {ORDER_STATUS[order.status]?.label || order.status}
                    </Badge>
                    <p className="mt-1 font-semibold text-textPrimary">{formatPrice(order.totalAmount)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
