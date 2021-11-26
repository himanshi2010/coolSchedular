const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    courseCode: {
        type: String, 
        requied: true,
    },
    dept: {
      type: String,
      required: true,
    },
    teacherID: {
        type: String,
        required: true,
    },
    studentsEnrolled: [
        {
            studentId: {
                type: String
            }
        }
    ],
    slots: [
        {
            startTime: {
                type: Date
            },
            endTime: {
                type: Date
            }
        }
    ]
  }
);

module.exports = mongoose.model("Course", schema);
