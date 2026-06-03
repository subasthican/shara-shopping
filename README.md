# Shara Shopping

Luxury fashion ecommerce website for Shara Shopping.

## Current feature

- Backend contact search sanitization built with Express, MongoDB, contact APIs, and admin inbox workflows.

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
