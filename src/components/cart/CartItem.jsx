import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { decreaseQuantity, increaseQuantity, removeToCart } from '../../features/cart/cartSlice'

const CartItem = ({item}) => { 



    // setIndivisualTotal(prev=>prev+(item.price * item.quantity)) 

    const [indivisualTotal,setIndivisualTotal]=useState(0)

    useEffect(()=>{
      setIndivisualTotal(item.price * item.quantity)
    },[item.price, item.quantity, setIndivisualTotal])
    
  const dispatch=useDispatch()
  const removeCartItem=()=>{


    dispatch(
        removeToCart(item._id)
    )
}

// increaseHandler

const increaseHandler=( )=>{

           dispatch(increaseQuantity(item._id)) ; 

                   
}

// decreaseQuantity

const decreaseHandler=( )=>{

    dispatch(
        decreaseQuantity(item._id)
    )
}


  return (
    <>
   

               
           <div   className="flex items-center hover:bg-gray-100 ">
          <div className="flex justify-center w-1/4  text-center">  
            <Link to={`/products/${item._id}`} className="relative w-full ">
              <img title='wanna View?' className="h-24 object-cover" src={item.images[0].url} alt="" />

              <button onClick={removeCartItem}  className="font-semibold  text-white  absolute -top-4 -right-3  text-center   bg-red-600 rounded-full p-1 m-1 text-xs">X</button>
            </Link>
            {/* <div className="flex bg-red-400 justify-between items-center  flex-grow">
              <span className="  hidden md:block font-bold text-sm">{item.title}</span>
              {/* <span className="text-red-500 text-xs">{item.category}</span> */}
              {/* <button onClick={removeCartItem}  className="font-semibold  text-center hover:text-red-500 text-gray-500 text-xs">X</button> */}
            {/* </div> */} 
          </div>
          <div className="flex justify-center w-1/4">

             <button disabled={item.quantity===1} onClick={decreaseHandler}>
             <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
             </button>
           

             <p className="mx-2 border text-center w-8"> {item?.quantity ? item.quantity:1} </p>

            <button  disabled={item.inStock === item.quantity} onClick={increaseHandler}>
            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
            </button>
          </div>

          <span className="text-center w-1/4 font-semibold text-sm">${item.price}.00</span>
          <span className="text-center w-1/4 font-semibold text-sm">${indivisualTotal}.00</span>
           </div>
              
         
 
      
    </>
  )
}

export default CartItem