const userService = require("../services/userService");
const { SomethingWentWrong, BadRequest, Success } = require("./responseHelpers");

exports.login = async (req, res, next) => {
    try {
        // console.log("in login")
        var data = req.body.data;
        var user = await userService.findUserByEmail(data.email);
        
        if(!user)
            return BadRequest(res, "User with this email not found");
        
        if(!user.isValidPassword(data.password)) {
            return BadRequest(res, "Passwords don't match");
        }
         console.log(user)
        return Success(res, "Logged In", user.toAuthJSON());
    } catch (err) {
        console.log("Login Util:", err);
        return SomethingWentWrong(res);
    }
}