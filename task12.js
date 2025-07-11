// Task 12: Search by Author – 2 Points
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3012;

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

// Task 12: Search by Author
app.get('/api/search/author/:author', (req, res) => {
    const { author } = req.params;
    
    const searchByAuthor = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const authorBooks = books.filter(b => 
                    b.author.toLowerCase().includes(author.toLowerCase())
                );
                resolve(authorBooks);
            }, 120);
        });
    };
    
    searchByAuthor()
        .then(books => {
            // Additional promise-based operation
            return axios.get('https://jsonplaceholder.typicode.com/posts/12')
                .then(response => {
                    console.log('External API call successful:', response.data);
                    return { books, externalData: response.data };
                });
        })
        .then(data => {
            if (data.books.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No books found for this author',
                    searchedAuthor: author
                });
            }
            
            res.json({
                success: true,
                message: 'Books found by author',
                data: data.books,
                totalBooks: data.books.length,
                author: author,
                externalData: data.externalData
            });
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                message: 'Error searching by author',
                error: error.message
            });
        });
});

// Alternative implementation with async/await
app.get('/api/search/author-async/:author', async (req, res) => {
    try {
        const { author } = req.params;
        
        const searchByAuthorAsync = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const authorBooks = books.filter(b => 
                        b.author.toLowerCase().includes(author.toLowerCase())
                    );
                    resolve(authorBooks);
                }, 180);
            });
        };
        
        const authorBooks = await searchByAuthorAsync();
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/12');
        
        console.log('External API call successful:', response.data);
        
        if (authorBooks.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No books found for this author',
                searchedAuthor: author
            });
        }
        
        res.json({
            success: true,
            message: 'Books found by author using async/await',
            data: authorBooks,
            totalBooks: authorBooks.length,
            author: author,
            externalData: response.data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching by author',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Task 12 Server running on port ${PORT}`);
    console.log(`Search by Author (Promises): http://localhost:${PORT}/api/search/author/Fitzgerald`);
    console.log(`Search by Author (Async): http://localhost:${PORT}/api/search/author-async/Fitzgerald`);
});

module.exports = app; 