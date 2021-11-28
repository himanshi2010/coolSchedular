const {Success, SomethingWentWrong} = require("../utils/responseHelpers");
const studentService = require("../services/studentService");
const userService = require("../services/userService");
const teacherService = require("../services/teacherService");
const requestService = require("../services/requestService");
const assignedSlotsService = require("../services/assignedSlotsService");
const courseSlotService = require("../services/courseSlotService");

exports.getHomePage = async (req, res, next) => {
	try {
		var user = await userService.findUserByEmail(req.user.email);
        var courses = (user.userType == "student") ? 
			await studentService.getCoursesForStudent(req.user._id) :
			await teacherService.getCoursesToTeach(req.user._id);
      	return Success(res, "Success", {type: user.userType, courses: courses});
	} catch (err) {
		console.log("Get Courses For Student:", err);
		return SomethingWentWrong(res);
  	}
};

exports.registerPriority = async (req, res, next) => {
	try {
		var data = req.body.data;
		var order = await requestService.addOrder(data.order, req.user._id, data.courseCode);
		return Success(res, "Priority Order Registered", order);
	} catch(err) {
		console.log("\nRegister Priority", err);
		return SomethingWentWrong(res);
	}
}

exports.getSlotsForStudent = async (req, res, next) => {
	try {
		// console.log(req.body);
		var data = req.body.data;
		var studentSlots = await assignedSlotsService.slotsAssignedToStudent(req.user._id, data.courseCode);
		if(studentSlots.length != 0) {
			// Assigned
			return Success(res, "Assigned Slots", {type: "assigned", slots: {slots: studentSlots}});
		}

		var requestedSlots = await requestService.findStudentOrder(req.user._id, data.courseCode);
		if(requestedSlots) {
			// Not assigned yet, student has requested
			return Success(res, "Requested Slots", {type: "requested", slots: requestedSlots});
		}

		var slots = await courseSlotService.getCourseSlots(data.courseCode);
		return Success(res, "Slots", {type: "notrequested", slots});
	} catch (err) {
		console.log("Get Slots For Student", err);
		return SomethingWentWrong(res);
	}
}