# Transactions Module

**Team:** Avilla — [nama anggota]

## Responsibility

Record and manage payment transactions (read-only for admin).

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/v1/transactions` | Admin | List transactions (paginated) |

## Response

```http
GET /api/v1/transactions

Response:
{
  "success": true,
  "data": [
    {
      "id": "...",
      "orderId": "...",
      "amount": 20000,
      "status": "PENDING",
      "paymentMethod": "GoPay",
      "paymentChannel": "E_WALLET",
      "referenceId": "INV-001",
      "createdAt": "2024-01-01T00:00:00Z",
      "order": { "orderNumber": "TOP-...", "orderItems": [...] }
    }
  ],
  "meta": { "total": 1, "page": 1, "limit": 10, "totalPages": 1 }
}
```

## Module Files

```
src/modules/transactions/
├── route.ts
├── controller.ts
├── service.ts
├── repository.ts
└── schema.ts
```
