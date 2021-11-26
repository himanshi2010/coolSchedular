const jwt = require("jsonwebtoken");

const { Unauthorized } = require("./responseHelpers");

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
