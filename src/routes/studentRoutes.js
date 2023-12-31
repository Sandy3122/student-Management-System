const express = require('express');
const studentController = require('../controllers/studentControllers');
const { verifyStudentToken } = require("../middeleware/authMiddleware");
// Initialize Router
const router = express.Router();

router.post('/login', studentController.login);
router.get('/tasks', verifyStudentToken, studentController.getTasks);
router.put('/updateTaskStatus/:taskId', verifyStudentToken, studentController.updateTaskStatus);


module.exports = router;