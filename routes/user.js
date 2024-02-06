const express=require ('express');
const router=express.Router();
// const cart=require("../controller/cart")
const userRegister=require("../controller/userRegister")

// router.get('/shop',(req,res)=>{
//     res.send("this is shopping page");
// });

// router.route('/cart').get(cart);

// router.route('/details').get(cart)
// router.get('/details',cart.details)
router.post('/register',userRegister.register)
module.exports = router;