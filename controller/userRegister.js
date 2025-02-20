const User=require('../models/userModel')
const secretKey=require('../middlewares/authorization')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
exports.register= async (req,res,next)=>{
        const {username,email,password, image,userType} =req.body;
const user=await User.create({username,email,password,image,userType})


        let payload=  {id:user.userType || 0,password:user.password};
        const token=jwt.sign(payload,secretKey.secretKey)
        res.status(200).header("Authorization",token).send({token,user});
}
// res.json({message:"User Created Succefully",user});