// Task 13: Search by Title - 2 Points
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3013;

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

// Task 13: Search by Title
app.get('/api/search/title/:title', (req, res) => {
    const { title } = req.params;
    
    const searchByTitle = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const titleBooks = books.filter(b => 
                    b.title.toLowerCase().includes(title.toLowerCase())
                );
                resolve(titleBooks);
            }, 130);
        });
    };
    
    searchByTitle()
        .then(books => {
            // Additional promise-based operation
            return axios.get('https://jsonplaceholder.typicode.com/posts/13')
                .then(response => {
                    console.log('External API call successful:', response.data);
                    return { books, externalData: response.data };
                });
        })
        .then(data => {
            if (data.books.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No books found with this title',
                    searchedTitle: title
                });
            }
            
            res.json({
                success: true,
                message: 'Books found by title',
                data: data.books,
                totalBooks: data.books.length,
                title: title,
                externalData: data.externalData
            });
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                message: 'Error searching by title',
                error: error.message
            });
        });
});

// Alternative implementation with async/await
app.get('/api/search/title-async/:title', async (req, res) => {
    try {
        const { title } = req.params;
        
        const searchByTitleAsync = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const titleBooks = books.filter(b => 
                        b.title.toLowerCase().includes(title.toLowerCase())
                    );
                    resolve(titleBooks);
                }, 160);
            });
        };
        
        const titleBooks = await searchByTitleAsync();
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/13');
        
        console.log('External API call successful:', response.data);
        
        if (titleBooks.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No books found with this title',
                searchedTitle: title
            });
        }
        
        res.json({
            success: true,
            message: 'Books found by title using async/await',
            data: titleBooks,
            totalBooks: titleBooks.length,
            title: title,
            externalData: response.data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching by title',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Task 13 Server running on port ${PORT}`);
    console.log(`Search by Title (Promises): http://localhost:${PORT}/api/search/title/Gatsby`);
    console.log(`Search by Title (Async): http://localhost:${PORT}/api/search/title-async/Gatsby`);
});

module.exports = app; 