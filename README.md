# Creator Feed API

The Creator Feed API is a full-featured backend built with Node.js, Express, and PostgreSQL. It enables creators to manage and publish feed updates with support for authentication, authorization, slug generation, and soft deletion. The project is structured to scale into a microservices-based architecture and supports upcoming integration with GraphQL.

## Features

- JWT-based authentication (register, login)
- Role-based access control (admin, user)
- CRUD operations for feed items
- Automatic unique slug generation based on title
- Soft delete and restore functionality
- Support for image URLs in posts
- Clean, modular codebase designed for extensibility

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- Jest and Supertest for testing (upcoming)
- Multer for file handling (upcoming)

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/creator-feed-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with your configuration:
   ```
   DB_NAME=creator_db
   DB_USER=your_pg_user
   DB_PASS=your_pg_password
   DB_HOST=localhost
   JWT_SECRET=your_jwt_secret
   ```

4. Run the development server:
   ```
   npm run dev
   ```

## API Endpoints

| Method | Route           | Description                 |
|--------|------------------|-----------------------------|
| POST   | /api/register    | Register a new user         |
| POST   | /api/login       | Login and receive token     |
| GET    | /api/feed        | Retrieve paginated feeds    |
| POST   | /api/feed        | Create a new feed (auth)    |
| PATCH  | /api/feed/:id    | Edit a feed (owner only)    |
| DELETE | /api/feed/:id    | Soft delete a feed (owner)  |
| GET    | /api/me          | Get authenticated user info |

## Project Structure

- `src/models` – Sequelize models
- `src/controllers` – Route logic and handlers
- `src/middlewares` – Auth and role-checking logic
- `src/routes` – Express route declarations
- `src/config` – Environment and DB setup

## Planned Enhancements

- Caching with Redis
- Background processing with worker threads
- File uploads with Multer and cloud storage
- GraphQL API support (Phase 2)
- Docker and CI/CD pipeline setup
- Newsletter/email queue system

## License

This project is licensed under the MIT License.