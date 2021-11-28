const courseModel = require("../models/Course");

exports.addCourse = async (data) => {
    const newCourse = new courseModel(data);
    return await newCourse.save();
}

exports.assignTeacher = async (courseCode, teacherUserId) => {
    return await courseModel.findOneAndUpdate({courseCode}, {teacherId: teacherUserId}, {new: true});
}

exports.getCourseById = async (id) => {
    return await courseModel.findOne({courseCode: id});
}

exports.getCourses = async (id) => {
    return await courseModel.find({teacherId: id});
}