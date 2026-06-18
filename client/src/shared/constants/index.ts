export const APP_NAME = "TOPIN";

export const ROUTES = {
  home: "/",
  games: "/games",
  gameDetail: (slug: string) => `/games/${slug}`,
  about: "/about",
  contact: "/contact",
  faq: "/faq",
  terms: "/terms",
  privacy: "/privacy",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  dashboard: "/dashboard",
  myOrders: "/dashboard/orders",
  profile: "/dashboard/profile",
  security: "/dashboard/security",
  admin: "/admin",
  adminGames: "/admin/games",
  adminProducts: "/admin/products",
  adminOrders: "/admin/orders",
  adminUsers: "/admin/users",
  adminBanners: "/admin/banners",
  adminSettings: "/admin/settings",
} as const;

export const ORDER_STATUS: Record<string, { label: string; color: string }> = {
  PENDING: { label: "Pending", color: "bg-warning/20 text-warning" },
  PROCESSING: { label: "Processing", color: "bg-primary/20 text-primary" },
  COMPLETED: { label: "Completed", color: "bg-success/20 text-success" },
  FAILED: { label: "Failed", color: "bg-danger/20 text-danger" },
  REFUNDED: { label: "Refunded", color: "bg-textSecondary/20 text-textSecondary" },
};
