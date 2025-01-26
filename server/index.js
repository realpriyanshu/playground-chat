const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config(); 
const newUserModel = require('./models/model.js')
const userRouter = require('./routes/users.js')
const app = express();
app.use(express.json());
app.use('/user' , userRouter);


  mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB connected");
    app.listen(process.env.PORT,()=>{
        console.log("server started ...")
    })
  }).catch((e)=>{
    console.log(e)
  })
