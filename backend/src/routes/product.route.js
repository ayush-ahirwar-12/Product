const express = require("express")
const router = express.Router();
const productController = require("../controllers/product.controller")
const multer = require("multer")



// const upload




router.get("/products",productController.getallProducts);
router.get("/product-details/:id",productController.getProductDetails)
router.post("/create-product",productController.createProduct)



module.exports=router;