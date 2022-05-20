const dbQuery=require('./../dbQueries.js');
const pgp = require('pg-promise')({ capSQL: true });
const moment=require('moment');
const util=require('./../util/util.js');
const utilInstance=new util();

module.exports=class orderHelper{
    async createOrder(total,user_id){
        try{
         
            const newOrderId=await utilInstance.createNewId('orders');
          
            const timeNow=moment.utc().toISOString();
            const data={
                "user_id": user_id.toString(),
                "id": newOrderId.toString(),
                "status":'Submitted',
                "total":total.toString(),
                "created": timeNow,
                "modified":timeNow
            };
            
            const query=pgp.helpers.insert(data,null,'orders');
            
            await dbQuery(query);
            const newOrder=await dbQuery('SELECT * FROM orders WHERE id=$1',[newOrderId]);
          
            
            await this.createOrderItems(user_id,newOrderId.toString());
         
            return newOrder.rows?.length;

        }catch(err){
            console.log(err);
            return err;
        }
    };
    async createOrderItems(user_id, order_id){
        let id;
        let qty;
        let product_id;
        let data={}
        const statement='SELECT * FROM cart_items WHERE cart_id=$1;'
        const value=user_id;
        const cartItems=await dbQuery(statement,[value]);
        if(cartItems.rows?.length){
            
            for(let i=0;i<cartItems.rows.length;i++){
                
                id=await utilInstance.createNewId('order_items');
                qty=cartItems.rows[i].qty;
                product_id=cartItems.rows[i].product_id;
                data={
                    "id":id.toString(),
                    "order_id":order_id,
                    "qty":qty,
                    "product_id":product_id
                };
                const query=pgp.helpers.insert(data,null,'order_items');
             
                await dbQuery(query);
            }
            return null;
        }
    };
    async deleteCartAndCartItems(user_id){
        const queryCart=`DELETE FROM carts WHERE user_id=$1;`;
        const queryCartItems=`DELETE FROM cart_items WHERE cart_id=$1;`;

        await dbQuery(queryCartItems,[user_id]);
        await dbQuery(queryCart,[user_id]);
        
        return null;
    }
}