const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    studentUserId: {
        type: String, 
        requied: true
    },
    courseCode: {
        type: String,
        required:true,
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
  },
  {timestamps: true}
);

module.exports = mongoose.model("Request", schema);
