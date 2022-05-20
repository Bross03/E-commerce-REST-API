
const express=require('express');
const router=express.Router();
const productHelper=require('./../Helpers/productHelper.js');
const productHelperInstance= new productHelper();

module.exports=(app)=>{
    app.use('/products', router)
    
    router.get('/',async (req,res,next)=>{
        console.log(req.session.passport);
        const products= await productHelperInstance.getAllProducts()
        res.send(products);
    });
    router.get('/:productid', async (req,res,next)=>{
        const product=await productHelperInstance.findProductById(req.params.productid);
        if(product){
            res.send(product);
        }
        else{
        res.status(500).send('Product does not exist');
        }
    });
    router.post('/', async (req,res,next)=>{
        try{
            const data = req.body;
            console.log(data);
            const response = await productHelperInstance.createProduct(data);
            console.log(response);
            res.status(200).send(response);

        }catch(err){
            res.status(500).send(err);
        }
    });
    router.put('/:productid', async (req,res,next)=>{
        try{
        const result= await productHelperInstance.updateProduct(req.params.productid, req.body);
        res.status(200).send(result);
        }catch(err){
            res.status(500).send(err)
        }
    })
    
}