const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data storage (in a real app, you'd use a database)
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

let users = [
    {
        id: 1,
        username: "john_doe",
        email: "john@example.com",
        password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi" // password
    }
];

let reviews = [
    {
        id: 1,
        bookId: 1,
        userId: 1,
        rating: 5,
        comment: "A masterpiece of American literature!",
        createdAt: new Date()
    }
];

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Task 1: Get the book list available in the shop
app.get('/api/books', (req, res) => {
    try {
        res.json({
            success: true,
            message: 'Book list retrieved successfully',
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving book list',
            error: error.message
        });
    }
});

// Task 2: Get the books based on ISBN
app.get('/api/books/isbn/:isbn', (req, res) => {
    try {
        const { isbn } = req.params;
        const book = books.find(b => b.isbn === isbn);
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found with this ISBN'
            });
        }
        
        res.json({
            success: true,
            message: 'Book found successfully',
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching book by ISBN',
            error: error.message
        });
    }
});

// Task 3: Get all books by Author
app.get('/api/books/author/:author', (req, res) => {
    try {
        const { author } = req.params;
        const authorBooks = books.filter(b => 
            b.author.toLowerCase().includes(author.toLowerCase())
        );
        
        if (authorBooks.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No books found for this author'
            });
        }
        
        res.json({
            success: true,
            message: 'Books found successfully',
            data: authorBooks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching books by author',
            error: error.message
        });
    }
});

// Task 4: Get all books based on Title
app.get('/api/books/title/:title', (req, res) => {
    try {
        const { title } = req.params;
        const titleBooks = books.filter(b => 
            b.title.toLowerCase().includes(title.toLowerCase())
        );
        
        if (titleBooks.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No books found with this title'
            });
        }
        
        res.json({
            success: true,
            message: 'Books found successfully',
            data: titleBooks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching books by title',
            error: error.message
        });
    }
});

// Task 5: Get book Review
app.get('/api/books/:bookId/reviews', (req, res) => {
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

// Task 6: Register New user
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = users.find(u => u.username === username || u.email === email);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Username or email already exists'
            });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const newUser = {
            id: users.length + 1,
            username,
            email,
            password: hashedPassword
        };
        
        users.push(newUser);
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: error.message
        });
    }
});

// Task 7: Login as a Registered user
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        
        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );
        
        res.json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error during login',
            error: error.message
        });
    }
});

// Task 8: Add/Modify a book review (Registered Users only)
app.post('/api/books/:bookId/reviews', authenticateToken, async (req, res) => {
    try {
        const { bookId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user.userId;
        
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
            existingReview.updatedAt = new Date();
            
            res.json({
                success: true,
                message: 'Review updated successfully',
                data: existingReview
            });
        } else {
            // Add new review
            const newReview = {
                id: reviews.length + 1,
                bookId: parseInt(bookId),
                userId,
                rating,
                comment,
                createdAt: new Date()
            };
            
            reviews.push(newReview);
            
            res.status(201).json({
                success: true,
                message: 'Review added successfully',
                data: newReview
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

// Task 9: Delete book review added by that particular user (Registered Users only)
app.delete('/api/books/:bookId/reviews', authenticateToken, async (req, res) => {
    try {
        const { bookId } = req.params;
        const userId = req.user.userId;
        
        const reviewIndex = reviews.findIndex(r => 
            r.bookId === parseInt(bookId) && r.userId === userId
        );
        
        if (reviewIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Review not found or you are not authorized to delete it'
            });
        }
        
        const deletedReview = reviews.splice(reviewIndex, 1)[0];
        
        res.json({
            success: true,
            message: 'Review deleted successfully',
            data: deletedReview
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting review',
            error: error.message
        });
    }
});

// Task 10: Get all books – Using async callback function
app.get('/api/books-async', async (req, res) => {
    try {
        // Simulate async operation
        const getBooksAsync = async () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(books);
                }, 100);
            });
        };
        
        const bookList = await getBooksAsync();
        
        res.json({
            success: true,
            message: 'Books retrieved using async callback function',
            data: bookList
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving books with async callback',
            error: error.message
        });
    }
});

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
                    reject(new Error('Book not found'));
                }
            }, 150);
        });
    };
    
    searchByISBN()
        .then(book => {
            res.json({
                success: true,
                message: 'Book found using Promises',
                data: book
            });
        })
        .catch(error => {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                error: error.message
            });
        });
});

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
            res.json({
                success: true,
                message: 'Books found by author',
                data: books
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
            res.json({
                success: true,
                message: 'Books found by title',
                data: books
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

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Bookshop API is running',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`API Documentation: http://localhost:${PORT}/api/books`);
}); 