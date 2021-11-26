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
            courseCode: {
                type: String,
            }
        }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", schema);
