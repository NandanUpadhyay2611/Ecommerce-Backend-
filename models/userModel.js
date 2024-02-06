const mongoose=require('mongoose')
const uniqueValidator=require('mongoose-unique-validator')

const userSchema=new mongoose.Schema({
    username:{type:String,required:[true,"Username can't be empty"],unique:true,match:[/^[a-zA-Z0-9]+$/,"is Invalid"],index:true},
    email:{type:String,required:[true,"Email can't be empty"],unique:true,match:[/\S+@\S+\.\S+/,"is Invalid"],index:true},
  password:{type:String,required:[true,"Please Enter Password"]},
    image:String,
  },{timestamps:true})


  userSchema.plugin(uniqueValidator,{message:"Already taken"})  //pluggin for unique validation of username and email

 
module.exports=mongoose.model('User',userSchema);
