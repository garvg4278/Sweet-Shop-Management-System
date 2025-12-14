# ÌΩ¨ Sweet Shop ‚Äî Internal Inventory & Request Management System

A **full-stack internal inventory management system** built for managing sweets inventory, internal stock requests, and role-based workflows between **users** and **admins**.

This is **not an e-commerce app** ‚Äî it is designed for **internal operations** where users request stock and admins control inventory.

---

## Ì∑† Project Overview

This project models a **real-world internal supply workflow** commonly found in organizations:

- Inventory is **read-only** for everyone
- Users **request stock**
- Admins **review, approve, and fulfill requests**
- Inventory is **managed only by admins**
- All actions are protected via **JWT-based authentication & authorization**

The system emphasizes **clarity, separation of concerns, and role-based access control**.

---

## Ì±• Roles & Permissions

### Ì±§ User
- View inventory
- Create internal stock requests
- Track request status (`PENDING`, `FULFILLED`)
- Cannot modify inventory

### Ì∑ë‚ÄçÌ≤º Admin
- View inventory
- Add, update, restock, and delete sweets
- View all user requests (Inbox)
- Fulfill requests
- Inventory updates reflect immediately

---

## Ì¥Ñ Application Flow

### Inventory (`/`)
- Publicly accessible
- Displays current stock levels
- Read-only for all roles

### User Requests (`/requests`)
- Authenticated users only
- Create internal stock requests
- Track request status:
  - `PENDING`
  - `FULFILLED`

### Admin Inbox (`/admin/requests`)
- Admin-only
- View all user requests
- Mark requests as fulfilled

### Admin Catalog (`/admin`)
- Admin-only
- Add new sweets
- Restock existing sweets
- Delete sweets

---

## ÌøóÔ∏è Tech Stack

### Frontend
- React (Vite)
- TypeScript
- React Router
- TanStack React Query
- Axios
- JWT-based auth state
- Role-aware navigation & routing
- Clean utility-based CSS

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- SQLite (development)
- JWT Authentication
- Role-Based Access Control (RBAC)
- Zod validation

---

## Ì∑ÑÔ∏è Database Schema (Prisma)

### User
- `id`
- `name`
- `email`
- `password` (hashed)
- `role` (`user | admin`)
- timestamps

### Sweet
- `id`
- `name`
- `category`
- `price`
- `quantity`
- timestamps

### Request
- `id`
- `userId`
- `sweetId`
- `quantity`
- `unit` (`kg | piece`)
- `status` (`PENDING | FULFILLED`)
- timestamps

---

## Ì¥ê Authentication & Authorization

- JWT tokens issued on login
- Token payload contains:
  - `userId`
  - `role`
- Token stored in `localStorage`
- Backend middleware:
  - `authGuard` ‚Üí validates token
  - `adminGuard` ‚Üí enforces admin-only access
- Frontend hides routes & UI elements based on role

---

## Ìºê API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
```

### Inventory
```
GET    /api/sweets
```

### Requests
```
POST   /api/requests              (user)
GET    /api/requests/me           (user)
GET    /api/requests              (admin)
PATCH  /api/requests/:id/fulfill  (admin)
```

### Admin Catalog
```
POST   /api/admin/sweets
PATCH  /api/admin/sweets/:id/restock
DELETE /api/admin/sweets/:id
```

---

## ÌæØ Key Features

- Internal stock request workflow
- Admin-controlled inventory management
- Role-based UI & routing
- Real-time data updates using React Query
- Secure JWT authentication flow
- Prisma migrations & relations
- Clean backend architecture (routes / controllers / services)
- Scalable and extensible design

---

## Ì∫Ä Getting Started

### Backend Setup
```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Backend runs on: `http://localhost:4000`  
Frontend runs on: `http://localhost:5173`

---

## Ì¥í Security Considerations

- Passwords hashed using bcrypt
- JWT secrets stored in `.env`
- Sensitive files ignored via `.gitignore`
- Role enforcement on both frontend and backend

---

## Ì∑™ Development Notes

- SQLite used for development simplicity
- Prisma migrations committed for reproducibility
- Designed for easy extension:
  - Request rejection
  - Audit logs
  - Notifications
  - Pagination

---

## Ì¥ñ AI Assistance Disclosure

An AI assistant was used to generate initial boilerplate and architectural guidance.  
All business logic, validation, debugging, and integration were manually implemented and verified.

```
Co-authored-by: ChatGPT <chatgpt@openai.com>
```

---

## Ì≥å Project Status

‚úÖ Backend complete  
‚úÖ Frontend complete  
‚úÖ Role-based workflow implemented  
‚úÖ Production-ready architecture  

---

