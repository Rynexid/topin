# Settings Module

**Team:** Avilla — [nama anggota]

## Responsibility

Manage platform-wide settings (key-value store).

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/v1/settings` | No | Get all settings |
| PUT | `/api/v1/settings` | Admin | Update settings (upsert) |

## Response

```http
GET /api/v1/settings

Response:
{
  "success": true,
  "data": {
    "site_name": "TOPIN",
    "site_description": "Game Top Up Platform",
    "contact_email": "support@topin.com"
  }
}
```

## Module Files

```
src/modules/settings/
├── route.ts
├── controller.ts
├── service.ts
├── repository.ts
└── schema.ts
```
