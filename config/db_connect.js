const { default: mongoose } = require("mongoose");
 
const dbConnected = ()=>{
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log('DataBase Terkoneksi');
    } catch (error) {
        console.log('DataBase tidak terkoneksi');
    }
} ;

module.exports = dbConnected;