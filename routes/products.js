const express=require('express');
const router=express.Router();


module.exports=(app)=>{
    app.use('/products', router)
    
    router.get('/',(req,res,next)=>{
        res.send('array of products')
    });
    router.get('/:id',(req,res,next)=>{
        res.send(`sending product of id ${req.params.id}`)
    });
    router.post('/',(req,res,next)=>{
        res.send('posting new product')
    })
    
}