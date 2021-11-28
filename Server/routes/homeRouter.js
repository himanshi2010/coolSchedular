const express = require("express");
const homeController = require("../controllers/homeController");

const router = express.Router();

router.get("/", homeController.getHomePage);
router.post("/registerPriority", homeController.registerPriority);
router.post("/getSlotsForStudent", homeController.getSlotsForStudent);

module.exports = router;
