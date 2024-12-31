# USERS API with NestJS, PostgreSQL, TypeORM, Docker

This is a **Users API** built with **NestJS**. The project demonstrates how to handle user management, including creating, reading, updating, and deleting user records. The API uses **PostgreSQL** as the database, **TypeORM** as the ORM, and **Docker** for containerization.

---

## Features

- **User CRUD Operations** (Create, Read, Update, Delete)
- **PostgreSQL** database with **TypeORM** integration
- **Docker** containerization for easy setup and deployment
- **Automated testing** with **Jest**
- **Swagger Documentation** for API endpoints

---

## Table of Contents

1. [Installation](#installation)
2. [Project Structure](#project-structure)
4. [Running with Docker](#running-with-docker)
5. [Testing](#testing)
6. [Environment Variables](#environment-variables)
7. [Swagger Documentation](#swagger-documentation)

---

## Installation

To get started, clone the repository:

```bash
git clone https://github.com/louieseno/standard_101.git
cd standard_101
```

Install the dependencies:

```bash
npm install
```

## Project Structure
```bash
users-api/
├── src/
│   ├── modules/
│   │   └── users/
│   │       ├── entities/
│   │       ├── users.controller.ts
│   │       ├── users.service.spec.ts
|   |       ├── users.service.ts
│   │       └── users.module.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   └── main.ts
├── .env
├── Dockerfile
├── docker-compose.yml
├── jest.config.js
├── tsconfig.json
└── README.md
```

## Running with Docker

Running with Docker
This project comes with a `docker-compose.yml` file that sets up the required services: __PostgreSQL__ and the __NestJS__ app.

### Steps to run with Docker:
  1. Build the Docker containers:
  ```bash
  docker-compose build --no-cache
  ```

  2. Start the services (PostgreSQL and NestJS app):

  ```bash
  docker-compose up
  ```

The application will be available at http://localhost:3000.

By default, Docker will run the PostgreSQL database and expose it on port 5432. The NestJS API will run on port 3000.

### Docker Compose Environment Variables
You can adjust the environment variables for __PostgreSQL__ and the __NestJS__ app by modifying the `.env` file.

Example `.env`:

```bash
DB_TYPE=postgres
POSTGRES_HOST=""
POSTGRES_USER=""
POSTGRES_PASSWORD=""
POSTGRES_DATABASE=""
POSTGRES_PORT=5432
ENV=DEV

API_PORT=3000
API_VERSION=v1
```

## Testing
The project uses __Jest__ for testing.

Run Tests
You can run the unit tests with the following command:

```bash
npm run test
```

For integration tests, use:

```bash
npm run test:e2e
```

## Swagger Documentation

NestJS comes with Swagger documentation out-of-the-box. To view the API documentation:

Run the app with:

```bash
npm run start:dev
```

Navigate to:

```bash
http://localhost:3000/api/v1
```

You will see the interactive API documentation where you can explore the available endpoints.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.