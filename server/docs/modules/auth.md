# Auth Module

**Team:** Avilla — [nama anggota]

## Responsibility

Handle user authentication, registration, session management, and token lifecycle.

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/v1/auth/register` | No | Register new user |
| POST | `/api/v1/auth/login` | No | Login user |
| POST | `/api/v1/auth/refresh` | No | Refresh access token |
| POST | `/api/v1/auth/logout` | No | Logout (invalidate refresh token) |
| GET | `/api/v1/auth/me` | Yes | Get current user info |

## Request/Response

### Register

```http
POST /api/v1/auth/register

Request:
{
  "email": "user@example.com",
  "password": "min8chars",
  "name": "User Name",
  "phone": "08123456789" // optional
}

Response 201:
{
  "success": true,
  "data": {
    "user": { "id": "...", "email": "...", "name": "...", "role": "USER" },
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..."
  }
}
```

### Login

```http
POST /api/v1/auth/login

Request:
{
  "email": "user@example.com",
  "password": "min8chars"
}

Response 200:
{
  "success": true,
  "data": {
    "user": { "id": "...", "email": "...", "name": "...", "role": "USER" },
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..."
  }
}
```

## Dependencies

- `jsonwebtoken` (or `jose` for Edge compatibility)
- `bcrypt` or `Bun.password` for hashing
- `zod` for validation

## Security Rules

- Password minimum 8 characters
- Access token expires in 15 minutes
- Refresh token expires in 7 days
- Refresh tokens are stored in `sessions` table
- On logout, delete session from database
- Account deactivation check on login
- Rate limiting on login/register endpoints

## Module Files to Create

```
src/modules/auth/
├── route.ts        # Route definitions
├── controller.ts   # HTTP request handling
├── service.ts      # Business logic
├── repository.ts   # Database queries
└── schema.ts       # Zod validation schemas
```
