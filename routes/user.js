const express=require('express');
const router=express.Router();
const userHelper=require('./../Helpers/userHelper')

const userHelperInstance= new userHelper();

module.exports=(app)=>{
    app.use('/users', router)
    
    router.get('/',(req,res,next)=>{
        res.send('array of users')
    });
    router.get('/:id',async (req,res,next)=>{
        const user=await userHelperInstance.findUserById(req.params.id);
        if(user){
        res.send(user);
        }else{
            res.status(500).send("user not found");
        }
    });
    router.post('/',(req,res,next)=>{
        res.send('posting new user')
    })
    
}