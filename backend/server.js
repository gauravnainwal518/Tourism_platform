// main server file
import 'dotenv/config'; // Load environment variables
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import authRoutes from './routes/authRoutes.js';         // User & Guide auth
import guideRoutes from './routes/guideRoutes.js';       // Guide + bookings
import homestayRoutes from './routes/homestayRoutes.js'; // Homestay + bookings
import adminRoutes from './routes/adminRoutes.js';

const app = express();

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:5173',                  // Local frontend
    // Production frontend
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

// Catch-all 404 route (prevents path-to-regexp errors)
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(`Error connecting to MongoDB: ${err.message}`));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
