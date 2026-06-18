# Payments Module

**Team:** Avilla — [nama anggota]

## Responsibility

Manage payment methods and process payments.

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/v1/payments/methods` | No | List active payment methods |
| POST | `/api/v1/payments/methods` | Admin | Create payment method |
| PATCH | `/api/v1/payments/methods/:id` | Admin | Update payment method |
| DELETE | `/api/v1/payments/methods/:id` | Admin | Delete payment method |

## Payment Types

- `BANK_TRANSFER` - Virtual Account (BCA, Mandiri, etc.)
- `E_WALLET` - GoPay, OVO, DANA, etc.
- `PULSA` - Telkomsel, Indosat, etc.
- `VOUCHER` - Game voucher codes

## Response

```http
GET /api/v1/payments/methods

Response:
{
  "success": true,
  "data": [
    {
      "id": "...",
      "name": "GoPay",
      "type": "E_WALLET",
      "accountName": "TOPIN Official",
      "accountNumber": "081234567890",
      "sortOrder": 1
    }
  ]
}
```

## Module Files

```
src/modules/payments/
├── route.ts
├── controller.ts
├── service.ts
├── repository.ts
└── schema.ts
```
