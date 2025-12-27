# 🍬 Sweet Shop

### Internal Inventory & Request Management System

A **full-stack internal inventory management system** designed to manage sweets inventory, internal stock requests, and role-based workflows between **users** and **admins**.

> ⚠️ This is **not an e-commerce application**.
> It models **internal operations** commonly found in organizations where inventory is centrally controlled and users submit stock requests.

---

## 🧠 Project Overview

This system represents a **real-world internal supply workflow**:

* Inventory is **read-only** for all users
* Users **raise stock requests**
* Admins **review, approve, and fulfill requests**
* Only admins can **add, update, or delete inventory**
* All operations are protected using **JWT-based authentication and role-based authorization**

The project focuses on:

* Clean architecture
* Clear separation of concerns
* Secure, role-aware workflows
* Production-ready Docker setup

---

## 👥 Roles & Permissions

### 👤 User

* View inventory
* Create internal stock requests
* View personal request history
* Track request status:

  * `PENDING`
  * `FULFILLED`
* Cannot modify inventory

### 🧑‍💼 Admin

* View inventory
* Add new sweets
* Restock or delete existing sweets
* View all user requests (Admin Inbox)
* Fulfill requests
* Inventory updates reflect immediately

---

## 🔄 Application Flow

### Inventory (`/`)

* Publicly accessible
* Displays current stock levels
* Read-only for all roles

### User Requests (`/requests`)

* Authenticated users only
* Create internal stock requests
* Track request status

### Admin Inbox (`/admin/requests`)

* Admin-only
* View all user requests
* Fulfill pending requests

### Admin Catalog (`/admin`)

* Admin-only
* Add new sweets
* Restock existing sweets
* Delete sweets

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* TypeScript
* React Router
* TanStack React Query
* Axios
* JWT-based auth state
* Role-aware navigation & routing
* Utility-based CSS (ready for Tailwind redesign)

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* SQLite (development)
* JWT Authentication
* Role-Based Access Control (RBAC)
* Zod schema validation

---

## 🗄️ Database Schema (Prisma)

### User

* `id`
* `name`
* `email`
* `password` (hashed)
* `role` (`user | admin`)
* timestamps

### Sweet

* `id`
* `name`
* `category`
* `price`
* `quantity`
* timestamps

### Request

* `id`
* `userId`
* `sweetId`
* `quantity`
* `unit` (`kg | piece`)
* `status` (`PENDING | FULFILLED`)
* timestamps

---

## 🔐 Authentication & Authorization

* JWT tokens issued on login
* Token payload includes:

  * `userId`
  * `role`
* Token stored in `localStorage`
* Backend middleware:

  * `authGuard` → validates JWT
  * `adminGuard` → enforces admin-only access
* Frontend:

  * Hides routes and UI elements based on role
  * Protects routes via role-aware routing

---

## 🌐 API Endpoints

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

## 🎯 Key Features

* Internal stock request workflow
* Admin-controlled inventory management
* Role-based UI & route protection
* Real-time data updates using React Query
* Secure JWT authentication
* Prisma migrations and relations
* Clean backend layering (routes → controllers → services)
* Fully Dockerized frontend & backend
* One-command startup with Docker Compose

---

## 🚀 Running the Project with Docker (Recommended)

### Prerequisites

* Docker Desktop

### Start the full application

```bash
docker compose up --build
```

### Access

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend:  [http://localhost:4000](http://localhost:4000)

---

## 🛠️ Local Development (Without Docker)

### Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔒 Security Considerations

* Passwords hashed using bcrypt
* JWT secrets stored in `.env`
* Sensitive files excluded via `.gitignore`
* Role enforcement implemented on **both frontend and backend**
* No secrets committed to the repository

---

## 🧪 Development Notes

* SQLite used for development simplicity
* Prisma migrations committed for reproducibility
* Designed for easy extension:

  * Request rejection
  * Audit logs
  * Notifications
  * Pagination
  * Database swap (PostgreSQL / MySQL)

---

## 📌 Project Status

✅ Backend complete
✅ Frontend complete
✅ Role-based workflow implemented
✅ Dockerized (Frontend + Backend + Compose)
✅ Production-ready architecture

---

### 👨‍💻 Author

**Garv Gupta**
Computer Science Engineering Student
