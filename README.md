# Sapientia API

A RESTful API built with Node.js using Express, featuring JWT authentication and data persistence with MariaDB. Designed to run locally or as an AWS Lambda function.

## Project Structure

* `src/` – Application source code

  * `config/` – Configuration files (e.g., database connection)
  * `controllers/` – Controller logic for handling HTTP requests and responses
  * `middlewares/` – Custom middleware (e.g., logger, JWT token validation)
  * `models/` – Data access layer containing database queries
  * `routes/` – API route definitions
  * `services/` – Application business logic
  * `utils/` – Utility functions
* `.env.example` – Example of required environment variables
* `.eslintrc.json` – ESLint configuration for code formatting
* `lambda.js` – Entry point for AWS Lambda deployment
* `server.js` – Entry point for running the server locally

## Prerequisites

* Node.js (v16 or higher)
* npm
* MariaDB (or MySQL)

## How to Run Locally

1. **Clone the repository:**

   ```sh
   git clone https://github.com/felipe-a-queiroz/sapientia-api.git
   cd sapientia-api
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up the Database:**

   * Make sure your MariaDB/MySQL server is running.
   * Create a database. The default name is `sapientia`.

     ```sql
     CREATE DATABASE sapientia;
     ```
   * Connect to the new database and run the following SQL script to create the users table:

     ```sql
     CREATE TABLE users (
         id INT AUTO_INCREMENT PRIMARY KEY,
         username VARCHAR(50) NOT NULL UNIQUE,
         email VARCHAR(100) NOT NULL UNIQUE,
         password VARCHAR(255) NOT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```

4. **Configure Environment Variables:**

   * Copy the `.env.example` file to a new file named `.env`:

     ```sh
     cp .env.example .env
     ```
   * Edit the `.env` file and fill in the variables, especially `JWT_SECRET` and the database credentials (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).

5. **Start the server:**

   * To run in development mode (with hot-reload):

     ```sh
     npm run dev
     ```
   * The server will be available at `http://localhost:3000`.

## API Endpoints

### Health Check

* `GET /health`: Checks the status of the API.

### Authentication

* `POST /register`: Registers a new user.

  * **Body**: `{ "username": "your_username", "email": "your@email.com", "password": "your_password" }`
* `POST /login`: Logs in and returns a JWT token.

  * **Body**: `{ "username": "your_username", "password": "your_password" }`

### Protected Routes (Example)

* `GET /profile`: Returns the authenticated user's profile information.

  * **Required Header**: `Authorization: Bearer YOUR_JWT_TOKEN`
