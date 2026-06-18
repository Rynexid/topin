export interface VoucherItem {
  slug: string;
  name: string;
  gradient: string;
  href: string;
}

export const voucherItems: VoucherItem[] = [
  {
    slug: "steam-wallet",
    name: "Steam Wallet",
    gradient: "from-cyan-600 to-blue-500",
    href: "/games/steam-wallet",
  },
  {
    slug: "google-play",
    name: "Google Play",
    gradient: "from-green-600 to-emerald-500",
    href: "/games/google-play",
  },
  {
    slug: "garena-shells",
    name: "Garena Shells",
    gradient: "from-yellow-600 to-amber-500",
    href: "/games/garena-shells",
  },
  {
    slug: "xbox-game-pass",
    name: "Xbox Game Pass",
    gradient: "from-green-700 to-lime-600",
    href: "/games/xbox-game-pass",
  },
  {
    slug: "unipin-voucher",
    name: "UniPin Voucher",
    gradient: "from-red-600 to-pink-500",
    href: "/games/unipin-voucher",
  },
];
