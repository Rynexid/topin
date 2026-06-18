# Banners Module

**Team:** Avilla — [nama anggota]

## Responsibility

Manage promotional banners displayed on the homepage.

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/v1/banners` | No | List active banners |
| GET | `/api/v1/banners/all` | Admin | List all banners |
| POST | `/api/v1/banners` | Admin | Create banner |
| PATCH | `/api/v1/banners/:id` | Admin | Update banner |
| DELETE | `/api/v1/banners/:id` | Admin | Delete banner |

## Response

```http
GET /api/v1/banners

Response:
{
  "success": true,
  "data": [
    {
      "id": "...",
      "title": "Top Up Mobile Legends",
      "subtitle": "Dapatkan diamond MLBB dengan harga terbaik",
      "image": "/banners/mlbb-banner.jpg",
      "link": "/games/mobile-legends",
      "sortOrder": 1
    }
  ]
}
```

## Module Files

```
src/modules/banners/
├── route.ts
├── controller.ts
├── service.ts
├── repository.ts
└── schema.ts
```
