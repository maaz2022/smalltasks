// Task 6: Register New user – 3 Points
const express = require('express');
const bcrypt = require('bcryptjs');
const axios = require('axios');

const app = express();
const PORT = 3006;

// Middleware
app.use(express.json());

// In-memory user storage (in a real app, you'd use a database)
let users = [
    {
        id: 1,
        username: "john_doe",
        email: "john@example.com",
        password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
        createdAt: "2024-01-01T00:00:00Z"
    }
];

// Task 6: Register New user
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username, email, and password are required'
            });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }
        
        // Validate password strength
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }
        
        // Simulate async operation with axios
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/6');
        console.log('External API call successful:', response.data);
        
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
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                createdAt: newUser.createdAt
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

// Get all users (for testing purposes)
app.get('/api/users', async (req, res) => {
    try {
        const usersWithoutPasswords = users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        }));
        
        res.json({
            success: true,
            message: 'Users retrieved successfully',
            data: usersWithoutPasswords
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving users',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Task 6 Server running on port ${PORT}`);
    console.log(`Register user: POST http://localhost:${PORT}/api/register`);
    console.log(`Get users: GET http://localhost:${PORT}/api/users`);
});

module.exports = app; 