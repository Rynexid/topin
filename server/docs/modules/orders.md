# Orders Module

**Team:** Avilla — [nama anggota]

## Responsibility

Handle order creation, tracking, status management, and order history.

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/v1/orders` | Optional | Create new order |
| GET | `/api/v1/orders` | Yes | List user orders (admin: all orders) |
| GET | `/api/v1/orders/track/:orderNumber` | No | Track order by number |
| GET | `/api/v1/orders/:id` | Yes | Get order detail |
| PATCH | `/api/v1/orders/:id/status` | Admin | Update order status |

## Order Status Flow

```
PENDING → PROCESSING → COMPLETED
                    → FAILED
                    → REFUNDED
```

## Create Order

```http
POST /api/v1/orders

Request:
{
  "items": [{ "productId": "...", "quantity": 1 }],
  "customerName": "John",
  "customerEmail": "john@email.com",
  "customerPhone": "08123456789",
  "gameUserId": "123456789",
  "gameServerId": "1234",
  "paymentMethodId": "..."
}

Response:
{
  "success": true,
  "data": {
    "orderNumber": "TOP-1712345678-ABC123",
    "totalAmount": 20000,
    "status": "PENDING",
    ...
  }
}
```

## Track Order

```http
GET /api/v1/orders/track/TOP-1712345678-ABC123

Response:
{
  "success": true,
  "data": {
    "orderNumber": "TOP-1712345678-ABC123",
    "status": "PROCESSING",
    "totalAmount": 20000,
    "orderItems": [{ "product": { "name": "172 Diamonds" }, "quantity": 1, "price": 20000 }],
    "paymentMethod": { "name": "GoPay", "accountNumber": "081234567890" }
  }
}
```

## Module Files

```
src/modules/orders/
├── route.ts
├── controller.ts
├── service.ts
├── repository.ts
└── schema.ts
```
