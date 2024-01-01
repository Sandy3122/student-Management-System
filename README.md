# Student Management System

This project is a Student Management System API built using Node.js, Express, MongoDB, and other technologies.

## Project Overview

The Student Management System allows administrators to manage student information, assign tasks, and track task statuses. Students can log in, view their tasks, and update task statuses.


## Table of Contents
- [API Base URL](#api-base-url)
- [API Documentation](#api-documentation)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Project Overview](#project-overview)
- [Admin Routes](#admin-routes)
- [Student Routes](#student-routes)
- [Error Handling](#error-handling)
- [Linting and Formatting](#linting-and-formatting)
- [Technologies Used](#technologies-used)


## API Base URL

The valid URL for accessing the API is [http://localhost:8000](http://localhost:8000).

## API Documentation

The API documentation is available on Postman. You can access it [here](https://grey-firefly-60783.postman.co/workspace/New-Team-Workspace~1cc59f27-4464-431e-8594-af42679a81f1/collection/29114733-bc59ec35-e5f9-4336-9647-c652e03a7e1b?action=share&creator=29114733).


## Getting Started

To get started with the Student Management System API, follow these steps:


# Clone the repository:

   ```bash
   git clone https://github.com/Sandy3122/student-Management-System.git
   cd student-Management-System

# Install the necessary dependencies:

   ```sh
   npm install
   ```

# Start the local development server:

   ```sh
   npm start

   ```
The API will be accessible at http://localhost:8000.


# API Base URL

The valid URL for accessing the API is http://localhost:8000.


## Configuration

Before running the application, you need to set up your environment variables. Create a file named `.env` in the root of your project and add the following variables:

```env
# .env

# Set the port for your server
PORT=8000

# MongoDB connection string
MONGOURI=mongodb://localhost:27017/studentManagementSystem

# Secret key for JWT token generation
SECRETKEY=mysecretkey


## Project Overview

The Student Management System allows administrators to manage student information, assign tasks, and track task statuses. Students can log in, view their tasks, and update task statuses.


### Admin Routes:

1. **Admin Login (`POST /admin/login`):**
   - Allows administrators to log in securely.

2. **Add Student (`POST /admin/addStudent`):**
   - Enables administrators to add new student details.

3. **Assign Task (`POST /admin/assignTask`):**
   - Allows administrators to assign tasks to students.

### Student Routes:

1. **Student Login (`POST /student/login`):**
   - Allows students to log in securely.

2. **Get Student Tasks (`GET /student/tasks`):**
   - Enables students to view tasks assigned to them.

3. **Update Task Status (`PUT /student/updateTaskStatus/:taskId`):**
   - Allows students to update the status of a specific task.


## Error Handling

Errors are handled uniformly across routes using a centralized error handling mechanism. Specific error types, such as duplicate emails or validation errors, are appropriately handled and result in meaningful responses.

## Linting and Formatting

The project adheres to linting rules and code formatting using ESLint and Prettier. You can find the configuration in the `.eslintrc.js` and `.prettierrc.js` files.


## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Bcrypt
- moment
- ...


Feel free to explore and contribute to this project! If you encounter any issues or have suggestions, please create an issue in the repository.


Happy coding!