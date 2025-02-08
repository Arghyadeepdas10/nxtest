import { fetchProduct } from "@/API/Functions/fetchproduct";
import { singleProduct } from "@/API/Functions/singleProduct";
import  { useQuery } from "@tanstack/react-query";

export const useFetchReactQuery = ()=>{
    return useQuery({
        queryKey:['products'],
        queryFn: fetchProduct,
    }
)
}

export const useSingleProductQuery = (id:number)=>{
    return useQuery({
        queryKey:['singleproduct',id],
        queryFn: ()=> singleProduct(id)
    })
}