const express = require('express');
const {login, addStudent} = require('../controllers/adminControllers');
const authMiddleware = require('../middeleware/authMiddleware');

const router = express.Router();


router.post('/login', login);
router.post('/addStudent', authMiddleware.verifyAdminToken, addStudent);




module.exports = router;