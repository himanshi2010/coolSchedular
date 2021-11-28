const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    courseCode: {
        type: String, 
        requied: true,
        index: true
    },
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

module.exports = mongoose.model("CourseSlot", schema);
