import { axiosInstance } from "../config/AxiosInstace"

export const RegisterUser = async(data)=>{
   try {
     let NewUser = await axiosInstance.post("/auth/user/register",data)
    if(NewUser){
        console.log("user Created");
        return NewUser.data.user;
        
    }
   } catch (error) {
    console.log("error in user registration",error);
    
   }

}

export const Logoutuser = async()=>{
  try {
    const res = await axiosInstance.get("/auth/user/logout")
    console.log("user logged out successfully");
    
    if(res){
    return res.data.message;
    }
  } catch (error) {
    console.log("error in userlogout",error);
    
  }
}


export const LoginUser = async(data)=>{
  try {
    let res = await axiosInstance.post("/auth/user/login",data)
    if(res){
      console.log("user logged in succesfully");
      return res.data;
      
    }
  } catch (error) {
    console.log("error in user logg in",error);
    
  }
}