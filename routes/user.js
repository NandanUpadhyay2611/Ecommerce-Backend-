const express=require ('express');
const router=express.Router();
const addProduct=require("../controller/productController")
// const cart=require("../controller/cart")
const userRegister=require("../controller/userRegister");
const authorization = require('../middlewares/authorization');

// router.get('/shop',(req,res)=>{
//     res.send("this is shopping page");
// });

// router.route('/cart').get(cart);

// router.route('/details').get(cart)
// router.get('/details',cart.details)
router.post('/register',userRegister.register)
router.post('/addProduct',authorization.authorization,addProduct.addProduct)
router.delete('/deleteProduct',authorization.authorization,addProduct.deleteProduct)
router.put('/updateProduct',authorization.authorization,addProduct.update)
module.exports = router;