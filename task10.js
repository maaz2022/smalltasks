// Task 10: Get all books – Using async callback function – 2 Points
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3010;

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

// Task 10: Get all books – Using async callback function
app.get('/api/books-async', async (req, res) => {
    try {
        // Simulate async operation with callback function
        const getBooksAsync = async () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(books);
                }, 100);
            });
        };
        
        // Call the async function
        const bookList = await getBooksAsync();
        
        // Additional async operation with axios
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/10');
        console.log('External API call successful:', response.data);
        
        res.json({
            success: true,
            message: 'Books retrieved using async callback function',
            data: bookList,
            totalBooks: bookList.length,
            externalData: response.data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving books with async callback',
            error: error.message
        });
    }
});

// Alternative implementation with callback pattern
app.get('/api/books-callback', (req, res) => {
    const getBooksWithCallback = (callback) => {
        setTimeout(() => {
            callback(null, books);
        }, 150);
    };
    
    getBooksWithCallback((error, bookList) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: 'Error retrieving books',
                error: error.message
            });
        }
        
        res.json({
            success: true,
            message: 'Books retrieved using callback function',
            data: bookList,
            totalBooks: bookList.length
        });
    });
});

app.listen(PORT, () => {
    console.log(`Task 10 Server running on port ${PORT}`);
    console.log(`Get books (async): http://localhost:${PORT}/api/books-async`);
    console.log(`Get books (callback): http://localhost:${PORT}/api/books-callback`);
});

module.exports = app; 