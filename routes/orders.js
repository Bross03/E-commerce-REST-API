const express=require('express');
const router=express.Router();
const orderHelper=require('./../Helpers/ordersHelper.js');
const orderHelperInstance=new orderHelper();

module.exports=(app)=>{

    //setting up router
    app.use('/orders', router)
    
    //get all orders
    router.get('/',async (req,res,next)=>{

        const orders= await orderHelperInstance.getAllOrders();
        res.send(orders);
    
    });

    //get a specific order
    router.get('/:id',async (req,res,next)=>{
        const order=await orderHelperInstance.getOrderById(req.params.id);
        if(order){
            res.send(order);
        }
        else{
        res.status(500).send('Order does not exist');
        }
    });

    //get all orders from an user
    router.get('/user/:id', async (req,res,next)=>{
        const orders=await orderHelperInstance.getOrderByUserId(req.params.id);
        if(orders){
            res.send(orders);
        }else{
            res.status(500).send('User does not have any orders');
        }
    });
    
    //update order status
    router.put('/:id', async (req,res,next)=>{
       const {status}=req.body;
        const updatedOrder=await orderHelperInstance.updateOrder(status,req.params.id);
        if(updatedOrder){
            res.send(updatedOrder);
        }else{
            res.status(500).send("Order does not exist");
        }
    });

    
}