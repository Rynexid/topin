import { Routes, Route } from "react-router-dom";
import { RootLayout } from "@/app/layouts/root";
import { HomePage } from "@/pages/home";
import { GamesPage } from "@/pages/games";
import { GameDetailPage } from "@/pages/game-detail";
import { LoginPage } from "@/pages/auth/login";
import { RegisterPage } from "@/pages/auth/register";
import { ForgotPasswordPage } from "@/pages/auth/forgot-password";
import { CheckoutPage } from "@/pages/checkout";
import { DashboardPage } from "@/pages/user/dashboard";
import { MyOrdersPage } from "@/pages/user/orders";
import { ProfilePage } from "@/pages/user/profile";
import { AdminDashboardPage } from "@/pages/admin/dashboard";
import { AdminGamesPage } from "@/pages/admin/games";
import { AdminOrdersPage } from "@/pages/admin/orders";
import { AdminUsersPage } from "@/pages/admin/users";
import { AdminBannersPage } from "@/pages/admin/banners";
import { AdminSettingsPage } from "@/pages/admin/settings";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="games" element={<GamesPage />} />
        <Route path="games/:slug" element={<GameDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="dashboard/orders" element={<MyOrdersPage />} />
        <Route path="dashboard/profile" element={<ProfilePage />} />
        <Route path="admin" element={<AdminDashboardPage />} />
        <Route path="admin/games" element={<AdminGamesPage />} />
        <Route path="admin/orders" element={<AdminOrdersPage />} />
        <Route path="admin/users" element={<AdminUsersPage />} />
        <Route path="admin/banners" element={<AdminBannersPage />} />
        <Route path="admin/settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
}
