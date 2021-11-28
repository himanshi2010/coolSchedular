const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema(
  {
    userId: {
        type: String, 
        requied: true,
    },
    rollno: {
        type: String,
        required: true,
    },
    dept: {
      type: String,
      required: true,
    },
    coursesTaken: [
      {
        courseName: {
          type: String
        },
        courseCode: {
          type: String
        },
        teacherTeaching: {
          type: String,
          default: "not_assigned"
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", schema);
