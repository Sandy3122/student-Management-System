const express = require('express');
const adminController = require('../controllers/adminControllers');
const authMiddleware = require('../middeleware/authMiddleware');

const router = express.Router();


router.post('/login', adminController.login);




module.exports = router;  