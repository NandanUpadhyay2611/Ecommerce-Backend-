const User=require('../models/userModel')
const mongoose=require('mongoose')
exports.register= async (req,res,next)=>{
        const {username,email,password, image} =req.body;
const user=await User.create({username,email,password,image})
res.json({message:"User Created Succefully",user});
   
}