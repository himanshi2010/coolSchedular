const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    courseCode: {
        type: String, 
        requied: true,
        index: true
    },
    courseName: {
        type: String,
        required: true
    },
    dept: {
      type: String,
      required: true,
    },
    teacherId: {
        type: String,
        default: "not_assigned"
    },
    studentsEnrolled: [
        {
            studentId: {
                type: String
            },
            default: []
        }
    ]
  }
);

module.exports = mongoose.model("Course", schema);
