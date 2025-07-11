// Task 5: Get book Review - 2 Points
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3005;

// Sample book data
const books = [
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
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        isbn: "978-0451524935",
        price: 11.99,
        description: "A dystopian novel about totalitarianism and surveillance society."
    },
    {
        id: 4,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        isbn: "978-0141439518",
        price: 9.99,
        description: "A romantic novel of manners that follows the emotional development of Elizabeth Bennet."
    },
    {
        id: 5,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        isbn: "978-0547928244",
        price: 15.99,
        description: "A fantasy novel about Bilbo Baggins' journey with thirteen dwarves."
    }
];

// Sample reviews data
const reviews = [
    {
        id: 1,
        bookId: 1,
        userId: 1,
        username: "john_doe",
        rating: 5,
        comment: "A masterpiece of American literature! The prose is beautiful and the story is timeless.",
        createdAt: "2024-01-15T10:30:00Z"
    },
    {
        id: 2,
        bookId: 1,
        userId: 2,
        username: "jane_smith",
        rating: 4,
        comment: "Great book, but the ending was a bit disappointing. Still worth reading.",
        createdAt: "2024-01-20T14:45:00Z"
    },
    {
        id: 3,
        bookId: 2,
        userId: 3,
        username: "mike_wilson",
        rating: 5,
        comment: "An important book that everyone should read. Harper Lee's writing is powerful.",
        createdAt: "2024-02-01T09:15:00Z"
    },
    {
        id: 4,
        bookId: 3,
        userId: 1,
        username: "john_doe",
        rating: 4,
        comment: "Scary how relevant this book still is today. Orwell was ahead of his time.",
        createdAt: "2024-01-25T16:20:00Z"
    },
    {
        id: 5,
        bookId: 4,
        userId: 4,
        username: "sarah_jones",
        rating: 3,
        comment: "A classic romance, but a bit slow-paced for modern readers.",
        createdAt: "2024-02-05T11:30:00Z"
    }
];

// Task 5: Get book Review
app.get('/api/books/:bookId/reviews', async (req, res) => {
    try {
        const { bookId } = req.params;
        
        // Simulate async operation with axios
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/5');
        console.log('External API call successful:', response.data);
        
        // Find the book first
        const book = books.find(b => b.id === parseInt(bookId));
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
                bookId: bookId
            });
        }
        
        // Get reviews for this book
        const bookReviews = reviews.filter(r => r.bookId === parseInt(bookId));
        
        // Calculate average rating
        const averageRating = bookReviews.length > 0 
            ? (bookReviews.reduce((sum, review) => sum + review.rating, 0) / bookReviews.length).toFixed(1)
            : 0;
        
        res.json({
            success: true,
            message: 'Book reviews retrieved successfully',
            data: {
                book: {
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    isbn: book.isbn
                },
                reviews: bookReviews,
                totalReviews: bookReviews.length,
                averageRating: parseFloat(averageRating)
            }
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
    console.log(`Task 5 Server running on port ${PORT}`);
    console.log(`Get book reviews: http://localhost:${PORT}/api/books/1/reviews`);
});

module.exports = app; 