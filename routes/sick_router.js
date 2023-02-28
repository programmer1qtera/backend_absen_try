const express = require("express");
const { createSick, getAllSick } = require("../controller/sick_controller");
const { userMidleware } = require("../middlewares/user_middleware");
const router = express.Router();

router.post("/",userMidleware,createSick);
router.get("/",userMidleware,getAllSick);

module.exports = router;
