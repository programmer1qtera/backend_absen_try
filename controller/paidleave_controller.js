const User = require("../models/user_model");
const Paid = require("../models/paidleave_mdoel");
const asyncHandler = require("express-async-handler");
const { json } = require("body-parser");

const createPaid = asyncHandler(async(req,res)=>{
   try {
    const {_id} = req.user;
    const user = await User.findById(_id);
    const zeroPaid =  user.paid_leaveNum;
        if (zeroPaid === 0) {
            console.log(`Habis cuti  ${zeroPaid}`);
            res.json({
                message: "cuti sudah habis",
            });
        } else {
            const newpaid = await Paid.create({
                submission: req.body.submission,
                description: req.body.description,
                user:_id
            });
            await User.findByIdAndUpdate(_id,{
                $push:{paid_leaves:newpaid.id},
                $inc:{paid_leaveNum:-1}
            });
        res.json(newpaid);
        }  
   } catch (error) {
    throw new Error(error);
   } 
});

const getPaid = asyncHandler(async(req,res)=>{
    const{_id} = req.user;
    const{id} = req.params;
    try {
        const findPaidId = await Paid.findById(id).where({"user": _id});
        res.json(
            findPaidId
        )
    } catch (error) {
        throw new Error(error)
    }
});

const getAllPaid = asyncHandler(async(req,res)=>{
    try {
       const {_id} = req.user;
       const data = await Paid.find().where({"user": _id});
       res.json({
        status: res.statusCode,
        message:"Mendapatkan data",
        data,
       }) 
    } catch (error) {
        
    }
});
 const deletePaid = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const {id}= req.params;
    try {
        await User.findByIdAndUpdate(_id,{
            $pull:{paid_leaves: id}
        })
       const deletePaidData = await Paid.findByIdAndDelete(id).where({"user":_id});
       res.json({
        status: res.statusCode,
        message:"cuti delete"
    }); 
    } catch (error) {
        throw new Error(error)
    }
 });

 const updatePaid = asyncHandler(async(req,res)=>{
    const {_id}= req.user;
    const {id} = req.params;
    try {
        await Paid.findByIdAndUpdate(id).where({"user": _id});
        res.json({
            status: res.statusCode,
            message:"Data terupdate"
        })
    } catch (error) {
        throw new Error(error)
    }
 });

module.exports ={createPaid,getAllPaid,deletePaid,getPaid,updatePaid};