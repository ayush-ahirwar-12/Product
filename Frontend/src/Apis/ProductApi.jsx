import { axiosInstance } from "../config/AxiosInstace"




export const fetchallProducts = async()=>{
    try {
        let response = await axiosInstance.get("/products");
        if(response){
            return response;
        }
    } catch (error) {
        console.log("error in fetching products",error);
            
    }
};