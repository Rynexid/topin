# Products Module

**Team:** Avilla — [nama anggota]

## Responsibility

Manage top-up product packages for each game.

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/v1/products` | No | List products (query: `?gameId=xxx`, `?popular=true`) |
| GET | `/api/v1/products/:id` | No | Get product detail |
| POST | `/api/v1/products` | Admin | Create product |
| PATCH | `/api/v1/products/:id` | Admin | Update product |
| DELETE | `/api/v1/products/:id` | Admin | Delete product |

## Response

```http
GET /api/v1/products?popular=true

Response:
{
  "success": true,
  "data": [
    {
      "id": "...",
      "gameId": "...",
      "name": "172 Diamonds",
      "price": 20000,
      "originalPrice": null,
      "currency": "IDR",
      "stock": 0,
      "isPopular": true,
      "game": { "name": "Mobile Legends", "slug": "mobile-legends", "icon": null }
    }
  ]
}
```

## Module Files

```
src/modules/products/
├── route.ts
├── controller.ts
├── service.ts
├── repository.ts
└── schema.ts
```
