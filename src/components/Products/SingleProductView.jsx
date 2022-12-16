import { BackwardIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addCart } from '../../features/cart/cartSlice';
import { useGetProdutQuery } from '../../features/products/productApi';
  const SingleProductView = () => {
    
     const {id}=useParams() ;

      const {data}=useGetProdutQuery(id)

      const [index,setIndex]=useState(0) 


      const {cart}=useSelector(state=>state.cart) ;
     

      const dispatch=useDispatch()
      const { price,sold ,title, description ,content ,images,inStock ,_id}=data?.product  || {} ;


      const navigate= useNavigate()
       


      const addToCartHandler=()=>{



               const isExist= cart.find(item=>item._id=== _id)

                
               if(isExist){
                toast("This Products is already Added in Cart !")
               }
             
               else{
                dispatch(
                    addCart([...cart,data?.product])
                   )

                   localStorage.setItem("_my_Cart",JSON.stringify([...cart,data?.product]))
               }

      }
    


     
     


  return (


         <div className="bg-grary-100 min-h-screen">
         

           <div className="container mx-auto"> 

{/*  back btn & add to cart */} 
       
<div className="flex justify-between w-full   items-center ">

            
<div className="flex justify-between    items-center">

<button onClick={()=>navigate(-1)}  className=' rounded text-1xl text-white bg-green-400  px-4 py-1 m-4'>
<BackwardIcon className='inline w-6    '/>  Back</button>


 </div>

            
<div className="flex justify-between    items-center">

<button onClick={addToCartHandler}  className=' rounded text-1xl text-white bg-green-400  px-4 py-1 m-4'>
<ShoppingCartIcon className='inline w-6    '/>  Add to Cart</button>


 </div>

</div>
{/*  back btn & add to cart */} 
              <div className='flex flex-col md:flex-row shadow-md'>


                    {/*  img part  */}
                  <div className="md:w-1/4   w-full bg-white  px-10 py-10">   


                  <img  src={images&&images[index]?.url} alt="Img"/>


                  <div className='flex space-x-2 justify-center mt-2  '>

                    {
                      images?.map((img,indx)=><img  className={` ${indx===index &&'border-2 border-green-400'}`} onClick={()=>setIndex(indx)} width="100px"  key={indx} src={img.url} alt="Img"/>)
                    }

                  </div>
                  
                  </div> 

                  {/* Deatail part  */}
                  <div className="md:w-3/4 w-full px-8 py-10">  

          <div className="flex items-center justify-between border-b   pb-8">
          <h1 className="font-semibold text-sm md:text-2xl"> Product Details </h1>
           
        </div>

                   


        <div className="flex items-center  mt-10 mb-5">
          <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5">Title</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5  ">Content</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5  ">sold</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5  ">InStock</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5  ">Price</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-2/5  p-2 bg-gray-200 ">Description</h3>
        </div>



        <div className="flex items-center  mt-10 mb-5">
        <h3 className="font-semibold text-gray-600 text-xs capitalize  w-1/5">{title}</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs capitalize w-1/5  ">{content}</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs capitalize w-1/5  ">{sold}</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs capitalize w-1/5  ">{inStock}</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs capitalize w-1/5  ">$ {price}</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs capitalize w-2/5 p-2  bg-gray-100 ">{description}</h3>
        </div>

  
         
        
                  
                  </div>

              </div>
    
           </div>
         </div>
   
  )
}


export default SingleProductView