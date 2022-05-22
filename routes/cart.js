const express=require('express');
const router=express.Router();
const cartHelper=require('./../Helpers/cartHelpers.js');
const cartHelperInstance= new cartHelper();
const orderHelper=require('./../Helpers/ordersHelper.js');
const orderHelperInstance= new orderHelper();

module.exports=(app)=>{

    //setting up router
    app.use('/cart', router)
    
    //get specific cart of the logged in user
    router.get('/mine',async (req,res,next)=>{

        if(req.session.passport){
            const cart = await cartHelperInstance.findCartById(req.session.passport.user);

            if(cart){
                res.send(cart);
            }else{
                res.status(500).send("cart not found");
            }

        }else{
            res.status(500).send('You must be logged in to access your cart');
        }

    });

    //post carts
    router.post('/', async (req,res,next)=>{
        try{

            if(req.session.passport){                
                const response = await cartHelperInstance.createCart(req.session.passport.user);

                if(response){
                    res.status(200).send(response);
                }else{
                    res.status(500).send("A cart related to this user already exists");
                }

            }else{
                res.status(500).send('You must be logged in to create a cart');    
            }

        }catch(err){
            res.status(500).send(err);
        }
    });

    //post items in the users cart
    router.post('/mine',async (req,res,next)=>{
        try{
            if(req.session.passport){
                const data=req.body;
                const result = await cartHelperInstance.addItemToCart(data, req.session.passport.user);
                res.status(200).send('Item successfully added to the cart');
            }else{
                res.status(500).send('You must be logged in to add items to a cart')
            }

        }catch(err){
            res.status(500).send(err);
        }
    });

    //checking out users carts
    //create new order and delete cart and items associated with it
    router.post('/mine/checkout',async (req,res,next)=>{
     
        try{
            if(req.session.passport){

                const totalPrice=await cartHelperInstance.getTotalCartPrice(req.session.passport.user);
                const newOrder=await orderHelperInstance.createOrder(totalPrice, req.session.passport.user);
                
                //delete cart and items
                if(newOrder){
                    await orderHelperInstance.deleteCartAndCartItems(req.session.passport.user);
                }
                res.sendStatus(200);
                
            }else{
                res.status(500).send('You must be logged in to add items to checkout')
            }
        }catch(err){
            res.status(500).send(err)
        }
    })

    
}