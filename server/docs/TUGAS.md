# Tugas Backend Avilla

## Tech Stack

Bun, Hono, Prisma, PostgreSQL (Neon), JWT, Zod.

## Yang sudah siap di repo

| File | Status |
|------|--------|
| server/prisma/schema.prisma | 11 model lengkap dengan relasi, enum, index |
| server/src/env.ts | Validasi environment variable pakai T3 Env |
| server/src/lib/prisma.ts | Koneksi Prisma client |
| server/package.json | Dependencies sudah include semua yang dibutuhkan |
| server/docs/architecture.md | Penjelasan arsitektur, folder structure, request flow |
| server/docs/modules/*.md | 9 file spesifikasi API per modul (endpoint, request/response, aturan) |

## Yang harus dikerjakan

Bikin folder server/src/modules/ dan implementasi 9 modul. Setiap modul punya 5 file: route.ts, controller.ts, service.ts, repository.ts, schema.ts.

### 1. Middleware (server/src/middlewares/)

auth.ts
Verifikasi JWT token dari header Authorization Bearer. Inject data user ke context Hono. Bedain akses USER sama ADMIN. Kalo token expired return 401, kalo bukan admin akses endpoint admin return 403.

error-handler.ts
Global error handler. Semua error harus return JSON dengan format konsisten:
- Sukses: { success: true, data: ... }
- Error: { success: false, error: { code: "ERROR_CODE", message: "Pesan error" } }

### 2. Utility Lib (server/src/lib/)

jwt.ts
Fungsi sign access token (expires 15 menit) dan refresh token (expires 7 hari). Verify token. Gunain jsonwebtoken.

password.ts
Fungsi hash dan compare password. Bisa pakai Bun.password atau bcrypt.

### 3. Modul Auth (server/docs/modules/auth.md)

Prioritas utama karena dipakai semua modul lain. 5 endpoint.

POST /api/v1/auth/register
Terima email, password, name, phone optional. Validasi email unique, password min 8 karakter. Hash password. Simpan user ke database. Generate access token dan refresh token. Simpan refresh token di tabel sessions. Return user data + tokens.

POST /api/v1/auth/login
Terima email dan password. Cari user by email. Compare password. Cek isActive. Generate tokens. Return user data + tokens.

POST /api/v1/auth/refresh
Terima refresh token dari body. Verify token. Cek di tabel sessions. Generate access token baru. Return access token baru.

POST /api/v1/auth/logout
Terima refresh token. Hapus session dari database.

GET /api/v1/auth/me
Ambil user ID dari JWT token (middleware). Return user data.

### 4. Modul Users (server/docs/modules/users.md)

3 endpoint, semuanya admin only.

GET /api/v1/users
List user dengan pagination. Bisa search by name atau email. Return data array user tanpa password.

GET /api/v1/users/:id
Detail user by ID. Return data user tanpa password.

PATCH /api/v1/users/:id
Update user. Bisa ubah name, role, isActive.

### 5. Modul Games (server/docs/modules/games.md)

5 endpoint. Public endpoints (GET) dan admin endpoints (POST/PATCH/DELETE).

GET /api/v1/games
List semua game. Filter query:
- ?featured=true untuk game yang isFeatured true
- ?page=1&limit=20 untuk pagination

GET /api/v1/games/:slug
Detail game by slug. Include products terkait di response.

POST /api/v1/games
Admin create game. Field: name, slug, description, shortDescription, icon, thumbnail, banner, publisher, genre, isFeatured, sortOrder.

PATCH /api/v1/games/:id
Admin update game.

DELETE /api/v1/games/:id
Admin hapus game.

### 6. Modul Products (server/docs/modules/products.md)

5 endpoint. Public dan admin.

GET /api/v1/products
List produk. Filter query:
- ?gameId=xxx untuk filter by game
- ?popular=true untuk yang isPopular

GET /api/v1/products/:id
Detail produk.

POST /api/v1/products
Admin create produk. Field: gameId, name, description, price, originalPrice, currency, stock, isPopular, sortOrder.

PATCH /api/v1/products/:id
Admin update produk.

DELETE /api/v1/products/:id
Admin hapus produk.

### 7. Modul Payments (server/docs/modules/payments.md)

4 endpoint.

GET /api/v1/payments/methods
Public. List metode pembayaran yang isActive true. Urut by sortOrder.

POST /api/v1/payments/methods
Admin create metode. Field: name, type (BANK_TRANSFER/E_WALLET/PULSA/VOUCHER), icon, accountName, accountNumber, isActive, sortOrder.

PATCH /api/v1/payments/methods/:id
Admin update metode.

DELETE /api/v1/payments/methods/:id
Admin hapus metode.

### 8. Modul Orders (server/docs/modules/orders.md)

5 endpoint. Paling kompleks.

POST /api/v1/orders
Bisa tanpa login (guest checkout) atau dengan login. Terima items array of productId, customer data, gameUserId/gameServerId, paymentMethodId. Hitung totalAmount dari harga produk. Generate orderNumber dengan format TOP-{timestamp}-{random}. Kurangi stock produk. Simpan order dan orderItems. Catat transaksi otomatis dengan status PENDING. Return order data.

GET /api/v1/orders
Kalo user biasa, return order miliknya sendiri. Kalo admin, return semua order. Pagination. Bisa filter by status.

GET /api/v1/orders/track/:orderNumber
Public. Lacak order tanpa perlu login. Return status order, items, payment method.

GET /api/v1/orders/:id
Detail order. Include orderItems, product, paymentMethod.

PATCH /api/v1/orders/:id/status
Admin update status. Flow status: PENDING ke PROCESSING ke COMPLETED. Bisa juga ke FAILED atau REFUNDED. Catat timestamp paidAt, processedAt, completedAt sesuai status.

### 9. Modul Transactions (server/docs/modules/transactions.md)

1 endpoint, read-only.

GET /api/v1/transactions
Admin only. List transaksi dengan pagination. Include relasi ke order.

### 10. Modul Banners (server/docs/modules/banners.md)

5 endpoint.

GET /api/v1/banners
Public. List banner yang isActive true. Urut by sortOrder.

GET /api/v1/banners/all
Admin. List semua banner termasuk yang tidak aktif.

POST /api/v1/banners
Admin create. Field: title, subtitle, image (URL string), link, isActive, sortOrder.

PATCH /api/v1/banners/:id
Admin update.

DELETE /api/v1/banners/:id
Admin hapus.

### 11. Modul Settings (server/docs/modules/settings.md)

2 endpoint.

GET /api/v1/settings
Public. Return semua setting sebagai key-value object.

PUT /api/v1/settings
Admin update. Upsert setting.

## Entry Point (server/src/app.ts)

Bikin file utama yang import semua route dari setiap modul. Setup CORS. Prefix /api/v1. Export default app.

## Response Format

Semua response harus konsisten:

Sukses:
{
  "success": true,
  "data": ...
}

List dengan pagination:
{
  "success": true,
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}

Error:
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email sudah terdaftar"
  }
}

Kode error yang dipakai: VALIDATION_ERROR, NOT_FOUND, UNAUTHORIZED, FORBIDDEN, INTERNAL_ERROR.

## Prioritas pengerjaan

1. Middleware auth + error handler
2. Lib jwt + password
3. Modul Auth
4. Modul Users
5. Modul Games
6. Modul Products
7. Modul Payments
8. Modul Orders
9. Modul Transactions
10. Modul Banners
11. Modul Settings
12. Entry point app.ts
