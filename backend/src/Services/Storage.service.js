const Imagekit = require("imagekit")
const { v4: uuidv4 } = require('uuid');

const imagekit = new Imagekit({
    publicKey:process.env.PUBLIC_KEY,
    privateKey:process.env.PRIVATE_KEY,
    urlEndpoint:process.env.URL_ENDPOINT
})



async function uploadFile(fileBuffer){
    const result = await imagekit.upload({
        file:fileBuffer,
        fileName:uuidv4(),
        folder:"Products_app"
    })
    return result;
}


module.exports={uploadFile};