const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const userMidleware = asyncHandler(async(req,res,next)=>{
    let token;
    if (req?.headers) {
        token = req.headers.tokens;
        try {
        if (token) {
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            const user = await User.findById(decode?.id);
            req.user= user;
            next();
        } else {
            throw new Error("token not found");
        }
        } catch (error) {
            throw new Error(error);
        }
    } else {
        throw new Error("token enter");
        
    }
});

module.exports  = {userMidleware}