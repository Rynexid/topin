import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Gamepad2, ShoppingCart, Users, Image, Settings,
  Menu, X, LogOut, ChevronRight
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useAuth } from "@/shared/hooks/useAuth";
import { Avatar } from "@/shared/components/ui/avatar";
import { ROUTES } from "@/shared/constants";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Games", href: "/admin/games", icon: Gamepad2 },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Banners", href: "/admin/banners", icon: Image },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const currentNav = navItems.find((item) => item.href === location.pathname);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface/95 backdrop-blur-xl transition-transform duration-200 md:sticky md:top-16 md:block md:h-[calc(100vh-4rem)]",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-6 md:hidden">
          <span className="font-bold text-textPrimary">Menu</span>
          <button onClick={() => setSidebarOpen(false)} className="text-textSecondary hover:text-textPrimary">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-textSecondary hover:bg-surface hover:text-textPrimary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <Link
            to={ROUTES.home}
            className="flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm text-textSecondary hover:bg-surface hover:text-textPrimary transition-colors"
          >
            <LayoutDashboard className="h-4 w-4" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        {/* Top bar */}
        <div className="sticky top-16 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-textSecondary hover:text-textPrimary md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-sm font-medium text-textPrimary">
                {currentNav?.label || "Admin"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-[12px] px-3 py-1.5 text-sm text-textSecondary hover:bg-surface hover:text-textPrimary transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            <div className="flex items-center gap-2">
              <Avatar name={user?.name || "Admin"} size="sm" />
              <span className="hidden text-sm text-textPrimary sm:inline">{user?.name}</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
