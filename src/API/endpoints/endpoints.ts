export const baseURL = "https://newproducts.onrender.com";

export const endpoints = {
    product: "/products",
    getsingle: (id:number)=>`/products/${id}`,
}