const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../model/studentModel");
const { secretKey } = require("../config");
const adminErrorHandler = require('../ErrorHandling/studentErrorHandler')

// Login Route
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validating if email and password are provided
    if (!(email && password)) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Getting student data from mongoDB
    const student = await Student.findOne({ email });

    // Checking if the student exists
    if (!student) {
      return res.status(401).json({ error: "Email not found" });
    }

    // Checking if the password is correct
    const isPasswordCorrect = bcrypt.compareSync(password, student.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Incorrect password" });
    }


    // Generating and sending the JWT token
    const token = jwt.sign(
      { role: "student", email: student.email },
      secretKey,
      { expiresIn: "1h" }
    );

    res.json({
      id: student._id,
      studentName: student.name,
      studentEmail: student.email,
      token,
    });
  }catch (error) {
    handleErrors(error, req, res);
  }
};

// Route to get student tasks
const getTasks = async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.user.email });

    if (!student) {
      return res.status(404).json({ message: "Student Not Found" });
    }

    // Sending the student data in the response
    res.json({
      studentName: student.name,
      studentEmail: student.email,
      tasks: student.tasks,
    });
  } catch (error) {
    handleErrors(error, req, res);
  }
};

// Route to update the task status
const updateTaskStatus = async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.user.email });
    // console.log("Student", student);

    // Checking whether the given task ID exists or not
    if (!student) {
      return res.status(404).json({ message: "Student Not Found" });
    }

    const { taskId } = req.params;
    const { status } = req.body;
    console.log("Task ID:", taskId);

    // Checking if the task ID is valid or not
    const task = student.tasks.id(taskId);
    if (!task) {
      return res.status(400).json({ message: "Task Not Found!" });
    }

    // Checking if the task status is the same
    if (task.status === status) {
      return res.status(400).json({ message: "Task Status is already the same" });
    }

    // Checking for valid task status
    const validStatusValues = ["pending", "completed", "in-progress"];
    if (!validStatusValues.includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid Task Status, Please check and try again" });
    }

    // Updating task status
    task.status = status;
    await student.save();

    // Sending the response with the updated task status
    res.json({
      message: "Task Status Updated Successfully",
      updatedTask: task,
    });
  } catch (error) {
    // Handle invalid ObjectId in URL
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid Task ID" });
    }
    // Other Unexpected Errors
    else {
      handleErrors(error, req, res);
    }
  }
};


// Exporting modules
module.exports = {
  login,
  getTasks,
  updateTaskStatus,
};
