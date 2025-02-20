const mongoose=require('mongoose')
const uniqueValidator=require('mongoose-unique-validator')
const Product=require('../models/productModel')



const product=new mongoose.Schema({
  product_name:{type:String,required:[true,"Enter product name"],index:true},
  manufacturer:{type:String,required:[true,"Enter Manufacturer"],index:true},
  category:String,
  price:{type:Number,required:[true,"Enter the price"],index:true},
  description:String,
  image:String,
  count:{type:Number,default:1}
},{timestamps:true})

// const userCartSchema=new mongoose.Schema({
//   products:[product],
//   count:Number,
//   cartPrice:Number
// })

const userSchema=new mongoose.Schema({
    username:{type:String,required:[true,"Username can't be empty"],unique:true,match:[/^[a-zA-Z0-9]+$/,"is Invalid"],index:true},
    email:{type:String,required:[true,"Email can't be empty"],unique:true,match:[/\S+@\S+\.\S+/,"is Invalid"],index:true},
  password:{type:String,required:[true,"Please Enter Password"]},
    image:String,
    userType:Number || 0,
    cart:[product]
  },{timestamps:true})


  userSchema.plugin(uniqueValidator,{message:"Already taken"})  //pluggin for unique validation of username and email


module.exports=mongoose.model('User',userSchema);
