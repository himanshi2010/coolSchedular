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
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    day: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    }
  },
  {timestamps: true}
);

module.exports = mongoose.model("AssignedSlot", schema);
