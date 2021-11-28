const studentModel = require("../models/Student");

const userService = require("./userService");
const courseService = require("./courseService");

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
        dept: data.dept,
        coursesTaken: data.coursesTaken
    });

    return await newStudent.save();
};

exports.getCoursesForStudent = async (userId) => {
    const student = await studentModel.findOne({userId});
    var coursesTaken = [];
    if(student.coursesTaken)
        coursesTaken = student.coursesTaken;
    for(var i = 0; i < coursesTaken.length; ++i) {
        var course = await courseService.getCourseById(coursesTaken[i].courseCode);
        coursesTaken[i].teacherTeaching = course.teacherId;
    }
    return coursesTaken;
}