const courseSlotModel = require("../models/CourseSlot");

exports.addCourseSlot = async (courseCode, slots) => {
    var courseSlot = await courseSlotModel.findOne({courseCode});
    if(courseSlot) {
        courseSlot.slots = slots;
        return await courseSlot.save();
    }
    var newCourseSlot = new courseSlotModel({
        courseCode,
        slots
    });
    return await newCourseSlot.save();
}

exports.getCourseSlots = async (courseCode) => {
    return await courseSlotModel.findOne({courseCode});
}