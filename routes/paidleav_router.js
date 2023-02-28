const express = require("express");
const { createPaid, getAllPaid, deletePaid, getPaid, updatePaid } = require("../controller/paidleave_controller");
const { userMidleware } = require("../middlewares/user_middleware");
const router = express.Router();

router.post("/create",userMidleware,createPaid);
router.delete("/:id",userMidleware,deletePaid);
router.put("/:id",userMidleware,updatePaid);
router.get("/:id",userMidleware,getPaid);
router.get("/",userMidleware,getAllPaid);


module.exports = router;