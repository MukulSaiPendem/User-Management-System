# User Management System

This repository contains the code for a user management system. The application provides functionalities to manage users, including registration, login, and profile management. It is built using Node.js, Express, and MongoDB.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Code Explanation](#code-explanation)
- [License](#license)

## Project Overview

The User Management System is designed to provide a backend service for managing user-related operations such as registration, login, and profile management. It uses Node.js and Express for the server-side logic and MongoDB for the database.

## Features

- User registration
- User login
- Profile management
- Middleware for authentication
- Secure password storage

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/User-Management-System.git
   cd User-Management-System
   ```

2. **Install the required packages**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory and add the following variables:
     ```
     PORT=3000
     MONGO_URI=your_mongo_db_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Start the server**:

   ```bash
   npm start
   ```

## Usage

Once the server is running, you can use tools like Postman to interact with the API endpoints for user registration, login, and profile management.

## File Structure

The repository is organized as follows:

```
User-Management-System/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── userController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   └── userModel.js
│
├── routes/
│   └── userRoutes.js
│
├── utils/
│   └── generateToken.js
│
├── .env
├── package-lock.json
├── package.json
└── server.js
```

## Code Explanation

### Main Components

1. **server.js**:
   - The entry point of the application.
   - Sets up the Express server and connects to the MongoDB database.
   - Defines the routes for the application.

2. **config/db.js**:
   - Contains the configuration for connecting to the MongoDB database.
   - Uses Mongoose to establish a connection.

3. **controllers/userController.js**:
   - Contains the logic for user-related operations such as registration, login, and fetching user profiles.
   - Handles the requests and responses for the user routes.

4. **middleware/authMiddleware.js**:
   - Middleware for handling authentication.
   - Verifies JWT tokens to secure routes.

5. **middleware/errorMiddleware.js**:
   - Middleware for handling errors.
   - Catches and processes errors, sending appropriate responses to the client.

6. **models/userModel.js**:
   - Defines the schema for the User model using Mongoose.
   - Includes fields for user information such as name, email, and password.

7. **routes/userRoutes.js**:
   - Defines the API routes for user operations.
   - Associates routes with corresponding controller functions.

8. **utils/generateToken.js**:
   - Utility function for generating JWT tokens.
   - Used in the authentication process to issue tokens to users.
