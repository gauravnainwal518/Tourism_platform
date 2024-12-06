require('dotenv').config(); // Load environment variables-imp
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const errorHandler = require('./utils/errorHandler');
const logger = require('./utils/logger');
const authRoutes = require('./routes/authRoutes');
const guideRoutes = require('./routes/guideRoutes');
const homestayRoutes = require('./routes/homestayRoutes');
const bookingsRoutes = require("./routes/bookingsRoutes");

const path = require ("path");




const app = express();

// Middleware to enable CORS
app.use(cors({
    origin: 'http://localhost:5173', //frontend url
    methods: 'GET, POST, PUT, DELETE', // Allowed methods
    credentials: true, // Allow cookies/auth headers
}));

const _dirname = path.resolve();

// Middleware to parse JSON requests
app.use(express.json());


// Serve static files from 'uploads' folder
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/guides', guideRoutes);
app.use('/api/homestays', homestayRoutes);
app.use("/api/bookings", bookingsRoutes);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (_,res) =>{
    res.sendFile(path.resolve(_dirname, "frontend","dist","index.html"));
})


// Global error handler
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => logger.info('Connected to MongoDB'))
.catch(err => logger.error(`Error connecting to MongoDB: ${err.message}`));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
