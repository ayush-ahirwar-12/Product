import axios from "axios";
import { setError } from "../features/errorSlice";
import { Store } from "../Store/Store";


export const axiosInstance = axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMsg = error.response?.data?.message;
    Store.dispatch(setError(errorMsg));
    return Promise.reject(error);
  }
);