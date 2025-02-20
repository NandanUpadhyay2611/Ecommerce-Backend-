const express=require ('express');
const router=express.Router();
const productController=require("../controller/productController")
const orderController=require("../controller/orderController")
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
router.get('/products',productController.getAllProducts)
router.post('/addProduct',authorization.authorization,productController.addProduct)
router.delete('/deleteProduct',authorization.authorization,productController.deleteProduct)
router.put('/updateProduct',authorization.authorization,productController.update)
router.get('/searchProduct',authorization.authorization,productController.searchProduct);
router.post('/addtoCart',authorization.authorization,productController.addtoCart)
router.post('/removeFromCart',authorization.authorization,productController.removeFromCart)
router.get('/displayCart',productController.displayCart)
router.put('/increseProductInCart',authorization.authorization,productController.increaseInCart)
router.post('/placeOrder',authorization.authorization,orderController.orderAdmin)
router.get('/myOrders',orderController.myOrders)

module.exports = router;