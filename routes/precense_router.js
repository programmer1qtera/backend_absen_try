const express = require("express");
const { createPrecense, getAllPrecense, getPrecense, updatePrecense, deletePrecense } = require("../controller/precense_controller");
const { userMidleware } = require("../middlewares/user_middleware");
const router = express.Router();

router.post("/create",userMidleware,createPrecense);
router.put("/:id",userMidleware,updatePrecense);
router.delete("/:id",userMidleware,deletePrecense)
router.get("/:id",userMidleware,getPrecense);
router.get("/",userMidleware,getAllPrecense);

module.exports = router;