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
    router.put('/:id',async (req,res,next)=>{
        if(req.params.id==req.session.passport?.user){
            try{
                const updatedUser=await userHelperInstance.updateUser(req.params.id, req.body);
                res.status(200).send(updatedUser);
            }catch(err){
                res.status(500).send(err)
            }
        }else{
            res.status(500).send('You must be logged in to update a user')
        }
    })
}