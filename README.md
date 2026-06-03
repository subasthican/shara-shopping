# Shara Shopping

Luxury fashion ecommerce website for Shara Shopping.

## Current feature

- Backend request sanitizing built with Express middleware to strip unsafe Mongo operator and dotted payload keys.

## Project status

Shara Shopping includes a customer storefront, product browsing, wishlist/cart flow, order tracking, contact messaging, and an admin panel for managing products, categories, customers, orders, messages, and settings.

Use [docs/PROJECT_COMPLETION.md](docs/PROJECT_COMPLETION.md) for the final completion checklist and [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for production handoff steps.

## Run frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend runs on `http://127.0.0.1:5173` by default.

Create the first admin account after configuring backend `.env`:

```bash
cd backend
npm run seed:admin
```

Seed demo catalog and order data after configuring backend `.env`:

```bash
cd backend
npm run seed:demo
```

Smoke check the backend after it is running:

```bash
cd backend
npm run smoke
```

## Run backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The backend runs on `http://127.0.0.1:5001/api` by default.

## Recommended local setup order

1. Configure `backend/.env` from `backend/.env.example`.
2. Configure `frontend/.env` from `frontend/.env.example`.
3. Start MongoDB locally or connect to MongoDB Atlas.
4. Start the backend with `npm run dev` inside `backend`.
5. Seed the first admin with `npm run seed:admin`.
6. Seed demo data with `npm run seed:demo`.
7. Start the frontend with `npm run dev` inside `frontend`.
8. Run `npm run smoke` inside `backend` after the API is running.

## Verification

```bash
cd frontend
npm run build

cd ../backend
npm run smoke
```

GitHub Actions also runs dependency installs, backend syntax checks, and the frontend production build on pushes to `main`, `develop`, and `feature/**` branches.
