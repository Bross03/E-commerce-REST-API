const userRouter=require('./user.js');
const productsRouter=require('./products.js');
const ordersRouter=require('./orders.js');

module.exports=(app)=>{
    userRouter(app);
    productsRouter(app);
    ordersRouter(app);
}