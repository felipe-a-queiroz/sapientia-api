# Sapientia API

A RESTful API built with Node.js using Express, featuring JWT authentication and data persistence with MongoDB. Designed to run locally or as an AWS Lambda function.

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
* MongoDB

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

   * Make sure you have a MongoDB instance running, either locally or on a cloud service like MongoDB Atlas.
   * No initial setup for tables (collections) is needed. Mongoose, the ODM used in this project, will automatically create the necessary collections based on the defined models when the application runs.

4. **Configure Environment Variables:**

   * Copy the `.env.example` file to a new file named `.env`:

     ```sh
     cp .env.example .env
     ```
   * Edit the `.env` file and fill in the variables. You'll need to set `JWT_SECRET` for token generation and `MONGODB_URI` for the database connection. An example for a local database would be: `MONGODB_URI=mongodb://localhost:27017/sapientia`

5. **Start the server:**

   * To run in development mode (with hot-reload):

     ```sh
     npm run dev
     ```
   * The server will be available at `http://localhost:3001`.

## API Endpoints

Below are the available API endpoints. Routes marked with 🔒 are protected and require a JWT token in the Authorization header: `Authorization: Bearer YOUR_JWT_TOKEN`.

### API Documentation

-   **`GET /api-docs`**
    -   Description: Renders an interactive API documentation page using Swagger UI.

### Public Routes

-   **`GET /`**
    -   Description: Returns a welcome message from the API.
-   **`GET /health`**
    -   Description: Checks the API status. Responds with `{ "status": "ok" }` if it's running.

### Autenticação (`/auth`)

-   **`POST /auth/register`**
    -   Description: Registers a new user.
    -   Request Body: `{ "username": "your_username", "email": "your@email.com", "password": "your_password", "role": "user" }`
-   **`POST /auth/login`**
    -   Description: Authenticates a user and returns a JWT.
    -   Request Body: `{ "username": "your_username", "password": "your_password" }`
-   **`POST /auth/logout`** 🔒
    -   Description: Invalidates the user's JWT (adds it to the blacklist). Requires authentication.

### User Profile (`/profile`)

-   **`GET /profile`** 🔒
    -   Description: Returns the authenticated user's profile information. Requires authentication.
-   **`PUT /profile`** 🔒
    -   Description: Updates the authenticated user's information (username, email). Requires authentication.
    -   Request Body: `{ "username": "new_username", "email": "new@email.com" }`

### User Management (`/users`)

_Access to these endpoints may require administrator permissions._

-   **`GET /users`** 🔒
    -   Description: Returns a list of all users. Requires authentication.
-   **`POST /users`** 🔒
    -   Description: Creates a new user. Requires authentication.
    -   Request Body: `{ "username": "another_user", "email": "another@email.com", "password": "strong_password", "role": "user" }`
-   **`PUT /users/:id`** 🔒
    -   Description: Updates a specific user by their ID. Requires authentication.
    -   URL Parameters: `id` - The ID of the user to be updated.
    -   Request Body: `{ "username": "updated_username", "email": "updated@email.com" }`
-   **`DELETE /users/:id`** 🔒
    -   Description: Deletes a specific user by their ID. Requires authentication.
    -   URL Parameters: `id` - The ID of the user to be deleted.
