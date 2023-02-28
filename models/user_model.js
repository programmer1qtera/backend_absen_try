const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },role:{
        type: String,
        default: "user"
    },
    password:{
        type:String,
        required:true,
    },
    paid_leaveNum:{
        type: Number,
        default: 12
    },
    precense:[{type:mongoose.Schema.Types.ObjectId, ref:"Precense"}],
    paid_leaves:[{type:mongoose.Schema.Types.ObjectId, ref:"Paidleave"}],
},{
    timestamps: true
});

//Export the model
module.exports = mongoose.model('User', userSchema);