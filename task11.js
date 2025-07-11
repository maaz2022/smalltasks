// Task 11: Search by ISBN – Using Promises – 2 Points
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3011;

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

// Task 11: Search by ISBN – Using Promises
app.get('/api/search/isbn/:isbn', (req, res) => {
    const { isbn } = req.params;
    
    const searchByISBN = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const book = books.find(b => b.isbn === isbn);
                if (book) {
                    resolve(book);
                } else {
                    reject(new Error('Book not found with this ISBN'));
                }
            }, 150);
        });
    };
    
    searchByISBN()
        .then(book => {
            // Additional promise-based operation
            return axios.get('https://jsonplaceholder.typicode.com/posts/11')
                .then(response => {
                    console.log('External API call successful:', response.data);
                    return { book, externalData: response.data };
                });
        })
        .then(data => {
            res.json({
                success: true,
                message: 'Book found using Promises',
                data: data.book,
                externalData: data.externalData
            });
        })
        .catch(error => {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                error: error.message,
                searchedISBN: isbn
            });
        });
});

// Alternative implementation with async/await
app.get('/api/search/isbn-async/:isbn', async (req, res) => {
    try {
        const { isbn } = req.params;
        
        const searchByISBNAsync = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const book = books.find(b => b.isbn === isbn);
                    if (book) {
                        resolve(book);
                    } else {
                        reject(new Error('Book not found with this ISBN'));
                    }
                }, 200);
            });
        };
        
        const book = await searchByISBNAsync();
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/11');
        
        console.log('External API call successful:', response.data);
        
        res.json({
            success: true,
            message: 'Book found using async/await',
            data: book,
            externalData: response.data
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Book not found',
            error: error.message,
            searchedISBN: req.params.isbn
        });
    }
});

app.listen(PORT, () => {
    console.log(`Task 11 Server running on port ${PORT}`);
    console.log(`Search by ISBN (Promises): http://localhost:${PORT}/api/search/isbn/978-0743273565`);
    console.log(`Search by ISBN (Async): http://localhost:${PORT}/api/search/isbn-async/978-0743273565`);
});

module.exports = app; 