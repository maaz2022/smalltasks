// Task 7: Login as a Registered user - 3 Points
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();
const PORT = 3007;

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
    },
    {
        id: 2,
        username: "jane_smith",
        email: "jane@example.com",
        password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
        createdAt: "2024-01-15T00:00:00Z"
    }
];

// Task 7: Login as a Registered user
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Validate input
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }
        
        // Simulate async operation with axios
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/7');
        console.log('External API call successful:', response.data);
        
        // Find user by username or email
        const user = users.find(u => u.username === username || u.email === username);
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
            { 
                userId: user.id, 
                username: user.username,
                email: user.email
            },
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
                    email: user.email,
                    createdAt: user.createdAt
                },
                expiresIn: '24h'
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

// Verify token endpoint (for testing)
app.get('/api/verify', async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access token required'
            });
        }

        jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Invalid token'
                });
            }
            
            res.json({
                success: true,
                message: 'Token is valid',
                data: user
            });
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error verifying token',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Task 7 Server running on port ${PORT}`);
    console.log(`Login: POST http://localhost:${PORT}/api/login`);
    console.log(`Verify token: GET http://localhost:${PORT}/api/verify`);
    console.log('Test credentials: username: john_doe, password: password');
});

module.exports = app; 