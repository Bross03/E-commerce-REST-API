const express = require('express');
const router=express.Router();


const AuthHelper=require('./../Helpers/authHelper.js')
const authHelperInstance=new AuthHelper();

module.exports=(app, passport)=>{
    app.use('/auth', router)
    
    router.post('/register', async (req, res, next) => {
        try{
            const data = req.body;
            console.log(data);
            const response = await authHelperInstance.register(data);
            res.status(200).send(response);

        }catch(err){
            //console.log(err);
            res.status(500).send(err)
        }
        
        
    });
    
    
}