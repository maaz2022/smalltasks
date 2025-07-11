# Bookshop API - Node.js Project

This project contains 13 individual tasks implementing a complete bookshop API using Node.js, Express, and Axios. Each task is implemented as a separate server with its own functionality.

## Project Structure

```
├── package.json          # Dependencies and scripts
├── server.js            # Main server with all tasks combined
├── task1.js            # Get book list
├── task2.js            # Search by ISBN
├── task3.js            # Search by Author
├── task4.js            # Search by Title
├── task5.js            # Get book reviews
├── task6.js            # Register new user
├── task7.js            # Login user
├── task8.js            # Add/Modify book review (authenticated)
├── task9.js            # Delete book review (authenticated)
├── task10.js           # Get all books using async callback
├── task11.js           # Search by ISBN using Promises
├── task12.js           # Search by Author using Promises
├── task13.js           # Search by Title using Promises
├── test.js             # Test file for all endpoints
└── README.md           # This file
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the main server:
```bash
npm start
```

Or start individual task servers:
```bash
node task1.js
node task2.js
# ... etc for each task
```

## Task Details

### Task 1: Get the book list available in the shop (2 Points)
- **File**: `task1.js`
- **Port**: 3001
- **Endpoint**: `GET /api/books`
- **Description**: Returns all books in the shop
- **Features**: Uses async/await with Axios

### Task 2: Get the books based on ISBN (2 Points)
- **File**: `task2.js`
- **Port**: 3002
- **Endpoint**: `GET /api/books/isbn/:isbn`
- **Description**: Search for a book by its ISBN
- **Features**: Uses async/await with Axios

### Task 3: Get all books by Author (2 Points)
- **File**: `task3.js`
- **Port**: 3003
- **Endpoint**: `GET /api/books/author/:author`
- **Description**: Search for books by author name
- **Features**: Uses async/await with Axios

### Task 4: Get all books based on Title (2 Points)
- **File**: `task4.js`
- **Port**: 3004
- **Endpoint**: `GET /api/books/title/:title`
- **Description**: Search for books by title
- **Features**: Uses async/await with Axios

### Task 5: Get book Review (2 Points)
- **File**: `task5.js`
- **Port**: 3005
- **Endpoint**: `GET /api/books/:bookId/reviews`
- **Description**: Get all reviews for a specific book
- **Features**: Uses async/await with Axios

### Task 6: Register New user (3 Points)
- **File**: `task6.js`
- **Port**: 3006
- **Endpoint**: `POST /api/register`
- **Description**: Register a new user with validation
- **Features**: Password hashing with bcrypt, input validation

### Task 7: Login as a Registered user (3 Points)
- **File**: `task7.js`
- **Port**: 3007
- **Endpoint**: `POST /api/login`
- **Description**: Login with username/email and password
- **Features**: JWT token generation, password verification

### Task 8: Add/Modify a book review (2 Points)
- **File**: `task8.js`
- **Port**: 3008
- **Endpoint**: `POST /api/books/:bookId/reviews`
- **Description**: Add or modify a review (authenticated users only)
- **Features**: JWT authentication, review validation

### Task 9: Delete book review (2 Points)
- **File**: `task9.js`
- **Port**: 3009
- **Endpoint**: `DELETE /api/books/:bookId/reviews`
- **Description**: Delete a review (authenticated users only)
- **Features**: JWT authentication, user authorization

### Task 10: Get all books using async callback function (2 Points)
- **File**: `task10.js`
- **Port**: 3010
- **Endpoint**: `GET /api/books-async`
- **Description**: Get all books using async callback pattern
- **Features**: Async callback function implementation

### Task 11: Search by ISBN using Promises (2 Points)
- **File**: `task11.js`
- **Port**: 3011
- **Endpoint**: `GET /api/search/isbn/:isbn`
- **Description**: Search by ISBN using Promise-based approach
- **Features**: Promise implementation with error handling

### Task 12: Search by Author using Promises (2 Points)
- **File**: `task12.js`
- **Port**: 3012
- **Endpoint**: `GET /api/search/author/:author`
- **Description**: Search by author using Promise-based approach
- **Features**: Promise implementation with error handling

### Task 13: Search by Title using Promises (2 Points)
- **File**: `task13.js`
- **Port**: 3013
- **Endpoint**: `GET /api/search/title/:title`
- **Description**: Search by title using Promise-based approach
- **Features**: Promise implementation with error handling

## API Testing

### Test Credentials
- **Username**: `john_doe`
- **Password**: `password`
- **Email**: `john@example.com`

### Sample API Calls

#### 1. Get all books
```bash
curl http://localhost:3001/api/books
```

#### 2. Search by ISBN
```bash
curl http://localhost:3002/api/books/isbn/978-0743273565
```

#### 3. Search by Author
```bash
curl http://localhost:3003/api/books/author/Fitzgerald
```

#### 4. Search by Title
```bash
curl http://localhost:3004/api/books/title/Gatsby
```

#### 5. Get book reviews
```bash
curl http://localhost:3005/api/books/1/reviews
```

#### 6. Register new user
```bash
curl -X POST http://localhost:3006/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "email": "newuser@example.com",
    "password": "password123"
  }'
```

#### 7. Login
```bash
curl -X POST http://localhost:3007/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "password"
  }'
```

#### 8. Add/Modify review (requires token)
```bash
curl -X POST http://localhost:3008/api/books/1/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "rating": 5,
    "comment": "Excellent book!"
  }'
```

#### 9. Delete review (requires token)
```bash
curl -X DELETE http://localhost:3009/api/books/1/reviews \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### 10. Get books with async callback
```bash
curl http://localhost:3010/api/books-async
```

#### 11. Search by ISBN with Promises
```bash
curl http://localhost:3011/api/search/isbn/978-0743273565
```

#### 12. Search by Author with Promises
```bash
curl http://localhost:3012/api/search/author/Fitzgerald
```

#### 13. Search by Title with Promises
```bash
curl http://localhost:3013/api/search/title/Gatsby
```

## Features Implemented

### Authentication & Authorization
- JWT token-based authentication
- Password hashing with bcrypt
- User registration and login
- Protected routes for authenticated users

### Data Management
- In-memory data storage (books, users, reviews)
- Input validation and error handling
- RESTful API design

### Async Operations
- Async/await implementation
- Promise-based operations
- Callback function patterns
- Axios for external API calls

### Error Handling
- Comprehensive error responses
- HTTP status codes
- Validation error messages

## Running Tests

Use the test file to verify all endpoints:

```bash
node test.js
```

## Dependencies

- **express**: Web framework
- **axios**: HTTP client for external API calls
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token generation
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## Notes

- All servers use different ports to avoid conflicts
- Each task is self-contained and can run independently
- The main `server.js` contains all tasks combined
- External API calls are simulated using jsonplaceholder.typicode.com
- Passwords are hashed using bcrypt with salt rounds of 10
- JWT tokens expire after 24 hours

## Total Points: 30

- Tasks 1-5: 10 points (2 each)
- Tasks 6-7: 6 points (3 each)
- Tasks 8-9: 4 points (2 each)
- Tasks 10-13: 8 points (2 each)
- Main server: 2 points (bonus) 