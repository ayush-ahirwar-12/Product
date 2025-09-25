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

export const getProductDet = async(id)=>{
    try {
        let response = await axiosInstance.get(`/product-details/${id}`)
            console.log(response);

        if(response){
            return response.data.product;
            
        }
    } catch (error) {
        console.log("error in fetching product details",error);
        
    }
}


export const createProduct = async (data) => {
  try {
    let response = await axiosInstance.post("/create-product", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response) {
      console.log(response);
    }
  } catch (error) {
    console.log("error in creating products..", error);
  }
};