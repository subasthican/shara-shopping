# Shara Shopping Backend

Express, MongoDB, and Mongoose API for the Shara Shopping ecommerce order flow and admin panel.

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## Seed First Admin

Set `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` in `.env`, then run:

```bash
npm run seed:admin
```

## Core Routes

- `POST /api/auth/login`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `GET /api/categories`
- `POST /api/categories`
- `PUT /api/categories/:id`
- `DELETE /api/categories/:id`
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`
- `PUT /api/orders/:id/status`
- `GET /api/orders/track/:orderId?contact=email-or-phone`
- `POST /api/contact`
- `GET /api/dashboard/stats`
