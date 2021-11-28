const express = require("express");
const teacherController = require("../controllers/teacherController");

const router = express.Router();

router.post("/addSlotsForSubject", teacherController.addSlotForSubject); // Will add or update the course slot accordingly
router.post("/getAssignedStudents", teacherController.getStudentsAssignedToCourse);

module.exports = router;
