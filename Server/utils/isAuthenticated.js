const jwt = require("jsonwebtoken");

const { Unauthorized } = require("./responseHelpers");

const userService = require("../services/userService");

exports.isAuth = (req, res, next) => {
  var token =
    (req.body && req.body.access_token) ||
    (req.body && req.query.access_token) ||
    req.headers["x-access-token"];
  if (token) {
    try {
      var decodedValue = jwt.decode(token, process.env.SECRET_KEY);
      req.token = token;
      req.user = decodedValue;
      next();
    } catch (err) {
      return Unauthorized(res);
    }
  } else {
    return Unauthorized(res);
  }
};

exports.isTeacher = async (req, res, next) => {
  if (req.user) {
    try {
      var user = await userService.findUserById({_id: req.user._id});
      if(user.userType != "teacher")
        return Unauthorized(res);
      next();
    } catch (err) {
      return Unauthorized(res);
    }
  } else {
    return Unauthorized(res);
  }
};
