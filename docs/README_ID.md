<div align="center">
  <h1>TOPIN</h1>
  <p>Platform Top Up Game</p>
  <p>
    <strong>Modern · Cepat · Terpercaya</strong>
  </p>
  <p>
    <a href="../README.md"><strong>English</strong></a> · <strong>Indonesia</strong>
  </p>
  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19" />
    <img src="https://img.shields.io/badge/Bun-1.2-000?logo=bun" alt="Bun" />
    <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss" alt="Tailwind v4" />
    <img src="https://img.shields.io/badge/Hono-4.6-FF6600?logo=hono" alt="Hono" />
    <img src="https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma" alt="Prisma" />
    <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License" />
  </p>
</div>

---

## Topin

TOPIN adalah platform top-up game full-stack yang dibangun dengan teknologi web modern. Pengguna dapat melihat daftar game, mengecek detail akun, memilih produk top-up, memilih metode pembayaran, dan menyelesaikan pesanan melalui alur checkout dua langkah.

### Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Runtime | Bun 1.2 |
| Frontend | React 19, TypeScript, Vite 6, Tailwind CSS v4 |
| UI Library | Shadcn UI, Lucide React, Framer Motion |
| State & Routing | TanStack Query, React Router v7 |
| Backend (dokumen) | Hono 4.6, Prisma 6, Neon PostgreSQL, JWT |
| Arsitektur | Berbasis fitur, pemisahan tanggung jawab yang bersih |

### Struktur Proyek

```
topin/
├── client/                    # Aplikasi frontend
│   └── src/
│       ├── app/               # Router, provider, layout
│       ├── pages/             # Komponen halaman
│       │   ├── admin/         # Halaman dashboard admin
│       │   ├── auth/          # Login, daftar, lupa password
│       │   ├── checkout/      # Checkout dua langkah
│       │   ├── game-detail/   # Detail game dengan verifikasi akun
│       │   ├── games/         # Katalog game
│       │   ├── home/          # Beranda dengan carousel
│       │   └── user/          # Dashboard pengguna, pesanan, profil
│       ├── shared/            # Komponen UI, hook, lib, tipe, konstanta
│       └── styles/            # Konfigurasi Tailwind dan style global
│
├── server/                    # Spesifikasi arsitektur backend
│   ├── docs/                  # Spesifikasi modul dan kontrak API
│   │   ├── modules/           # 9 modul fitur (auth, games, orders, dll)
│   │   └── TUGAS.md           # Panduan implementasi backend
│   └── prisma/                # Skema database (schema.prisma referensi)
│
├── public/                    # Aset statis
│   └── assets/                # Gambar kartu, banner campaign, gambar detail
│
└── package.json               # Script root dengan concurrently
```

### Memulai

```bash
# Install dependensi
bun install

# Mulai development (client saja, backend terdokumentasi tapi belum diimplementasi)
bun run dev:client

# Atau mulai client dan server bersamaan
bun run dev
```

Client berjalan di `http://localhost:5173`. Server (jika sudah diimplementasi) berjalan di `http://localhost:4000`.

### Script

| Perintah | Deskripsi |
|----------|-----------|
| `bun run dev:client` | Mulai Vite dev server |
| `bun run dev:server` | Mulai Hono dev server |
| `bun run dev` | Mulai keduanya dengan concurrently |
| `bun run build` | Build client dan server |
| `bun run lint` | Type-check keduanya |
| `bun run db:migrate` | Jalankan Prisma migrations |
| `bun run db:seed` | Seed database |

### Desain

Mode gelap dengan UI primitif terinspirasi dari Linear, Stripe, Vercel, dan Discord. Dibangun dengan tema kustom Tailwind CSS v4. Tata letak responsif mobile-first. Carousel menggunakan gambar kampanye penuh dengan putar otomatis dan dukungan geser. Kartu game menggunakan rasio aspek 3:4 dengan gradien cadangan dan efek hover.

### Demo Login

| Email | Role |
|-------|------|
| email yang mengandung "admin" | ADMIN |
| lainnya | USER |

Tidak ada validasi password di mode demo.

### Game yang Tersedia

Mobile Legends, Free Fire, PUBG Mobile, Valorant, Genshin Impact, Honkai Star Rail, Roblox, Steam Wallet, Call of Duty Mobile, Arena Breakout, League of Legends Wild Rift, Point Blank, Blood Strike, Delta Force, FC Mobile

### Backend

Arsitektur backend didokumentasikan sepenuhnya di `server/docs/` tetapi tidak diimplementasi di repositori ini. Tim Avilla bertanggung jawab untuk implementasi berdasarkan spesifikasi. Lihat `server/docs/TUGAS.md` untuk rincian tugas.

Modul API utama: Auth, Users, Games, Products, Payments, Orders, Transactions, Banners, Settings (total 35 endpoint).

---

<div align="center">
  <p>
    <a href="../README.md">English</a> · <strong>Indonesia</strong>
  </p>
</div>
