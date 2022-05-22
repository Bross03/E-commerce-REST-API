const dbQuery=require('./../dbQueries.js');
const pgp = require('pg-promise')({ capSQL: true });
const util=require('./../util/util.js');
const utilInstance=new util();

module.exports=class productHelper{
    async findProductById(id){
        const product= await dbQuery("SELECT * FROM products WHERE id=$1", [id]);
        if(product.rows?.length){
            return product.rows[0];
        }
        return null;
    };
    async getProductIdByName(name){
        const productId= await dbQuery("SELECT id FROM products WHERE name=$1", [name])
        if(productId.rows?.length){
            return productId.rows[0].id;
        }
        return null;
    };
    async getAllProducts(){
        const products=await dbQuery("SELECT * FROM products");
        return products.rows;
    };

    async createProduct(data){
        const newId = await utilInstance.createNewId('products');
        console.log(newId);
        const stringNewId=newId.toString();
        console.log(stringNewId);
        data={...data, 'id': stringNewId};
        const query=pgp.helpers.insert(data, null, 'products');
        console.log(query);
        const newProduct= await dbQuery(query);
        return newProduct;
    };


    async updateProduct(id, data){
        try{
        const condition= pgp.as.format("WHERE id = ${id};", {id});
        const query= pgp.helpers.update(data,null,'products')+ " " +condition;

        const updatedProduct=await dbQuery(query);
        return updatedProduct;

        }catch(err){
            console.log(err);
            return err;
        }
    };
    async getPriceById(id){
        try{
            const statement=`SELECT price FROM products WHERE id=$1`;
            const price=await dbQuery(statement,[id]);
            if(price.rows?.length){
               
                const intPrice=parseInt(price.rows[0].price);

                return intPrice;
            }else{
                return null;
            }
        }catch(err){
            console.log(err);
            return err;
        }
    }
}