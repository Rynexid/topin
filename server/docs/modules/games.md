# Games Module

**Team:** Avilla — [nama anggota]

## Responsibility

Manage game catalog CRUD and public game listing.

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/v1/games` | No | List games (query: `?featured=true`, `?page=1&limit=20`) |
| GET | `/api/v1/games/:slug` | No | Get game detail with products |
| POST | `/api/v1/games` | Admin | Create game |
| PATCH | `/api/v1/games/:id` | Admin | Update game |
| DELETE | `/api/v1/games/:id` | Admin | Delete game |

## Response Examples

```http
GET /api/v1/games?featured=true

Response:
{
  "success": true,
  "data": [
    {
      "id": "...",
      "name": "Mobile Legends",
      "slug": "mobile-legends",
      "description": "...",
      "shortDescription": "Popular MOBA game",
      "icon": null,
      "thumbnail": null,
      "banner": null,
      "publisher": "Moonton",
      "genre": "MOBA",
      "isFeatured": true,
      "sortOrder": 1
    }
  ],
  "meta": { "total": 6, "page": 1, "limit": 20, "totalPages": 1 }
}
```

```http
GET /api/v1/games/mobile-legends

Response:
{
  "success": true,
  "data": {
    "id": "...",
    "name": "Mobile Legends",
    "slug": "mobile-legends",
    "products": [
      { "id": "...", "name": "86 Diamonds", "price": 10000, ... }
    ]
  }
}
```

## Module Files

```
src/modules/games/
├── route.ts
├── controller.ts
├── service.ts
├── repository.ts
└── schema.ts
```
