const mongoose = require("mongoose");
const moment = require("moment");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    password: { type: String, required: true },
    tasks: [
      {
        description: { type: String, required: true },
        dueTime: {
          type: Date,
          required: true,
          set: (value) => {
            // Custom setter function to format the date before saving to the database
            return moment(value, "DD-MM-YYYY, hA").toDate();
          },
        },
        status: {
          type: String,
          enum: ["pending", "overdue", "completed"],
          default: "pending",
        },
      },
    ],
  },
  { timestamps: true }
); // Add timestamps option

module.exports = mongoose.model("Student", studentSchema);
