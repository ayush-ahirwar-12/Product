const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
     description: {
        type: String,
        required: true
    },
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: "INR",
            enum: [ "INR", "USD" ]
        }
    },
    images: [ {
        type: String
    } ],
    
    stock: { type: Number, default: 0 },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
})

const productModel = mongoose.model("product",productSchema);

module.exports = productModel;
