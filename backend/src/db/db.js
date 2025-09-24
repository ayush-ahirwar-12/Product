const mongoose = require("mongoose")
async function connectDb(){    
    try {
        await mongoose.connect(process.env.MONGOOSE_URI).then(()=>{
            console.log("database connected");
            
        })
    } catch (error) {
        console.log(error);
        
    }
}

module.exports=connectDb;