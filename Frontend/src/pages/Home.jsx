import React from 'react'
import { fetchallProducts } from '../Apis/ProductApi'
import { useEffect } from 'react'
import { useState } from 'react'
import ProductCard from '../components/ProductCard'

const Home = () => {
    const [allProducts, setallProducts] = useState(null)
    let getallproducts = async()=>{
        try {
            let response = await fetchallProducts();
            if(response){
                // console.log("res-->",response);
                setallProducts(response.data.products);
            }
        } catch (error) {
            console.log("error while fetching products",error);
            
        }
    }
    useEffect(()=>{
        getallproducts();
    },[])
  return (
     <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts?.map((product) => (
          <ProductCard  
            key={product?._id || product?.title}
            id={product?._id}
            title={product?.title}
            price={product?.price}
            images={product?.images}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
