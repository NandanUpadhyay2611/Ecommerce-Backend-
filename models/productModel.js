const mongoose=require('mongoose')

const product=new mongoose.Schema({
    product_name:{type:String,required:[true,"Enter product name"],index:true},
    manufacturer:{type:String,required:[true,"Enter Manufacturer"],index:true},
    category:String,
    price:{type:Number,required:[true,"Enter the price"],index:true},
    description:String,
    image:String
},{timestamps:true})

product.index({"product_name":'text',"manufacturer":"text","category":"text"});
module.exports=mongoose.model('Product',product);