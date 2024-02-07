const Product=require("../models/productModel")
const mongoose=require("mongoose")

exports.addProduct=async (req,res,next)=>{
        const {product_name,manufacturer,category,price,description,image}=req.body;
        const product=await Product.create({product_name,manufacturer,category,price,description,image});

        if(!product){
            return res.send("Error in Adding product!");
        }
        res.status(200).json({message:"Product created succesfully",product});
}

exports.deleteProduct=async (req,res,next)=>{
    const idDel=req.query.idDel;

    const deletedProduct=await Product.findByIdAndDelete(idDel);

    if(!deletedProduct){
      return res.send("Product not found");
    }
    res.json({msg:"Sucessfully deleted the product.",deletion:deletedProduct})
    return

}
// catch(err){
//     return res.status(401).send({err});
// }

exports.update=async (req,res,next)=>{
    const idUpdate=req.query.idUpdate;
    const updatedProduct=await Product.findByIdAndUpdate(idUpdate,req.body,{new:true})

    if(!updatedProduct){
        return res.send("Error in updating product.");

    }
    else{
        return res.json({msg:"Product updated succesfully!",updatedProduct:updatedProduct});
    }
}

exports.searchProduct=async (req,res,next)=>{
    const searchs=req.query.searchs
    const searchedProduct=await Product.find({$text:{$search:searchs}});

}
