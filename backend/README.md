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

## Seed Demo Store Data

After `MONGODB_URI` is configured in `.env`, run:

```bash
npm run seed:demo
```

This creates or updates Shara demo categories, products, a customer, one order, and a contact message for local testing.

## Smoke Check

With the backend running, verify the public API surface:

```bash
npm run smoke
```

Set `API_BASE_URL` to test a different backend URL.

## Core Routes

- `POST /api/auth/login`
- `GET /api/auth/me`
- `PUT /api/auth/me`
- `PUT /api/auth/password`
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
- `GET /api/contact`
- `GET /api/contact/:id`
- `PUT /api/contact/:id/status`
- `GET /api/dashboard/stats`
