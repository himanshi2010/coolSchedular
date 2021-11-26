const {
  SomethingWentWrong,
  Success,
  BadRequest,
} = require("../utils/responseHelpers");

const studentService = require("../services/studentService");
const userService = require("../services/userService");
const teacherService = require("../services/teacherService");

exports.signupStudent = async (req, res, next) => {
	try {
		var data = req.body.data;
		var user = await userService.findUserByEmail(data.email);

		if(user) {
			return BadRequest(res, "This email is already in use");
		}

      	var result = await studentService.addStudent(data);
      	return Success(res, "Success", result);
	} catch (err) {
		console.log("Signup student:", err);
		return SomethingWentWrong(res);
  	}	
};

exports.signupTeacher = async (req, res, next) => {
	try {
		var data = req.body.data;
		var user = await userService.findUserByEmail(data.email);

		if(user)
			return BadRequest(res, "This email is already in use");

      	var result = await teacherService.addTeacher(data);
      	return Success(res, "Success", result);
	} catch (err) {
		console.log("Signup teacher:", err);
		return SomethingWentWrong(res);
  	}	
};