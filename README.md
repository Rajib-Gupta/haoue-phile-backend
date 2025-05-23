# Fastify Real Estate Application

A fast and scalable backend service for managing real estate listings, user bookings, and related functionalities. Built with [Fastify](https://www.fastify.io/), this application ensures high performance and simplicity.

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User authentication with JWT (JSON Web Tokens).
- CRUD operations for real estate listings.
- Schedule bookings for tours (in-person or virtual).
- Manage property types and categories.
- Fast and scalable using Fastify and MongoDB.
- Detailed API schemas with validation using `@fastify/schema`.

---

## Technologies

- **Backend Framework**: [Fastify](https://www.fastify.io/)
- **Database**: MongoDB (Mongoose for object modeling)
- **Authentication**: JWT (JSON Web Token)
- **Validation**: Fastify Schema
- **Other Tools**:
  - `dotenv` for environment variable management.
  - `fastify-jwt` for token-based authentication.
  - `@fastify/cookie` for cookie handling.

---

## Installation
- npm install
- cp .env.example .env
- npm run dev




### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB instance (local or cloud)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/real-estate-app.git
   cd real-estate-app/backend
