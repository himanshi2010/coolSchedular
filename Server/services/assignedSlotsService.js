const assignedSlotsModel = require("../models/AssignedSlots");

exports.slotsAssignedToStudent = async (studentUserId, courseCode) => {
    return await assignedSlotsModel.find({studentUserId, courseCode});
}

exports.assignSlotToStudent = async (studentUserId, courseCode, slot, day, priority) => {
    const entry = new assignedSlotsModel({
        studentUserId,
        courseCode,
        startTime: slot.startTime,
        endTime: slot.endTime,
        day,
        priority
    });
    return await entry.save();
}

exports.findNumberOfSeatsTakenForDayAndCourse = async (day, courseCode) => {
    return (await assignedSlotsModel.find({day, courseCode})).length;
}

exports.getStudentsAssignedToCourseAndDay = async (day, courseCode) => {
    return await assignedSlotsModel.find({day, courseCode});
}

exports.clearDatabase = async () => {
    await assignedSlotsModel.deleteMany({});
}
