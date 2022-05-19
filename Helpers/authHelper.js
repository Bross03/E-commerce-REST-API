
const res = require('express/lib/response');
const userHelper=require('./userHelper.js');
const userHelperInstance= new userHelper();

const password=require('./../util/util.js')
const passwordHandler= new password();

module.exports= class AuthHelpers{
    async register(data){
        const {email}=data;
        data.password=await passwordHandler.passwordHash(data.password);
        console.log(data.password);
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

    async login(data){
        const {email,password}=data;

        try{
            const user=await userHelperInstance.findUserByEmail(email);
            
            if(!user){
                return false;
            }
            if(!passwordHandler.comparePasswords(password, user.password)){
                return false;
            }
            return user;
        }catch(err){
            return err;
        }
    };

 
}