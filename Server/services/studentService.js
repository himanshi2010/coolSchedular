const studentModel = require("../models/Student");

const userService = require("./userService");

exports.addStudent = async (data) => {

    const newUser = await userService.addUser({
            email: data.email,
            phone: data.phone,
            firstName: data.firstName,
            lastName: data.lastName,
            userType: "student",
        },
        data.password
    );

    const newStudent = new studentModel({
        userId: newUser._id,
        rollno: data.rollno,
        dept: data.dept
    });

    return await newStudent.save();
};