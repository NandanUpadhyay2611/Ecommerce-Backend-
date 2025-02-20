const Product = require("../models/productModel");
const User =require("../models/userModel")
const mongoose = require("mongoose");

exports.getAllProducts = async (req, res, next) => {
  var queryObj = { ...req.query };

  const excludeFields = ["page", "limit", "skip", "sort"]; //excluiding these because they might co-exist with other filters but these are parts of pagination query

  excludeFields.forEach((item) => delete queryObj[item]);
  var queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  var filteredProducts = await Product.find(JSON.parse(queryStr));

  if (!filteredProducts) {
    res.send("No product filtered");
  } else if (Object.keys(queryObj).length <= 0) {  //if no req.query is passed show all products.
    var allproducts = await Product.find({});
    var results = allproducts.length;
    res.json({
      message: "Displaying all products",
      results: `Showing ${results} results`,
      allproducts,
    });
  } else {
    var resultsFiltered = filteredProducts.length;
    res
      .status(200)
      .json({
        msg: `Showing ${resultsFiltered} results filtered`,
        filteredProducts: filteredProducts,
      });
  }
};

exports.addProduct = async (req, res, next) => {
  const { product_name, manufacturer, category, price, description, image } =
    req.body;
  const product = await Product.create({
    product_name,
    manufacturer,
    category,
    price,
    description,
    image,
  });

  if (!product) {
    return res.send("Error in Adding product!");
  }
  return res
    .status(200)
    .json({ message: "Product created succesfully", product });
};

exports.deleteProduct = async (req, res, next) => {
  const idDel = req.query.idDel;

  const deletedProduct = await Product.findByIdAndDelete(idDel);

  if (!deletedProduct) {
    return res.send("Product not found");
  }
  res.json({
    msg: "Sucessfully deleted the product.",
    deletion: deletedProduct,
  });
  return;
};
// catch(err){
//     return res.status(401).send({err});
// }

exports.update = async (req, res, next) => {
  const idUpdate = req.query.idUpdate;
  const updatedProduct = await Product.findByIdAndUpdate(idUpdate, req.body, {
    new: true,
  });

  if (!updatedProduct) {
    return res.send("Error in updating product.");
  } else {
    return res.json({
      msg: "Product updated succesfully!",
      updatedProduct: updatedProduct,
    });
  }
};

exports.searchProduct = async (req, res, next) => {
  const searchs = req.query.searchs;
  const searchedProduct = await Product.find({
    $or: [
      { product_name: { $regex: searchs, $options: "i" } },
      { manufacturer: { $regex: searchs, $options: "i" } },
    ],
  });
  if (!searchedProduct) {
    console.log(searchedProduct);
    return res.send("Cannot search product.");
  } else {
    return res.json({ msg: "Matches found", searchedProduct: searchedProduct });
  }
};

//included in getAllproducts.
// exports.filterProduct=async (req,res,next)=>{

//     var queryObj={...req.query};
//     const excludeFields=["page","limit","skip","sort"]; //excluiding these because they might co-exist with other filters but these are parts of pagination query
//     excludeFields.forEach(item => delete queryObj[item]);
//     var queryStr=JSON.stringify(queryObj).replace(/\b(gte|gt|lte|lt)\b/g,(match)=> `$${match}`)
//     var filteredProducts=await Product.find({queryStr});
//     if(!filteredProducts){
//         console.log(filteredProducts);
//         res.send("No product filtered");
//     }
//     else{
//         console.log(filteredProducts);
//         res.status(200).json({msg:"filtered products",filteredProducts:filteredProducts});
//     }

// }

exports.displayCart=async (req,res,next)=>{
      const userId=req.query.userId;
      const user=await User.findById(userId);
    
    res.json({
      msg:"Displaying cart",cart:user.cart})
}

exports.addtoCart=async (req,res,next)=>{
    const productId=req.query.productId;
    const userId=req.query.userId;
    const productToadd=await Product.findById(productId);

    const user=await User.findById(userId);
    let alreadyPresent=0;
    let foundAtIndex;
    // User.cart.push(productToadd);
    // await User.save(done);
    // user.cart.push(productToadd);
    // const addedToCart=await User.save(user); 
    console.log(user.cart.length);
    for(let i=0;i<user.cart.length;i++){
          if(productId==user.cart[i]._id){
              alreadyPresent=1;
              foundAtIndex=i;
              break;
          }
    }
    // const cartProduct=user.cart[0].products;
// console.log(cartProduct);
    if(alreadyPresent===0){
    const addedToCart= await User.updateOne({_id:userId},{$push:{cart:productToadd}});   //here you had to push without matching anything iside the cart so you directly pushed the object productToadd

     return res.json({msg:"added to cart succesfully!",productToadd:productToadd,addedToCart:addedToCart})
    }

    else if(alreadyPresent===1){
        user.cart[foundAtIndex].count++;
      user.save();
        return res.status(200).json({msg:"Already in cart, count increased!",productToadd:productToadd})
    }

}

exports.removeFromCart=async (req,res,next)=>{
  const productId=req.query.productId;
  const userId=req.query.userId;
    const productToRemove=await Product.findById(productId);

  const user=await User.findById(userId);
  // const indexToRemove=user.cart.findIndex(a=>a._id===productId);
  // user.cart.splice(indexToRemove,1);
  // await User.save();
  const removedFromCart=await User.updateOne({_id:userId},{$pull:{cart:{_id:productId}}});  //but here you have to match the condition idwith the product id inside the cart
if(!removedFromCart){
      return res.json({msg:"Already removed the Item from cart"});
}

else{

  return res.json({msg:"removed from cart succesfully!",productToRemove:productToRemove,removedFromCart:removedFromCart})
  
}


}

exports.increaseInCart=async (req,res,next)=>{
    const userId=req.query.userId;
 

    const productId=req.query.productId;
    const user=await User.findById(userId);
    const productToincrease=await Product.findById(productId);

    let productFound=0;
    let foundAtIndex=-1;
    
    // console.log(productToincrease);
    for(let i=0;i<user.cart.length;i++){
      if(productId==user.cart[i]._id){
        productFound=1;
        foundAtIndex=i;
        break;
      }
    }

    // if(productFound==0){
      
    // }
    // console.log(foundAtIndex);
      user.cart[foundAtIndex].count++;
      user.save();
      res.status(200).send("product count incresed!");
    
}

