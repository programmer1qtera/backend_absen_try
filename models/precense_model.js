const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var precenseSchema = new mongoose.Schema({
    status:{
        type:String,
        required:true,
    },
    place:{
        type:String,
        required:true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    in:{
        type:String,
        default:""
    },
    date:{
        type: String,
        default:""
    },
    lat:{
        type:mongoose.Schema.Types.Decimal128,   
        default:0  
    },
    long:{
        type:mongoose.Schema.Types.Decimal128,
        default:0
    },
    address:{
        type:String,
        default:""
    }
},{
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Precense', precenseSchema);