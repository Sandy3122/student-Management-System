const express = require('express');
const app = express();  // Creating express instance with 
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {mongoURI} = require('./config');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes')



// Applying rate limiting middleware
// Admin API Rate Limit
const adminLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // 300 requests per minute per API key
  handler: (req, res) => {
    res.status(429).json({
      status: 'error',
      message: 'Rate limit exceeded for Admin API. Please try again later.',
    });
  },
});

// Student API Rate Limit
const studentLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 500, // 500 requests per minute per API key
  handler: (req, res) => {
    res.status(429).json({
      status: 'error',
      message: 'Rate limit exceeded for Student API. Please try again later.',
    });
  },
});

app.use('/admin', adminLimiter);
app.use('/student', studentLimiter);


// Enable CORS for all routes
app.use(cors());

// Parsing Json D ata
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// MongoDB Database Connection
mongoose.set('strictQuery', false);
const connectDatabase = async () => {
  try {
      await mongoose.connect('mongodb://0.0.0.0:27017/studentManagementSystem');
      console.log("Connected to MongoDB Database");
  } catch (error) {
      console.error(`Not Connected To MongoDB: ${error}`);
  }
};
// Calling The database connection function.
connectDatabase();


// Routes for admin and student
app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);

app.use((req, res, next) => {
  console.log(`Received a request: ${req.method} ${req.url}`);
  next();
});


// Importing PORT from .env
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server Start: http://localhost/${PORT}`);
});
