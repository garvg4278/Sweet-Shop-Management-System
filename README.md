# Sweet Shop Management System

## Overview

The **Sweet Shop Management System** is a full-stack web application **designed, developed, containerized, and automated end-to-end by me from scratch**. This project showcases my ability to work across the **entire software lifecycle** — from application development to DevOps-driven CI/CD automation.

The primary goal of this project is twofold:

1. Build a real-world, role-based web application
2. Implement a **production-style DevOps workflow** suitable for a junior DevOps / SRE role

This repository demonstrates hands-on experience with **backend & frontend development**, **Docker-based delivery**, and a **Jenkins-powered CI/CD pipeline**, while intentionally keeping Kubernetes out of scope for now.

---

## High-Level Architecture

```
Developer → GitHub → Jenkins CI Pipeline
                    ↓
              Docker Build & Test
                    ↓
            Docker Hub (Images)
                    ↓
           Docker Compose Deployment
```

---

## Application Architecture

### Backend

* **Technology**: Node.js, TypeScript, Express
* **Database**: SQLite (via Prisma ORM)
* **Authentication**: JWT-based authentication with role-based access control
* **Testing**: Jest-based unit and integration tests

**Key backend features:**

* User authentication & authorization
* Admin and user role separation
* Inventory & sweet management
* Request and approval workflows
* Centralized error handling

### Frontend

* **Technology**: React + TypeScript
* **Build Tool**: Vite
* **UI Focus**: Clean admin dashboard and user workflows

**Frontend responsibilities:**

* Authentication flow
* Inventory & request management UI
* Admin dashboards

---

## DevOps & Infrastructure Design

### Dockerization

* Backend and frontend are fully containerized using **separate Dockerfiles**
* Multi-stage builds used where applicable to reduce image size
* Application images are pushed to **Docker Hub** for portability

### Docker Compose

* Used for **local and production-like deployments**
* Enables one-command startup for the entire stack
* Allows anyone to run the project without cloning the repository

```bash
docker compose up -d
```

---

## CI/CD Pipeline (Jenkins)

A complete CI/CD pipeline was implemented using **Jenkins running inside Docker**.

### Pipeline Responsibilities

* Clone source code from GitHub
* Build backend and frontend Docker images
* Tag images using build numbers
* Authenticate with Docker Hub securely
* Push versioned and `latest` images to Docker Hub

### Jenkins Characteristics

* Jenkins runs as a container with Docker CLI access
* Uses **Docker Hub access tokens** stored securely in Jenkins credentials
* Pipeline defined entirely in a **Jenkinsfile** (Pipeline-as-Code)

### Why Tests Are Not Enforced in CI (Intentional Decision)

* Tests exist and can be run locally
* CI pipeline prioritizes **build reproducibility and delivery**
* Avoided flaky pipelines and false negatives
* Demonstrates pragmatic DevOps decision-making

---

## Environment Management

* `.env.example` files provided for configuration clarity
* Sensitive values are **never committed**
* Jenkins credentials securely manage secrets

---

## Deployment Strategy

Current deployment approach:

* Docker images hosted on Docker Hub
* Application runs via Docker Compose
* No dependency on local source code

This approach ensures:

* Consistent runtime environments
* Easy onboarding for new users
* Clear separation of build and runtime concerns

---

## What I Learned From This Project

### Full-Stack Development

* Designing REST APIs with authentication
* Managing database schemas using Prisma
* Building scalable React applications

### Docker & Containers

* Writing efficient Dockerfiles
* Managing image layers and caching
* Debugging containerized applications

### CI/CD & Automation

* Building Jenkins pipelines from scratch
* Running Jenkins inside Docker
* Secure credential management
* Automating Docker builds and pushes

### DevOps Mindset

* Thinking in terms of **systems**, not just code
* Making trade-offs between correctness and reliability
* Designing pipelines that are stable and maintainable

---

## Kubernetes (Future Scope)

Kubernetes is intentionally **out of scope** for the current version of this project.

Planned future enhancements:

* Kubernetes manifests (Deployment, Service, ConfigMap)
* CI/CD extension for K8s deployments
* Helm-based packaging

This separation ensures the current system remains clean and understandable.

---

## Why This Project Matters

This project reflects:

* Ownership from idea to deployment
* Real-world DevOps practices
* Production-aware decision making
* Strong fundamentals suitable for **Junior DevOps / SRE roles**

---

## Author

**Garv Gupta**
Aspiring DevOps / SRE Engineer
Built end-to-end with a focus on learning, reliability, and real-world practices
