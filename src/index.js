const express = require('express');
const app = express();  // Creating express instance with app
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {mongoURI} = require('./config');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes')
const cors = require('cors');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Enable CORS for all routes
app.use(cors());


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
