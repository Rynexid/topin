import { useState, useEffect, useCallback, type ReactNode } from "react";
import { AuthContext } from "@/shared/hooks/useAuth";
import type { User } from "@/shared/types";

function generateId(): string {
  return Math.random().toString(36).slice(2, 15);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("topin_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("topin_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const mockUser: User = {
      id: generateId(),
      email,
      name: email.split("@")[0],
      role: email.includes("admin") ? "ADMIN" : "USER",
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("topin_user", JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const register = useCallback(async (data: { email: string; password: string; name: string; phone?: string }) => {
    const mockUser: User = {
      id: generateId(),
      email: data.email,
      name: data.name,
      role: "USER",
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("topin_user", JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem("topin_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
