const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");



async function authUser(req,res,next){
    let token = req.cookies.token;
    try {
        if(!token){
            res.status(401).json({
                message:"Unauthorised!,Token not found"
            })
        }
        const decode = jwt.verify(token,process.env.TOKEN_KEY)
        const user = await userModel.findById(decode.id);
        if(!user){res.status(404).json({message:"user not found"})}
        req.user = user;
        next();
    
    } catch (error) {
        console.log("error in auth middleware error-->",error);
        
    }


}


async function authSeller(req,res,next){
    let token = req.cookies.token;
    if(!token){
        res.status(401).json({message:"token not found"})
    }
    try {
        let decoded = jwt.verify(token,process.env.TOKEN_KEY)
        let user = await userModel.findById(decoded.id)
        if(!user){res.status(404).json({message:"user not found"})}
        req.user = user;
        next();
    } catch (error) {
        console.log("error",error);
        
    }
}

module.exports={authUser , authSeller};