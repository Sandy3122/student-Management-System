const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    }
});

// Create an index on the email field
adminSchema.index({ email: 1 });

module.exports = mongoose.model('Admin', adminSchema);