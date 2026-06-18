export interface Campaign {
  id: string;
  title: string;
  description: string;
  badge: string;
  cta: string;
  image?: string;
  gradient: string;
  href: string;
  gameSlug?: string;
}

export const campaigns: Campaign[] = [
  {
    id: "mlbbJunePromo",
    title: "Mobile Legends Diamond Sale",
    description: "Get bonus diamonds and exclusive rewards for a limited time.",
    badge: "FEATURED CAMPAIGN",
    cta: "Top Up Now \u2192",
    image: "/assets/campaign/campaign1.jpg",
    gradient: "from-blue-600 to-blue-400",
    href: "/games/mobile-legends",
    gameSlug: "mobile-legends",
  },
  {
    id: "freeFireBonusPromo",
    title: "Free Fire Bonus Week",
    description: "Double rewards and exclusive weapon skins await. Limited time only.",
    badge: "LIMITED EVENT",
    cta: "Top Up Now \u2192",
    image: "/assets/campaign/campaign2.jpg",
    gradient: "from-red-600 to-orange-500",
    href: "/games/free-fire",
    gameSlug: "free-fire",
  },
  {
    id: "valorantPointsSale",
    title: "Valorant Points Sale",
    description: "Get more VP for your buck. Unlock your favorite skins today.",
    badge: "BONUS OFFER",
    cta: "Claim Now \u2192",
    image: "/assets/campaign/campaign3.jpg",
    gradient: "from-red-500 to-rose-600",
    href: "/games/valorant",
    gameSlug: "valorant",
  },
  {
    id: "genshinGenesisPromo",
    title: "Genshin Impact Bonus",
    description: "Double your Genesis Crystals with our limited-time bonus event.",
    badge: "EXCLUSIVE OFFER",
    cta: "Top Up Now \u2192",
    image: "/assets/campaign/campaign4.jpg",
    gradient: "from-emerald-500 to-teal-400",
    href: "/games/genshin-impact",
    gameSlug: "genshin-impact",
  },
  {
    id: "topinCashbackPromo",
    title: "TOPIN Cashback 10%",
    description: "Get 10% cashback on every transaction. The more you top up, the more you save.",
    badge: "CASHBACK DEAL",
    cta: "Shop Now \u2192",
    image: "/assets/campaign/campaign5.jpg",
    gradient: "from-cyan-600 to-blue-500",
    href: "/games",
  },
];
