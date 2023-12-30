const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  password: { typr: String, required: true },
  tasks: [
    {
      description: { type: String, required: true },
      dueTime: { type: Date, required: true },
      status: {
        type: String,
        enum: ["pending", "overdue", "completed"],
        default: "pending",
      },
    },
  ],
});


module.exports = mongoose.model('Student', studentSchema);