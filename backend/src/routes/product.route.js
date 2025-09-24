const express = require("express")
const router = express.Router();
const productController = require("../controllers/product.controller")




router.get("/products",productController.getallProducts);



module.exports=router;