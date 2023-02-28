const Sick = require("../models/sick_module");

const asyncHandler = require("express-async-handler");

const createSick = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    try {
        const createData = await Sick.create({
            submission: req.body.submission,
            description: req.body.description,
            user:_id
        });
        res.json(createData);
    } catch (error) {
        throw new Error(error);
    }
});
const getAllSick = asyncHandler(async(req,res)=>{
    const {_id} = req.user
    try {
       const data = await Sick.find().where({"user":_id});
       res.json({
        status: res.statusCode,
        message:' Mendapatkan semua data',
        data,
       }) 
    } catch (error) {
        throw new Error(error)
    }
});
const getSick = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const{id}= req.params;
    try {
        const data = await Sick.findById(id).where( {"user":_id});
        res.json({
            status: res.statusCode,
            message:"Mendaptkan data",
            data,
        })
    } catch (error) {
        throw new Error(error)
    }
});
const updateSick = asyncHandler(async(req,res)=>{
    const {_id}= req.user;
    const {id}= req.params;
    try {
        await Sick.findByIdAndUpdate(id,{
            description: req.body.description
        }).where({"user": _id});
        res.json({
            status: res.statusCode,
            message: "data berhasil di ubah"
        })
    } catch (error) {
        throw new Error(error);
    }
});
const deleteSick = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const {id} = req.params;

    try {
       await Sick.findByIdAndDelete(id).where({"user": _id}) 
    } catch (error) {
      throw new Error(error)  
    }
});

module.exports={createSick,getAllSick,getSick,updateSick,deleteSick}
