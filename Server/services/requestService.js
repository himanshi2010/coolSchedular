const requestModel = require("../models/Request");

exports.addOrder = async (order, userId, courseCode) => {
    const newOrder = requestModel({
        studentUserId: userId,
        slots: order,
        courseCode
    });
    return await newOrder.save();
}

exports.findStudentOrder = async (studentUserId, courseCode) => {
    return await requestModel.findOne({studentUserId, courseCode});
}

exports.getRequestsForCourseSorted = async (courseCode) => {
    return await requestModel.find({courseCode}).sort({createdAt: 1});
}