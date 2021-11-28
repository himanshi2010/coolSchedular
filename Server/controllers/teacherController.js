const { SomethingWentWrong, Success } = require("../utils/responseHelpers");

const courseSlotService = require("../services/courseSlotService");
const assignedSlotsService = require("../services/assignedSlotsService");

exports.addSlotForSubject = async (req, res, next) => {
    try {
        var data = req.body.data; 
        var courseSlot = await courseSlotService.addCourseSlot(data.courseCode, data.slots);
        return Success(res, "Course with slots added successfully", courseSlot);
    } catch (err) {
        console.log("\nAdd slot for subject: ", err);
        return SomethingWentWrong(res);
    }
}

exports.getStudentsAssignedToCourse = async (req, res, next) => {
    try {
        var data = req.body.data;
        return await assignedSlotsService.getStudentsAssignedToCourseAndDay(data.courseCode, data.day);
    } catch (err) {
        console.log("Get Student Assigned To Course", err);
        return SomethingWentWrong(res);
    }
}