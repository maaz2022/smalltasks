// Task 8: Add/Modify a book review (Registered Users only) - 2 Points
const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();
const PORT = 3008;

// Middleware
app.use(express.json());

// In-memory data storage
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "978-0743273565",
        price: 12.99,
        description: "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan."
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "978-0446310789",
        price: 14.99,
        description: "The story of young Scout Finch and her father Atticus in a racially divided Alabama town."
    }
];

let reviews = [
    {
        id: 1,
        bookId: 1,
        userId: 1,
        username: "john_doe",
        rating: 5,
        comment: "A masterpiece of American literature!",
        createdAt: "2024-01-15T10:30:00Z"
    }
];

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            success: false,
            error: 'Access token required' 
        });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ 
                success: false,
                error: 'Invalid token' 
            });
        }
        req.user = user;
        next();
    });
};

// Task 8: Add/Modify a book review (Registered Users only)
app.post('/api/books/:bookId/reviews', authenticateToken, async (req, res) => {
    try {
        const { bookId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user.userId;
        const username = req.user.username;
        
        // Validate input
        if (!rating || !comment) {
            return res.status(400).json({
                success: false,
                message: 'Rating and comment are required'
            });
        }
        
        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }
        
        // Simulate async operation with axios
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/8');
        console.log('External API call successful:', response.data);
        
        // Check if book exists
        const book = books.find(b => b.id === parseInt(bookId));
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        
        // Check if user already reviewed this book
        const existingReview = reviews.find(r => r.bookId === parseInt(bookId) && r.userId === userId);
        
        if (existingReview) {
            // Modify existing review
            existingReview.rating = rating;
            existingReview.comment = comment;
            existingReview.updatedAt = new Date().toISOString();
            
            res.json({
                success: true,
                message: 'Review updated successfully',
                data: {
                    review: existingReview,
                    book: {
                        id: book.id,
                        title: book.title,
                        author: book.author
                    }
                }
            });
        } else {
            // Add new review
            const newReview = {
                id: reviews.length + 1,
                bookId: parseInt(bookId),
                userId,
                username,
                rating,
                comment,
                createdAt: new Date().toISOString()
            };
            
            reviews.push(newReview);
            
            res.status(201).json({
                success: true,
                message: 'Review added successfully',
                data: {
                    review: newReview,
                    book: {
                        id: book.id,
                        title: book.title,
                        author: book.author
                    }
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding/modifying review',
            error: error.message
        });
    }
});

// Get all reviews for a book
app.get('/api/books/:bookId/reviews', async (req, res) => {
    try {
        const { bookId } = req.params;
        const bookReviews = reviews.filter(r => r.bookId === parseInt(bookId));
        
        res.json({
            success: true,
            message: 'Book reviews retrieved successfully',
            data: bookReviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving book reviews',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Task 8 Server running on port ${PORT}`);
    console.log(`Add/Modify review: POST http://localhost:${PORT}/api/books/1/reviews`);
    console.log(`Get reviews: GET http://localhost:${PORT}/api/books/1/reviews`);
    console.log('Requires Authorization header with Bearer token');
});

module.exports = app; 