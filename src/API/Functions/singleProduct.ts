import { axiosInstance } from "../axiosInstance/axiosinstance";
import { endpoints } from "../endpoints/endpoints";

export const singleProduct = async(id:number)=>{
    try {

        const {data} = await axiosInstance.get(endpoints.getsingle(id));
        return data;
        
    } catch (error) {
        console.log(error);
    }
}