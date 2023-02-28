const User = require("../models/user_model");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwt_token");


const createUser = asyncHandler(async(req,res)=>{
    const email = req.body.email;
    const findUser = await User.findOne({
        email: email
    });

    if(!findUser){
        const newUser = await User.create(req.body);
        res.json(newUser);
    }else{
        throw new Error('User Sudah Ada');
    }
});

const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    const findUser = await User.findOne({
        email:email,
        password:password
    });
    const date = new Date();
    const monthNow = date.getMonth()+1;
    const dayNow = date.getDate();
    
    const idUser = findUser._id;
    const findUpdate = findUser.updatedAt;
    const years = date.getFullYear();
    const defaultDate = new Date(`${years}-01`);

    const mountInUpdate = findUpdate.getMonth()+1;
    // const dayInUpdate = findUpdate.getDate();

    const mountInDefault = defaultDate.getMonth()+1;
    // const dayInDefault = defaultDate.getDate();


    // console.log(`find update : ${findUpdate}`);
    // console.log(`find update in mount : ${mountInUpdate}`);
    // console.log(`find update in days : ${dayInUpdate}`);

    // console.log(`default date : ${defaultDate}`);
    // console.log(`find update in mount : ${mountInDefault}`);
    // console.log(`find update in days : ${dayInDefault}`);
    
    // console.log(years); 
    if (findUser) {
        if (mountInUpdate === mountInDefault) {
            console.log("cuti sudah ditambahkan");     
        } else {
            if (monthNow === 1) {
                await User.findByIdAndUpdate(idUser,{
                    $inc:{paid_leaveNum: 12}
                });
                console.log("terupdate tgl");
            } else{
                console.log("Bulan dan Tanggal sudah lewat");
            }
        }
       
        res.json({
            status: res.statusCode,
            message: "logined",
            data:{
            _id: idUser,
            name:findUser.name,
            email: findUser.email,
            mobile: findUser.mobile,
            token: generateToken(findUser._id)
        }});
        
    } else {
        throw new Error('User tidak di temukan')
    }
})

const getAllUser = asyncHandler(async(req,res)=>{
    try {
        data = await User.find();
        res.json({
            status:res.statusCode,
            message: "Mendapatkan Semua User",
            data,
        })
    } catch (error) {
        throw new Error(error)
    }
});

const getUser = asyncHandler(async(req,res)=>{
    const{_id} = req.user;
    try {
        const data = await User.findOne(_id).populate("precense").populate("paid_leaves");
        res.json({
            status:res.statusCode,
            message:"mendapatkan user",
            data,
        })
    } catch (error) {
        throw new Error(error)
    }
});

const deletedUser  = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const data = await User.findByIdAndDelete(id);
        res.json({
            status: res.statusCode,
            message:"User delete"
        });
    } catch (error) {
        throw new Error(error)
    }
});
const updateUser = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    try {
        const data = await User.findByIdAndUpdate(_id,{
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
        });
        res.json({
            status:res.statusCode,
            message:"user update"
        })
    } catch (error) {
        throw new Error(error)
    }
});


module.exports={createUser,getAllUser,login,getUser,updateUser,deletedUser}