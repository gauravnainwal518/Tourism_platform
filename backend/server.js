// main server file
require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Utils
const errorHandler = require('./utils/errorHandler');
const logger = require('./utils/logger');

// Routes
const authRoutes = require('./routes/authRoutes');         // User & Guide auth
const guideRoutes = require('./routes/guideRoutes');       // Guide + bookings
const homestayRoutes = require('./routes/homestayRoutes'); // Homestay + bookings
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:5173',                  // Local frontend
  'https://tourism-platform.onrender.com'  // Production frontend
];

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  credentials: true,
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/guides', guideRoutes);        // Guide-related + bookings
app.use('/api/homestays', homestayRoutes);  // Homestay-related + bookings
app.use('/api/admin', adminRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

// Global error handler
app.use(errorHandler);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => logger.error(`Error connecting to MongoDB: ${err.message}`));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
