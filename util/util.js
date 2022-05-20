const bcrypt=require('bcrypt');
const saltRounds=10;
const dbQuery=require('./../dbQueries.js');

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
    };
    // async createNewCartId(){

    //     const largestId=await dbQuery("SELECT MAX(id) FROM carts;");
    //     const newCartId = largestId.rows[0].max + 1;
    //     console.log(newCartId);
    //     const newCartIdString= newCartId.toString();
    //     return newCartIdString;
    // };
    async createNewId(table){
        const statement=`SELECT id FROM ${table} WHERE id=$1;`;
        let idToTry=1;
        let foundId= await dbQuery(statement,[idToTry]);
        console.log(foundId.rows[0]?.id);
        
        while(foundId.rows[0]?.id){
            idToTry++;
            foundId=await dbQuery(statement,[idToTry]);
        }
        // console.log("id to try is "+ idToTry);
        // console.log("found id is "+ foundId.rows[0]?.id);
        
        return idToTry;
    };
}