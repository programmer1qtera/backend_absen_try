const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var sickrSchema = new mongoose.Schema({
    submission:{
        type:String,
        default:""
    },
    description:{
        type:String,
        default:""
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Sick', sickrSchema);