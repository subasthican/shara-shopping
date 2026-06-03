# Shara Shopping

Luxury fashion ecommerce website for Shara Shopping.

## Current feature

- Frontend 404 page built with React Router, Shara Shopping layout components, and theme-matched fallback navigation.

## Run frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

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
