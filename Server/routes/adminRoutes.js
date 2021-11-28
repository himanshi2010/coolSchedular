const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.post("/signupStudent", adminController.signupStudent);
router.post("/signupTeacher", adminController.signupTeacher);
router.post("/addCourse", adminController.addCourse);
router.post("/assignTeacherToCourse", adminController.assignTeacherToCourse);
router.post("/assignRequestsForCourse", adminController.assignRequestsForCourse);

module.exports = router;
