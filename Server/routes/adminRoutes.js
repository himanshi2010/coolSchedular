const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.post("/signupStudent", adminController.signupStudent);
router.post("/signupTeacher", adminController.signupTeacher);

module.exports = router;
