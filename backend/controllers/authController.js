const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    // Register a new user
    register: async (req, res) => {
        try {
            console.log('Received registration request:', req.body); // Log the request body-for debugging purpoe-imp
            
            const { name, email, password, role = 'tourist' } = req.body; // Default role set to 'tourist'

            // Validate request data
            if (!name || !email || !password) {
                return res.status(400).json({ error: 'Name, email, and password are required' });
            }

            // Check if the email is valid
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create and save the new user
            const newUser = new User({ name, email, password: hashedPassword, role });
            const savedUser = await newUser.save();

            // Remove password from the response
            const userResponse = {
                _id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                role: savedUser.role
            };

            console.log('User saved:', userResponse);//for debugging purpose-imp

            // Return the saved user (without password)
            res.status(201).json({ message: 'User registered successfully', user: userResponse });
        } catch (error) {
            console.error('Registration error:', error.message);
            res.status(500).json({ error: 'Registration failed', details: error.message });
        }
    },

    // User login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
    
            // Check if the user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }
    
            // Compare the passwords
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }
    
            // Generate a JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
            // Debug: log the response data before sending it
            console.log('Sending response:', {
                message: 'Login successful',
                token,
                user: { id: user._id, email: user.email, role: user.role }
            });
    
            // Return the token and user information
            res.json({
                message: 'Login successful',
                token,
                user: { id: user._id, email: user.email, role: user.role }
            });
        } catch (error) {
            console.error('Login error:', error.message);
            res.status(500).json({ error: 'Login failed' });
        }
    },
    
    // Logout (handled client-side in stateless JWT auth)
    logout: (req, res) => {
        res.json({ message: 'Logout successful' });
    },

    // Get all users //in future if we create admin
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find(); // Fetch all users
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error.message);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    }
};

module.exports = authController;
