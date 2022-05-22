const express = require('express');
const router=express.Router();

const AuthHelper=require('./../Helpers/authHelper.js')
const authHelperInstance=new AuthHelper();

module.exports=(app, passport)=>{

    //setting up router
    app.use('/auth', router)
    
    //registering new users
    router.post('/register', async (req, res, next) => {
        try{
            const data = req.body;
            const response = await authHelperInstance.register(data);
            res.status(200).send(response);
        }catch(err){
            res.status(500).send(err)
        }
    });

    //login of registered users
    router.post('/login', passport.authenticate("local"), async (req,res,next)=>{
        try{
            const {email, password}=req.body;
            const response= await authHelperInstance.login({email, password});

            res.status(200).send(response);
        }catch(err){
            res.status(500).send(err);
        }
    });

    //login out users
    router.get("/logout", (req, res) => {
        req.logout();
        res.status(200).send("User logged out");
      });
    
    
}