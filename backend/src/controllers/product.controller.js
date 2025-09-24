const productModel = require("../models/product.model");

// async function getallProducts(req,res){}



async function getallProducts(req,res){
    const products = await productModel.find();
    // console.log(products);
    res.status(200).json({
        products
    })
    
}
module.exports={getallProducts}