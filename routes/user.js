const express=require('express');
const router=express.Router();


module.exports=(app)=>{
    app.use('/users', router)
    
    router.get('/',(req,res,next)=>{
        res.send('array of users')
    });
    router.get('/:id',(req,res,next)=>{
        res.send(`sending user of id ${req.params.id}`)
    });
    router.post('/',(req,res,next)=>{
        res.send('posting new user')
    })
    
}