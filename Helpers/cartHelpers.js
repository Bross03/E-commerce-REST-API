const dbQuery=require('./../dbQueries.js');
const pgp = require('pg-promise')({ capSQL: true });
const moment=require('moment');
const productHelper=require('./productHelper.js');
const productHelperInstance=new productHelper();
const util=require('./../util/util.js')
const utilInstance= new util();

module.exports=class cartHelper{
    
    async findCartById(user_id){
        const cart=await dbQuery("SELECT * FROM carts WHERE user_id=$1", [user_id]);
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
       // const id= await utilInstance.createNewId('cart');
        const timeNow=moment.utc().toISOString();
        const data={"user_id":user_id, 'id':user_id, 'created':timeNow, 'modified':timeNow };
        const query=pgp.helpers.insert(data, null, 'carts');
        const newProduct= await dbQuery(query);
        return newProduct;
    };

    async cartHasItem(product_id, user_id){
        console.log(product_id);
        const product = await dbQuery("SELECT id FROM cart_items WHERE product_id=$1 AND cart_id=$2",[product_id, user_id]);
        console.log('test ahhhh ' + product.rows?.length);
        if(product.rows?.length){
            console.log('eheeey');
            return product.rows[0].id;
        }else{
            console.log('hiya');
            return false;
        }
    }

    async addItemToCart(data, user_id){
        const {name,qty} =data;
        console.log(data);
        console.log('skjdsakjsabdkjash');
        const id = await utilInstance.createNewId('cart_items');
        console.log('id is '+id);
        const product_id=await productHelperInstance.getProductIdByName(name);
        console.log('product_id is '+product_id);
        const itemExists = await this.cartHasItem(product_id, user_id);
        console.log(itemExists);

        if(!itemExists){
            console.log("heeeey");
            const cart_item ={
                "id":id,
                "product_id":product_id,
                "cart_id":user_id,
                "qty": qty
            };
            
            console.log(cart_item);
            const timeNow=moment.utc().toISOString();
            const cartUpdate={
                "modified": timeNow
            };
            console.log(timeNow)
            console.log(cartUpdate);
            const condition=pgp.as.format("WHERE id = ${user_id};", {user_id});
            console.log(condition);
            const queryCart= pgp.helpers.update(cartUpdate,null,'carts')+ " " +condition;
            console.log(queryCart);
            await dbQuery(queryCart);
            const queryCartItems=pgp.helpers.insert(cart_item,null,'cart_items');
            const createdCartItem=await dbQuery(queryCartItems);
            console.log(createdCartItem);
            return createdCartItem;
        }else{
            console.log("xxxx");
            const result=await dbQuery("SELECT qty FROM cart_items WHERE id=$1;", [itemExists]);
            let qtyNew=result.rows[0].qty+parseInt(qty);
            console.log("quantity is "+qtyNew);
            console.log(itemExists);
            const condition = pgp.as.format("WHERE id = ${itemExists};", {itemExists});
            console.log(condition);
            const quantityUpdate={
                'qty':qtyNew
            };
            const query = pgp.helpers.update(quantityUpdate,null,'cart_items')+ " " +condition;
            console.log(query)
            const createdCartItem= await dbQuery(query);
            return createdCartItem;
        }
    };
}
