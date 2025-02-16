"use client"
import { useSingleProductQuery } from '@/Hooks/UseReactQuery/useReactQuery'
import Loader from '@/UI/Loader';
import Image from 'next/image';
import React from 'react'

export default function ProductDetails({ params }: { params: { productID: number } }) {

    const {productID} = params;
    const {data, isLoading, isFetching} = useSingleProductQuery(productID);
    console.log(data);

    if(isLoading){
        return <h1><Loader/></h1>
    }

    if(isFetching){
        return <h1><Loader/></h1>
    }

  return (
    <>
    <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl text-white text-center mb-6">Product Details</h1>
        <div className="flex flex-col items-center justify-center gap-8">
            <div><Image src={data.image} className="h-80 w-full object-contain" alt="Product" /></div>
            <div className="text-center">
                <p className="text-2xl text-red-400 mb-2">Title: {data.title}</p>
                <p className="text-2xl text-yellow-400 mb-2">Price: Rs.{data.price}</p>
                <p className="text-2xl text-green-500">Description: {data.description}</p>
            </div>
        </div>
    </div>
    </>
  )
}
