const bodyParser = require("body-parser");
const express = require("express");
const dbConnected = require("./config/db_connect");
const { noteFound, errorHandler } = require("./middlewares/error_handler");
const app = express();
const userRoute = require("./routes/user_router");
const precenseRoute =require("./routes/precense_router");
const paidRoute = require("./routes/paidleav_router");
const sickRoute =require("./routes/sick_router")
const dotenv = require('dotenv').config();
const PORT =  process.env.PORT || 4000;

// app.use("/",(req,res)=>{
//     res.send("server play");
// });
dbConnected();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use("/api/user",userRoute);
app.use("/api/precense",precenseRoute);
app.use("/api/sick",sickRoute)
app.use("/api/paid",paidRoute);

app.use(noteFound);
app.use(errorHandler);
app.listen(PORT,()=>{
    console.log(`Server Sedang Berjalan : ${PORT}`);
})
