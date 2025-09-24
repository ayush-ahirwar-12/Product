import { axiosInstance } from "../config/AxiosInstace"

export const RegisterSeller = async()=>{
    try {
        let res = await axiosInstance.patch("/auth/seller/register")
        if(res){
            return res.data.seller
        }
    } catch (error) {
        console.log("error in seller registration",error);
        
    }
}