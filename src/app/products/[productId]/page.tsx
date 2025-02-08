"use client";
import { useSingleProductQuery } from '@/Hooks/UseReactQuery/useReactQuery'
import React from 'react'

export default function ProductDetails({params}:{params:{productId:number}}) {

    const {data} = useSingleProductQuery(params.productId);
    console.log(data);

  return (
    <div>ProductDetails</div>
  )
}
