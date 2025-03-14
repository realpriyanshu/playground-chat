const express = require("express");
const router =  express.Router();
const zod = require('zod');
const newUserModel= require('../models/model.js');
const mongoose = require('mongoose');
const authMiddleware = require('../middlewares/middleware.js')
require("dotenv").config();
const jwt = require('jsonwebtoken');


const userValidate = zod.object({
    username : zod.string().email(),
    password : zod.string(),    
    firstname : zod.string(),
    lastname : zod.string()
})
const userSignin = zod.object({
    username : zod.string().email(),
    password : zod.string()
})





router.post('/signup' ,async (req,res)=>{
const userdetails = req.body;
const respond = userValidate.safeParse(userdetails);
console.log(respond)

    if(!respond.success){
        return res.json({
            msg: "Invalid input "
        })
    }

    const existing = await newUserModel.findOne({
        username : respond.data.username
    })

    if(existing){
        return res.json({
            msg:"user already exist "
        })
    }
     
    const newUser = await newUserModel.create({
        username : respond.data.username,
        password : respond.data.password,
        firstname: respond.data.firstname,
        lastname : respond.data.lastname
    })

    const userId  = newUser._id;

    const token = jwt.sign({
        userId : userId
    },
    process.env.JWT_SECRET
)

res.json({
    msg :" User created succesfully",
    token : token
})
    
})

router.post('/signin', async(req,res)=>{

    const userdetails = req.body;

  const response =   userSignin.safeParse(userdetails);

  if(!response.success){

    return res.json({
        msg:"invalid input"
    })
  }

  try {
    const findUsername = await newUserModel.findOne({
        username : response.data.username
   })
 
   if(!findUsername){
 
    return res.status(404).json({
         msg :"user not found"
     })
   }
   const findPass = await newUserModel.findOne({
     password : response.data.password
 })
 
 
 if(!findPass){
 
   return  res.status(404).json({
         msg :"invalid password"
     })
 }
 
 const token = jwt.sign({
    userId : findUsername._id
  },
process.env.JWT_SECRET)


res.status(200).json({
    msg:"login successful",
    token:token
})
  
 
    
  } catch (error) {

    console.log(error);
    res.status(500).json({
        msg : error
    })
    
  }

})

router.get('/chat', async(req,res)=>{

    const  users = await  newUserModel.find({});

    res.json({
        user: users.map((u)=>({
          firstname : u.firstname
        }))
    })

})

router.get('/getUser', authMiddleware, async (req, res) => {
    try {
      const userId = req.userId; // Ensure authMiddleware sets `req.userId`
  
      // Find user by ID in the database
      const findUsername = await newUserModel.findOne({ _id: userId });
  
      // Handle case where user is not found
      if (!findUsername) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const name = findUsername.firstname; // Extract the `firstname` field
  
      // Respond with the user's first name
      res.json({
        firstname: name,
      });
    } catch (error) {
      console.error(error); // Log any errors
      res.status(500).json({ error: 'Server error' }); // Send generic server error response
    }
  });
  
module.exports = router;