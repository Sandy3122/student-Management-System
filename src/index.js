const express = require('express');
const app = express();  // Creating express instance with app
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {mongoURI} = require('./config');
const adminRoutes = require('./routes/adminroutes');
const cors = require('cors');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Enable CORS for all routes
app.use(cors());


// MongoDB Database Connection
mongoose.set('strictQuery', false);
mongoose.connect(mongoURI, {
  maxPoolSize: 15,
  serverSelectionTimeoutMS: 5000, // Adjust the timeout value as needed
});
// .then(() => {
//   console.log("Successfully Connected To MongoDB Database.");
// })
// .catch((e) => {
//   console.log("Not Connected To MongoDB Database. Error:", e);
// });
  
const db = mongoose.connection;

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.once('open', () => {
  console.log('Successfully Connected to MongoDB');
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});



// Routes for admin
app.use('/admin', adminRoutes);

app.use((req, res, next) => {
  console.log(`Received a request: ${req.method} ${req.url}`);
  next();
});


// Importing PORT from .env
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server Start: http://localhost/${PORT}`);
});
