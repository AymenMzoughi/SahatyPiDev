const express = require('express');
 const mongoose = require ('mongoose');
// const userrouter = require('../routes/user-routes.js');
const userrouter = require('./routes/user-routes')
const doctorsrouter = require('./routes/doctorsRoute')
const adminrouter = require('./routes/adminRoute')
const cookieParser = require('cookie-parser')
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors({credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use('/api', userrouter); 
app.use('/api',doctorsrouter);
app.use('/api',adminrouter);
const passport = require ('passport');
mongoose
.connect(
//`mongodb+srv://zaineb:${process.env.MONGODB_PASSWORORD}@cluster0.5wu3lmt.mongodb.net/PiDev?retryWrites=true&w=majority`
`mongodb+srv://Zaineb:${process.env.MONGODB_PASSWORORD}@cluster0.l97obut.mongodb.net/Sahati?retryWrites=true&w=majority`    )
.then(() => {
 
 app.listen(5000);
    console.log("Database is connected! Listening to localhost 5000");

})
.catch((err) => console.log(err));
