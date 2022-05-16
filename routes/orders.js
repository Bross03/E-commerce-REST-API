const express=require('express');
const router=express.Router();


module.exports=(app)=>{
    app.use('/orders', router)
    
    router.get('/',(req,res,next)=>{
        res.send('array of orders')
    });
    router.get('/:id',(req,res,next)=>{
        res.send(`sending order of id ${req.params.id}`)
    });
    router.post('/',(req,res,next)=>{
        res.send('posting new order')
    })
    
}