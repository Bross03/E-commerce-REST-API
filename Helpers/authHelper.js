const bcrypt=require('bcrypt');
const res = require('express/lib/response');
const userHelper=require('./userHelper.js');
const userHelperInstance= new userHelper();

module.exports= class AuthHelpers{
    async register(data){
        const {email}=data;
        try{
            const user=await userHelperInstance.findUserByEmail(email);
            if(user){
               throw new Error('email already in use');
            }
            const newUser= await userHelperInstance.createUser(data);
            return newUser;
        }catch(err){
            return err;
        }
    };

    async passwordHash(password, saltRounds){
        try{
            const salt=await bcrypt.genSalt(saltRounds);
            return await bcrypt.hash(password, salt);
        }catch(err){
            console.log(err);
        }
        return null;
    }
}