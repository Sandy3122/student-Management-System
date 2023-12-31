const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../model/studentModel');
const { secretKey } = require('../config');


// Login Route
const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Validating if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Getting student data from mongoDB
        const student = await Student.findOne({ email });

        // Checking if the student exists
        if (!student || !bcrypt.compareSync(password, student.password)) {
            return res.status(401).send({ error: 'Email or Password incorrect' });
        }

        // Generating and sending the JWT token
        const token = jwt.sign({ role: 'student', email: student.email}, secretKey, {expiresIn: '1h'});

        res.json({
            id: student._id,
            studentName: student.name,
            studentEmail: student.email,
            token,
        })
    } catch (error) {
        console.log(error);
        // Handle different types of errors
        if (error.name === 'ValidationError') {
            return res.status(422).json({ error: 'Validation error' });
        } else {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}



// Route to get student tasks
const getTasks = async(req, res) => {
    try {
        const student = await Student.findOne({ email: req.user.email});

        if(!student){
            return res.status(404).json({ message: 'Student Not Found' });
        }

        // Sending the student data in the response
        res.json({
            studentName: student.name,
            studentEmail: student.email,
            tasks: student.tasks
        })
    } catch (error) {
        console.log(error);
        // Handle different types of errors
        if (error.name === 'ValidationError') {
            return res.status(422).json({ error: 'Validation error' });
        } else {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}






module.exports = {
    login,
    getTasks
}