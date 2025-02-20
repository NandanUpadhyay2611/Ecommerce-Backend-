const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
    shippingDetails:{
      
        name:{type:String,required:true},
        phoneNo:{type:String,required:true,minlength:10,maxlength:10},
        pincode:{type:Number,required:true},
        address:{type:String,required:true}
      

    },
    orders:[{
   
    quantity:{type:Number,required:true},
    price:{type:Number,required:true},
    products:{type:mongoose.Schema.ObjectId,ref:"Product",required:true}}
],
user:{type:mongoose.Schema.ObjectId,ref:"User"},
   
orderStatus: {
 type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: {type:Date},
  paymentMode:{type:String,required:true}

})

module.exports=mongoose.model('Order',orderSchema);