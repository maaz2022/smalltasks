// Task 1: Get the book list available in the shop - 2 Points
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3001;

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

// Task 1: Get the book list available in the shop
app.get('/api/books', async (req, res) => {
    try {
        // Simulate async operation with axios
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        console.log('External API call successful:', response.data);
        
        res.json({
            success: true,
            message: 'Book list retrieved successfully',
            data: books,
            totalBooks: books.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving book list',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Task 1 Server running on port ${PORT}`);
    console.log(`Get book list: http://localhost:${PORT}/api/books`);
});

module.exports = app; 