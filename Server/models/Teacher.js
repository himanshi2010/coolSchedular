const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    userId: {
        type: String, 
        requied: true,
    },
    dept: {
      type: String,
      required: true,
    },
    coursesTeaching: [
        {
            type: String,
            required: true
        }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", schema);
