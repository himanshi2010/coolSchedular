const teacherModel = require("../models/Teacher");

const userService = require("./userService");
const courseService = require("./courseService");

exports.addTeacher = async (data) => {

    const newUser = await userService.addUser({
            email: data.email,
            phone: data.phone,
            firstName: data.firstName,
            lastName: data.lastName,
            userType: "teacher",
        },
        data.password
    );

    const newTeacher = new teacherModel({
        userId: newUser._id,
        dept: data.dept,
        coursesTeaching: data.coursesTeaching
    });

    return await newTeacher.save();
};

exports.getCoursesToTeach = async (userId) => {
    return await courseService.getCourses(userId);
};

exports.getTeacherByEmail = async (email) => {
    const user = await userService.findUserByEmail(email);
    if(!user)
        return null;
    const teacher = await teacherModel.findOne({userId: user_id});
    return teacher;
}