const bcrypt=require('bcrypt');
const saltRounds=10;

module.exports=class util{
    async passwordHash(password){
        try{
            const salt=await bcrypt.genSalt(saltRounds);
            return await bcrypt.hash(password, salt);
        }catch(err){
            console.log(err);
        }
        return null;
    };

    async comparePasswords(password, hash){
        try{
            const matchFound= await bcrypt.compare(password, hash);
            console.log(matchFound);
            return matchFound;
        }catch(err){
            console.log(err);
        }
        return false;
    }
}