# Backend Architecture

**Team:** Avilla

## Overview

TOPIN uses a layered architecture with clear separation of concerns.

## Tech Stack

- **Runtime:** Bun
- **Framework:** Hono
- **ORM:** Prisma
- **Database:** Neon PostgreSQL
- **Cache:** Redis (optional)
- **Storage:** Cloudflare R2 (optional)
- **Auth:** JWT (Access + Refresh Token)

## Request Flow

```
Request
  → Route (validation, middleware)
    → Controller (HTTP handling)
      → Service (business logic)
        → Repository (data access)
          → Prisma
            → PostgreSQL
```

## Folder Structure

```
server/
├── prisma/
│   ├── schema.prisma    # Database schema
│   ├── seed.ts          # Seeder
│   └── migrations/      # Prisma migrations
│
└── src/
    ├── config/          # App configuration
    ├── middlewares/      # Auth, error handler, audit, rate limit
    ├── modules/         # Feature modules
    │   ├── auth/        # Authentication & authorization
    │   ├── users/       # User management
    │   ├── games/       # Game catalog
    │   ├── products/    # Top up products
    │   ├── orders/      # Order management
    │   ├── payments/    # Payment methods & processing
    │   ├── transactions/# Transaction records
    │   ├── banners/     # Banner management
    │   └── settings/    # Platform settings
    ├── repositories/    # Shared data access layer
    ├── services/        # Shared business logic
    ├── lib/             # Utilities (JWT, password, HTTP helpers)
    ├── types/           # Shared TypeScript types
    ├── env.ts           # Environment validation (T3 Env)
    └── app.ts           # App entry point
```

## Principles

- **Business logic never exists inside UI components**
- **Database access never exists inside controllers**
- **Each module has**: `route.ts`, `controller.ts`, `service.ts`, `repository.ts`, `schema.ts`
- **Shared validation** between client and server using Zod schemas
- **Environment variables** validated at startup via `@t3-oss/env-core`

## API Base URL

```
/api/v1
```
