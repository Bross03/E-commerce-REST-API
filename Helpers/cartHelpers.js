const dbQuery=require('./../dbQueries.js');
const pgp = require('pg-promise')({ capSQL: true });
const moment=require('moment');

module.exports=class cartHelper{
    
    async findCartById(user_id){
        const cart=await dbQuery("SELECT * FROM carts WHERE user_id=$1", [user_id])
        if(cart.rows?.length){
            return cart.rows[0];
        }
        return null;
    };
    async createCart(userId){
        const cart= await this.findCartById(userId);
        if(cart){
            return null;
        }
        const user_id = userId.toString();
        const id= await this.createNewCartId();
        const timeNow=moment.utc().toISOString();
        const data={"user_id":user_id, 'id':id, 'created':timeNow, 'modified':timeNow };
        const query=pgp.helpers.insert(data, null, 'carts');
        const newProduct= await dbQuery(query);
        return newProduct;
    };

    async createNewCartId(){

        const largestId=await dbQuery("SELECT MAX(id) FROM carts;");
        const newCartId = largestId.rows[0].max + 1;
        console.log(newCartId);
        const newCartIdString= newCartId.toString();
        return newCartIdString;
    };
}
