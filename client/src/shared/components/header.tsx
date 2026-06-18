import { Link, useNavigate } from "react-router-dom";
import { User, Menu, X, Bell } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useAuth } from "@/shared/hooks/useAuth";
import { ROUTES } from "@/shared/constants";
import { useState } from "react";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Games", href: ROUTES.games },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[#09090B]/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-tight text-textPrimary">
            TOPIN
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-textSecondary transition-colors hover:text-textPrimary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </Button>
            )}
           {isAuthenticated ? (
             <>
               <Link to={user?.role === "ADMIN" ? ROUTES.admin : ROUTES.dashboard}>
                 <Button variant="ghost" size="icon">
                   <User className="h-5 w-5" />
                 </Button>
               </Link>
               <Button variant="ghost" size="sm" className="hidden md:inline-flex" onClick={logout}>
                 Logout
               </Button>
             </>
           ) : (
              <Button variant="default" size="sm" className="hidden md:inline-flex" onClick={() => navigate(ROUTES.login)}>
                Login
              </Button>
           )}
           <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
             {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
           </button>
         </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-textSecondary transition-colors hover:text-textPrimary"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <Link
                to={ROUTES.login}
                className="flex items-center justify-center rounded-[12px] bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                onClick={() => setMobileOpen(false)}
              >
                Login / Daftar
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
