# Shara Shopping Deployment Guide

Use this guide when preparing the project for staging or production.

## Backend environment

Create backend environment variables from `backend/.env.example`.
The backend validates required environment variables at startup and fails fast when core production settings are missing.

Required for the API:

- `NODE_ENV=production`
- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CLIENT_URL`

Required for admin seeding:

- `SEED_ADMIN_NAME`
- `SEED_ADMIN_EMAIL`
- `SEED_ADMIN_PASSWORD`

Required for email notifications:

- `ADMIN_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

Required for Cloudinary image support:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Frontend environment

Create frontend environment variables from `frontend/.env.example`.

Required:

- `VITE_API_URL`

The value must point to the deployed backend API root, for example:

```bash
VITE_API_URL=https://api.example.com/api
```

## Deployment order

1. Deploy MongoDB or confirm MongoDB Atlas access.
2. Deploy the backend with production environment variables.
3. Confirm `GET /api/health` returns a successful response.
4. Run the first admin seed script once with secure credentials.
5. Deploy the frontend with `VITE_API_URL` pointing at the backend.
6. Confirm `CLIENT_URL` on the backend includes the deployed frontend origin.
7. Run backend smoke checks against the deployed API.
8. Confirm admin login, product browsing, order creation, contact form, and order tracking.

## Backend commands

```bash
cd backend
npm install
npm run start
```

Seed the first admin only after production environment variables are configured:

```bash
npm run seed:admin
```

Smoke check a deployed backend:

```bash
API_BASE_URL=https://api.example.com/api npm run smoke
```

## Frontend commands

```bash
cd frontend
npm install
npm run build
npm run preview
```

## Launch checks

- Customer home page loads.
- Dresses and category pages load products.
- Product details page opens from product cards.
- Wishlist/cart page accepts customer selections.
- Contact form submits to the API.
- Order tracking finds valid demo or real orders.
- Admin login works with seeded credentials.
- Admin dashboard statistics load.
- Admin product/category/order/customer/message pages load.
- Unknown routes show the Shara Shopping 404 page.
