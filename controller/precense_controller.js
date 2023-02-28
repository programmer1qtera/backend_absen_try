const Precense = require("../models/precense_model");
const User = require("../models/user_model");
const asyncHandler = require("express-async-handler");

const createPrecense = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const newPrecense = await Precense.create({
            status: req.body.status,
            place: req.body.place,
            user: _id,
            in: req.body.in,
            date: req.body.date,
            lat: req.body.lat,
            long: req.body.long,
            address: req.body.address
        });

        await User.findByIdAndUpdate(_id, {
            $push:{precense: newPrecense.id}
        });
        res.json(newPrecense);
        // console.log(res.json(newPrecense));

    } catch (error) {
        throw new Error(error);
    }
});
const getPrecense = asyncHandler(async (req,res)=>{
    const {_id} = req.user;
    const {id} = req.params;
    try {
        const data = await Precense.findById(id).populate("user").where({"user":_id});
        res.json({
            status: res.statusCode,
            message: "Mendapatkan data",
            data,
        });
    } catch (error) {
        throw new Error(error);
    }
});
const getAllPrecense = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const datas = await Precense.find().populate("user").where({ "user": _id });
        //   const data =   prece.user.find((id)=> id.toString()=== _id);

        res.json({
            status: res.statusCode,
            message: "Mendapatkan semua data",
            datas,
        });
    } catch (error) {
        throw new Error(error)
    }
});

const updatePrecense = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const {_id} = req.user;
    try {
        const updateData = await Precense.findByIdAndUpdate(id,{
           place: req.body.place 
        }).where({"user":_id});
        res.json(updateData);
    } catch (error) {
        throw new Error(error);
    }
});
const deletePrecense = asyncHandler(async (req,res)=>{
    const {_id} = req.user;
    const {id} = req.params;
    try {
        await User.findByIdAndUpdate(_id, {
            $pull:{precense: id}
        });
        const dataDelet = await Precense.findByIdAndDelete(id).populate("user").where({"user":_id});
        res.json({
            status: res.statusCode,
            message: "data delete",
            dataDelet,
        });
        
    } catch (error) {
        throw new Error(error);
    }
});
module.exports = { createPrecense, getAllPrecense,getPrecense,updatePrecense,deletePrecense };