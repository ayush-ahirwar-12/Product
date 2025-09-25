const productModel = require("../models/product.model");
const storageService = require("../Services/Storage.service")

// async function getallProducts(req,res){}



async function getallProducts(req,res){
    const products = await productModel.find();
    // console.log(products);
    res.status(200).json({
        products
    })
    
}


async function getProductDetails(req,res){
    try {
            const productId = req.params.id;
    const product = await productModel.findOne({
        _id:productId
    });

    if(!product){
        res.status(404).json({
            message:"product not found"
        })
    }

    res.status(200).json({
        message:"product details fetched",
        product
    })
    } catch (error) {
        console.log("error in fetching details-->",error);
        
    }
}


async function createProduct(req,res){
    try {
    const {title,description,price,images,stock } = req.body ; 
    const files = await Promise.all(req.files.map(async function(file){
        return await storageService.uploadFile(file.buffer)
    }))
    const seller = req.seller;
    const realPrice = price;
    const product = await productModel.create({
        title:title,
        description:description,
        images:files.map((file)=>file.url),
        price:{
            amount:realPrice.amount,
            currency:realPrice.currency
        },
        seller:seller._id,
        stock:parseInt(stock)

    })
    return res.status(201).json({
    message: "product created successfully",
    product,
  });
    } catch (error) {
        console.log("error in createProduct controller",error);
        
        res.status(400).json({
            message:"error in product creation"
        })
    }
}




module.exports={getallProducts,getProductDetails,createProduct}