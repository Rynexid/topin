<div align="center">
  <h1>TOPIN</h1>
  <p>Game Top Up Platform</p>
  <p>
    <strong>Modern · Fast · Trusted</strong>
  </p>
  <p>
    <strong>English</strong> · <a href="docs/README_ID.md">Indonesia</a>
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

TOPIN is a full-stack game top-up platform built with modern web technologies. Users can browse games, check account details, select top-up products, choose payment methods, and complete orders in a seamless two-step checkout flow.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Bun 1.2 |
| Frontend | React 19, TypeScript, Vite 6, Tailwind CSS v4 |
| UI Library | Shadcn UI, Lucide React, Framer Motion |
| State & Routing | TanStack Query, React Router v7 |
| Backend (docs) | Hono 4.6, Prisma 6, Neon PostgreSQL, JWT |
| Architecture | Feature-based, clean separation of concerns |

### Project Structure

```
topin/
├── client/                    # Frontend application
│   └── src/
│       ├── app/               # Router, providers, layouts
│       ├── pages/             # Page components
│       │   ├── admin/         # Admin dashboard pages
│       │   ├── auth/          # Login, register, forgot password
│       │   ├── checkout/      # Two-step checkout
│       │   ├── game-detail/   # Game detail with auto-verify
│       │   ├── games/         # Game catalog
│       │   ├── home/          # Homepage with carousel
│       │   └── user/          # User dashboard, orders, profile
│       ├── shared/            # UI components, hooks, lib, types, constants
│       └── styles/            # Tailwind config and global styles
│
├── server/                    # Backend architecture specs
│   ├── docs/                  # Module specifications & API contracts
│   │   ├── modules/           # 9 feature modules (auth, games, orders, etc.)
│   │   └── TUGAS.md           # Backend implementation guide
│   └── prisma/                # Database schema (reference schema.prisma)
│
├── public/                    # Static assets
│   └── assets/                # Card images, campaign banners, detail images
│
└── package.json               # Root scripts with concurrently
```

### Getting Started

```bash
# Install dependencies
bun install

# Start development (client only — backend is documented but not implemented)
bun run dev:client

# Or start both client and server
bun run dev
```

The client runs on `http://localhost:5173`. The server (when implemented) runs on `http://localhost:4000`.

### Scripts

| Command | Description |
|---------|-------------|
| `bun run dev:client` | Start Vite dev server |
| `bun run dev:server` | Start Hono dev server |
| `bun run dev` | Start both with concurrently |
| `bun run build` | Build both client and server |
| `bun run lint` | Type-check both |
| `bun run db:migrate` | Run Prisma migrations |
| `bun run db:seed` | Seed the database |

### Design

Dark mode, primitive UI inspired by Linear, Stripe, Vercel, and Discord. Built with Tailwind CSS v4 custom theme tokens. Mobile-first responsive layout. The carousel uses full-bleed campaign images with auto-play and swipe support. Game cards use a 3:4 aspect ratio with gradient fallbacks and hover reveal.

### Login Demo

| Email | Role |
|-------|------|
| any email containing "admin" | ADMIN |
| anything else | USER |

No password validation in demo mode.

### Games Available

Mobile Legends, Free Fire, PUBG Mobile, Valorant, Genshin Impact, Honkai Star Rail, Roblox, Steam Wallet, Call of Duty Mobile, Arena Breakout, League of Legends Wild Rift, Point Blank, Blood Strike, Delta Force, FC Mobile

### Backend

The backend architecture is fully documented in `server/docs/` but not implemented in this repository. The Avilla team is responsible for implementation based on the specifications. See `server/docs/TUGAS.md` for the detailed task breakdown.

Key API modules: Auth, Users, Games, Products, Payments, Orders, Transactions, Banners, Settings (35 endpoints total).

---

<div align="center">
  <p>
    <a href="docs/README_ID.md">Indonesia</a> · <strong>English</strong>
  </p>
</div>
