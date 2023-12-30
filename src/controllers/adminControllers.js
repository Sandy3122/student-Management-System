const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../model/adminModel');
const Student = require('../model/studentModel');
const {secretKey} = require('../config');



const login = async(req, res) => {
    try{
        const {email, password } = req.body;
        
        const admin = await Admin.findOne({ email });
        if(!admin || !bcrypt.compareSync(password, admin.password)) {
            return res.status(401).json({ message: "Invalid Credentials"});
        }

        const token = jwt.sign({ role: 'admin'}, secretKey, { expiresIn: '1h'});

        res.json({
            _id : admin._id ,
            token
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error'});
    }
};