export interface BlogItem {
  id: string;
  cover: string;
  title: string;
  author: string;
  category: string;
  publish: string;
  description: string;
}

const blogGradients = [
  "from-blue-600 to-cyan-500",
  "from-purple-600 to-violet-500",
  "from-emerald-600 to-teal-500",
  "from-orange-600 to-amber-500",
  "from-rose-600 to-pink-500",
  "from-indigo-600 to-blue-500",
];

export const blogPosts: BlogItem[] = [
  {
    id: "mlbb-diamond-guide",
    cover: blogGradients[0],
    title: "Cara Top Up Diamond Mobile Legends Termurah 2025",
    author: "TOPIN Team",
    category: "Tutorial",
    publish: "12 Jun 2025",
    description: "Panduan lengkap top up diamond Mobile Legends dengan harga terbaik. Dapatkan bonus dan promo spesial setiap hari.",
  },
  {
    id: "free-fire-methods",
    cover: blogGradients[1],
    title: "4 Metode Top Up Free Fire Paling Cepat",
    author: "TOPIN Team",
    category: "Tips",
    publish: "10 Jun 2025",
    description: "Temukan metode top up Free Fire tercepat dengan berbagai pilihan pembayaran. Proses instan tanpa ribet.",
  },
  {
    id: "topin-cashback",
    cover: blogGradients[2],
    title: "Program Cashback TOPIN: Dapatkan 10% Kembali",
    author: "TOPIN Team",
    category: "Promo",
    publish: "8 Jun 2025",
    description: "Nikmati cashback 10% untuk setiap transaksi top up game favorit kamu. Periode terbatas, jangan lewatkan!",
  },
  {
    id: "genshin-genesis",
    cover: blogGradients[3],
    title: "Cara Mendapatkan Genesis Crystal Genshin Impact",
    author: "TOPIN Team",
    category: "Tutorial",
    publish: "5 Jun 2025",
    description: "Panduan membeli Genesis Crystal untuk Genshin Impact. Dapatkan bonus crystal eksklusif hanya di TOPIN.",
  },
  {
    id: "valorant-vp",
    cover: blogGradients[4],
    title: "Daftar Harga Valorant Points Terbaru 2025",
    author: "TOPIN Team",
    category: "Info",
    publish: "3 Jun 2025",
    description: "Update harga Valorant Points (VP) terbaru. Lengkap dengan perbandingan paket termurah untuk kamu.",
  },
];
