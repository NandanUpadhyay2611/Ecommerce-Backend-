const Order=require("../models/orderModel")

exports.orderAdmin=async (req,res,next)=>{
    //redirect to payment page from here
    const {shippingDetails,orders,orderStatus,paymentMode}=req.body;
    const productId=req.query.productId;
    

    const orderPlace=await Order.create({shippingDetails,orders,user:req.user._id,orderStatus,deliveredAt:Date.now(),paymentMode});

    if(!orderPlace){
        return res.status(404).send("Error in placing the order");
    }
    else{
        return res.status(200).json({msg:"Order placed succesfully!",orderPlace});
    }
}



//displaying orders for logged in user;
exports.myOrders=async (req,res,next)=>{

    const userId=req.query.userId
    const orderList=await Order.find({userId});

    if(!orderList){
        return res.json({msg:"you dont have any orders"});
    }
    else{
        return res.status(200).json({
            success:true,
            orderList
        })
    }

}