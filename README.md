# Dynamic Service — Connected Backend Package

This package is the backend/API that connects to the existing Dynamic Service React frontend.

## Stack
- Node.js
- Express
- PostgreSQL
- JWT authentication
- bcrypt password hashing
- CORS

## API
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `POST /api/products`
- `PATCH /api/products/:id/status`
- `POST /api/orders`
- `GET /api/orders/my`
- `GET /api/orders/work`
- `GET /api/orders/admin`
- `PATCH /api/orders/admin/:id/status`
- `POST /api/payments`
- `GET /api/users`
- `GET /api/health`
- `GET /api/config`

## Installation
1. Create PostgreSQL database `dynamic_service`.
2. Execute `database/schema.sql`.
3. Execute `database/seed.sql`.
4. Copy `backend/.env.example` to `backend/.env`.
5. Set your PostgreSQL password in `DATABASE_URL`.
6. Run:

```bash
cd backend
npm install
npm run seed:products
npm run dev
```

## Frontend
The existing frontend calls `http://localhost:5000/api` by default. You can explicitly set:

```env
VITE_API_URL=http://localhost:5000/api
```

in `frontend/.env.local`, then restart Vite.

## Test
Open:
- http://localhost:5000/
- http://localhost:5000/api/health

Expected health response includes `database: "connected"`.

## Demo accounts
- Admin: admin@dynamicservice.rw / Admin@12345
- Seller: seller@dynamicservice.rw / Seller@12345
- Employee: employee@dynamicservice.rw / Employee@12345
- Buyer: buyer@dynamicservice.rw / Buyer@12345

## Payment note
The checkout records Mobile Money, EquityBank transfer, or cash and creates an invoice record. It does not automatically verify real money transfers. A real Mobile Money/Bank API and webhook must be connected before production use.
