const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
    },
    userType: {
      type: String,
      default: "student", // admin, student, teacher // TODO: Convert it to a global constant / enum
    }
  },
  { timestamps: true }
);

schema.statics.getPasswordHash = (pass) => {
  return bcrypt.hashSync(pass, 10); // TODO: Constant for number of salts
};

schema.methods.isValidPassword = function (pass) {
  return bcrypt.compareSync(pass, this.passwordHash);
};

schema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id.toString(),
      email: this.email,
    },
    process.env.SECRET_KEY
  );
};

schema.methods.toAuthJSON = function () {
  return {
    firstName: this.firstName,
    token: this.generateJWT()
  }
};

module.exports = mongoose.model("User", schema);
