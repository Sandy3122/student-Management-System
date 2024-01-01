const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../model/adminModel");
const Student = require("../model/studentModel");
const { secretKey } = require("../config/index");
const moment = require("moment"); // To parse the input date and time.
const adminErrorHandler = require('../ErrorHandling/adminErrorHandler')

// Creating the admin account
const createAdminAccount = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: "admin@admin.com" });

    // Checking for existing admin
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin", 10); // Hash the password 'admin'

      // Saving admin login routes
      const admin = new Admin({
        email: "admin@admin.com",
        password: hashedPassword,
      });
      await admin.save();

      console.log("Admin account created successfully");
    } else {
      console.log("Admin account already exists");
    }
  } catch (error) {
    console.error("Error creating admin account:", error);
  }
};

// It automatically creates the admin account.
createAdminAccount();


// Admin Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validating required fields, email and password
    if (!(email && password)) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin || !bcrypt.compareSync(password, admin.password)) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Creating the admin token
    const token = jwt.sign({ role: "admin" }, secretKey, { expiresIn: "1h" });

    res.json({
      message: 'Admin Login Successful',
      _id: admin._id,
      token,
    });
  }
  catch (error) {
    adminErrorHandler(error, req, res);
  }
};


// Route for adding student
const addStudent = async (req, res) => {
  try {
    const { name, email, department, password } = req.body;

    // Validating all required fields
    if (!(name && email && department && password)) {
      return res.status(400).json({ message: "All fields (name, email, department, password) are required" });
    }

    // Hashing admin entered Password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Saving student data in database
    const student = new Student({
      name,
      email,
      department,
      password: hashedPassword,
    });
    await student.save();

    // Sending response for the request
    res.status(201).json({ message: "Student added successfully", student });
  }
  catch (error) {
    adminErrorHandler(error, req, res);
  }
};


// Route for assigning the task to student.
const assignTask = async (req, res) => {
  try {
    const { studentEmail, description, dueTime } = req.body;

    // Validating all required fields
    if (!(studentEmail && description && dueTime)) {
      return res.status(400).json({ message: "All fields (studentEmail, description, dueTime) are required" });
    }

    // Finding the student by email id
    const student = await Student.findOne({ email: studentEmail });

    if (!student) {
      return res.status(404).json({ message: "Student Not Found" });
    }

    // Checking if the task with the same description already exists
    const existingTask = student.tasks.find(
      (task) => task.description === description
    );

    if (existingTask) {
      return res.status(400).json({
          message:
            "Task with the same description already exists. No updates allowed.",
        });
    }

    // Parsing the dueTime into a valid date and time format
    const newTask = { description, dueTime: dueTime };
    student.tasks.push(newTask);
    await student.save();

    res.json({
      message: "Task Assigned Successfully",
      studentName: student.name,
      task: newTask,
    });
  }
  catch (error) {
    adminErrorHandler(error, req, res);
  }
};


// Exporting modules
module.exports = {
  login,
  addStudent,
  assignTask,
};
