"use client";
import { useFetchReactQuery } from '@/Hooks/UseReactQuery/useReactQuery';
import Loader from '@/UI/Loader';
import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Pagination, Select, SelectChangeEvent, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react'

interface Product{
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}
export default function Products() {

    const [page, setPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); 
    const [selectcategory, setSelectcategory] = useState('');
    const {data, isLoading, isFetching} = useFetchReactQuery();
    
    useEffect(()=>{
        if(data){
            setPage(1);
        }
    },[data,selectcategory])

    const handlepagechange = (_:unknown,value:number)=>{
        setPage(value);
    }

    const handleClickOpen = (item:Product) => {
        setSelectedProduct(item);
      };
    
      const handleClose = () => {
        setSelectedProduct(null);
      };

    if(isLoading){
        return <Loader/>
    }

    if(isFetching){
        return <Loader/>
    }

    const filtereddata = selectcategory ? data?.filter((item:Product)=>item.category === selectcategory) : data;

    const paginatedData = filtereddata?.slice((page-1)*8,page*8);

    const renderlist = paginatedData?.map((item:Product)=>{
        return(
            <div key={item.id} className='flex flex-col items-center justify-center p-4 m-4 shadow-md shadow-blue-500/50 cursor-pointer' 
            onClick={()=>handleClickOpen(item)}>
                <img src={item.image} className='w-56 h-56 object-contain'/>
                <h1>Title:- {item.title}</h1>
                <h2>Price:- ${item.price}</h2>
                <h3>Category:- {item.category}</h3>
            </div>
        )
    })

  return (
    <div>
        <h1 className='text-red-500 text-6xl text-center'>Products List</h1> <br />
        <h2 className='text-blue-500 text-xl text-center'>Category:- 
            <Select onChange={(e:SelectChangeEvent)=>setSelectcategory(e.target.value)} value={selectcategory} className='mx-3 bg-white shadow-md shadow-blue-500/50 w-36' displayEmpty>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Computer">Computer</MenuItem>
                <MenuItem value="Smart watch">Smart watch</MenuItem>
            </Select> 
        </h2>
        
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4'>
            {renderlist}
        </div>
        { filtereddata.length> 0 &&
        <div className='flex justify-center items-center m-3 text-white'>
            <Pagination count={Math.ceil(filtereddata.length/8)} onChange={handlepagechange} color='primary'/>
        </div>
        }
        {selectedProduct && (
            <Dialog
              open={!!selectedProduct}
              onClose={handleClose}
              maxWidth="sm"
              fullWidth>
                <DialogTitle>{selectedProduct.title}</DialogTitle>
                <DialogContent>
                    <img src={selectedProduct.image} className='w-48 h-48 object-contain' />
                    <Typography variant="h6" color="text.primary">
                    <b>Product Details:</b>
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                    {selectedProduct.description}
                    </Typography>
                    <Typography variant="h6" color="text.primary">
                    <b>Price: Rs.{selectedProduct.price}</b>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    <b>Category: {selectedProduct.category}</b>
                    </Typography>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
)}
    </div>
  )
}
