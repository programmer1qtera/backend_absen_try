const express = require('express');
const { createUser, getAllUser, login, getUser, updateUser, deletedUser } = require('../controller/user_controller');
const { userMidleware } = require('../middlewares/user_middleware');
const router = express.Router();

router.post("/register",createUser);
router.post("/login",login);
router.get("/",getAllUser);
router.get("/id",userMidleware,getUser);
router.put("/update",userMidleware,updateUser);
router.delete("/:id",deletedUser);


module.exports= router;