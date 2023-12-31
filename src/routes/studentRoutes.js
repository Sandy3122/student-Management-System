const express = require('express');
const studentController = require('../controllers/studentControllers');
const { verifyStudentToken } = require("../middeleware/authMiddleware");
// Initialize Router
const router = express.Router();

router.post('/login', studentController.login);


module.exports = router;