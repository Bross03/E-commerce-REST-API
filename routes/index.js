const userRouter=require('./user.js');
const productsRouter=require('./products.js');
const ordersRouter=require('./orders.js');
const cartRouter=require('./cart.js');
const authRouter=require('./auth.js');

module.exports=(app,passport)=>{
    userRouter(app);
    productsRouter(app);
    ordersRouter(app);
    cartRouter(app);
    authRouter(app,passport);
}