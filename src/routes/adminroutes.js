const express = require('express');
const {login, addStudent, assignTask} = require('../controllers/adminControllers');
const authMiddleware = require('../middeleware/authMiddleware');

const router = express.Router();


router.post('/login', login);
router.post('/addStudent', authMiddleware.verifyAdminToken, addStudent);
router.post('/assignTask', authMiddleware.verifyAdminToken, assignTask);


module.exports = router;