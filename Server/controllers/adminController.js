const {
  SomethingWentWrong,
  Success,
  BadRequest,
} = require("../utils/responseHelpers");

const studentService = require("../services/studentService");
const userService = require("../services/userService");
const teacherService = require("../services/teacherService");
const courseService = require("../services/courseService");
const requestService = require("../services/requestService");
const assignedSlotsService = require("../services/assignedSlotsService");

exports.signupStudent = async (req, res, next) => {
	try {
		var data = req.body.data;
		var user = await userService.findUserByEmail(data.email);

		if(user) {
			return BadRequest(res, "This email is already in use");
		}
		var coursesTaken = [];

		for(var i = 0; i < data.coursesTaken.length; ++i) {
			const course = await courseService.getCourseById(data.coursesTaken[i]);
			if(!course)
				return BadRequest(res, "Course code is invalid");

			const teacher = course.teacherId != "not_assigned" ? await userService.findUserById(course.teacherId) : "not_assigned";
			coursesTaken.push({
				courseName: course.courseName,
				courseCode: course.courseCode,
				teacherTeaching: teacher != "not_assigned" ? teacher.firstName + " " + teacher.lastName : "not_assigned"
			});
		}
		req.body.data.coursesTaken = coursesTaken;
      	var student = await studentService.addStudent(data);
      	return Success(res, "Success", student);
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

exports.addCourse = async (req, res, next) => {
	try {
		var data = req.body.data;
		var result = await courseService.addCourse(data);
		return Success(res, "Course Added", result);
	} catch (err) {
		console.log("Add Course");
		return SomethingWentWrong(res);
	}
}

exports.assignTeacherToCourse = async (req, res, next) => {
	try {
		var data = req.body.data;
		var course = await courseService.getCourseById(data.courseCode);
		if(!course)
			return BadRequest(res, "This course code doesn't exist");
		
		var user = await userService.findUserByEmail(data.teacherEmail);
		if(!user)
			return BadRequest(res, "A teacher with this email doesn't exist");
		
		var result = await courseService.assignTeacher(data.courseCode, user._id.toString());
		console.log("\n", result);
		return Success(res, "Teacher assigned", result);
	} catch (err) {
		console.log("Assign Teacher To Course: ", err);
		return SomethingWentWrong(res);
	}
}

exports.assignRequestsForCourse = async (req, res, next) => {
	try {
		await assignedSlotsService.clearDatabase();
		var data = req.body.data;
		var sortedRequests = await requestService.getRequestsForCourseSorted(data.courseCode);
		var seatsLeft = [0, 20, 20, 20, 20, 20, 0];
		var slotsAssigned = [];
		for(var i = 0; i < sortedRequests.length; ++i, --seatsLeft) {
			var request = sortedRequests[i];
			for(var slot = 0; slot < request.slots.length; ++slot) {
				var startTime = request.slots[slot].startTime;
				var day = startTime.getDay();
				var dayStr = "";
				switch(day) {
					case 0: dayStr = "sunday";
							break;
					case 1: dayStr = "monday"
							break;
					case 2: dayStr = "tuesday"
							break;
					case 3:	dayStr = "wednesday";
							break;
					case 4: dayStr = "thursday";
							break;
					case 5: dayStr = "friday";
							break;
					case 6: dayStr = "saturday";
							break;
					default: dayStr = "sunday";
				}
				if(seatsLeft[day] == 0)
					continue;
				var assignedSlot = await assignedSlotsService.assignSlotToStudent(request.studentUserId, data.courseCode, request.slots[slot], dayStr, i + 1);
				--seatsLeft[day];
				slotsAssigned.push(assignedSlot);
			}
		}
		return Success(res, "Slots assigned successfully", slotsAssigned);
	} catch (err) {
		console.log("\nAssign Requests", err);
		return SomethingWentWrong(res);
	}
}