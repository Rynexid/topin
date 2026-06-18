# Users Module

**Team:** Avilla — [nama anggota]

## Responsibility

Manage user accounts (admin only for listing/editing).

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/v1/users` | Admin | List users (paginated) |
| GET | `/api/v1/users/:id` | Admin | Get user detail |
| PATCH | `/api/v1/users/:id` | Admin | Update user |

## Response

```http
GET /api/v1/users?page=1&limit=10

Response:
{
  "success": true,
  "data": [
    {
      "id": "...",
      "email": "user@example.com",
      "name": "User Name",
      "role": "USER",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": { "total": 1, "page": 1, "limit": 10, "totalPages": 1 }
}
```

## Module Files

```
src/modules/users/
├── route.ts
├── controller.ts
├── service.ts
├── repository.ts
└── schema.ts
```
