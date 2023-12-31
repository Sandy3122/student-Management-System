const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../model/adminModel');
const Student = require('../model/studentModel');
const {secretKey} = require('../config/index');


// Creating the admin account
const createAdminAccount = async () => {
    try {
      const existingAdmin = await Admin.findOne({ email: 'admin@admin.com' });
  
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin', 10); // Hash the password 'admin'
  
        const admin = new Admin({
          email: 'admin@admin.com',
          password: hashedPassword,
        });
  
        await admin.save();
        console.log('Admin account created successfully');
      } else {
        console.log('Admin account already exists');
      }
    } catch (error) {
      console.error('Error creating admin account:', error);
    }
  };

// It automatically creates the admin account.
createAdminAccount();


// Admin Login Controller
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


const addStudent = async(req, res) => {
    try {
        const {name, email, department, password} = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        const student = new Student({ name, email, department, password:hashedPassword});
        await student.save();

        res.status(201).json({ message: 'Student added successfully', student });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern.email === 1) {
          // Duplicate email error handling
          return res.status(400).json({ message: 'Email already exists' });
        } else {
          // Other errors
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
 

module.exports=  {
    login,
    addStudent
    }