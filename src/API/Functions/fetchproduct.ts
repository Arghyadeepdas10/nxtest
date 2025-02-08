import { axiosInstance } from "../axiosInstance/axiosinstance";
import { endpoints } from "../endpoints/endpoints";

export const fetchProduct = async()=>{
    try {

        const {data} =  await axiosInstance.get(endpoints.product);
        return data;
        
    } catch (error) {
        console.log(error);
    }
}