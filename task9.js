// Task 9: Delete book review added by that particular user - 2 Points
const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();
const PORT = 3009;

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
    },
    {
        id: 2,
        bookId: 1,
        userId: 2,
        username: "jane_smith",
        rating: 4,
        comment: "Great book, but the ending was a bit disappointing.",
        createdAt: "2024-01-20T14:45:00Z"
    },
    {
        id: 3,
        bookId: 2,
        userId: 1,
        username: "john_doe",
        rating: 5,
        comment: "An important book that everyone should read.",
        createdAt: "2024-02-01T09:15:00Z"
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

// Task 9: Delete book review added by that particular user
app.delete('/api/books/:bookId/reviews', authenticateToken, async (req, res) => {
    try {
        const { bookId } = req.params;
        const userId = req.user.userId;
        
        // Simulate async operation with axios
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/9');
        console.log('External API call successful:', response.data);
        
        // Check if book exists
        const book = books.find(b => b.id === parseInt(bookId));
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        
        // Find the review by this user for this book
        const reviewIndex = reviews.findIndex(r => 
            r.bookId === parseInt(bookId) && r.userId === userId
        );
        
        if (reviewIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Review not found or you are not authorized to delete it',
                bookId: bookId,
                userId: userId
            });
        }
        
        // Delete the review
        const deletedReview = reviews.splice(reviewIndex, 1)[0];
        
        res.json({
            success: true,
            message: 'Review deleted successfully',
            data: {
                deletedReview,
                book: {
                    id: book.id,
                    title: book.title,
                    author: book.author
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting review',
            error: error.message
        });
    }
});

// Get all reviews for a book (for testing)
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

// Get all reviews (for testing)
app.get('/api/reviews', async (req, res) => {
    try {
        res.json({
            success: true,
            message: 'All reviews retrieved successfully',
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving reviews',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Task 9 Server running on port ${PORT}`);
    console.log(`Delete review: DELETE http://localhost:${PORT}/api/books/1/reviews`);
    console.log(`Get reviews: GET http://localhost:${PORT}/api/books/1/reviews`);
    console.log(`All reviews: GET http://localhost:${PORT}/api/reviews`);
    console.log('Requires Authorization header with Bearer token');
});

module.exports = app; 