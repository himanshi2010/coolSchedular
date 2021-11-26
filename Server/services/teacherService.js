const teacherModel = require("../models/Teacher");

const userService = require("./userService");

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
        coursesTeaching: []
    });

    return await newTeacher.save();
};