/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
 
import 'react-phone-number-input/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { emtyCart } from '../../features/cart/cartSlice';
import { useCreateOrderMutation } from '../../features/order/orderAPI';

import useAuth from '../../hooks/useAuth';
import CartItem from './CartItem';
 
const Cart = () => {

    const [total,settotal]=useState(0) ;
    const [value,setValue]=useState() ; 
    const [address,setAddress]=useState('')

     const [createOrder,{isSuccess ,data}]=useCreateOrderMutation()


    const auth=useAuth() 
    const dispatch= useDispatch()

    

    const navigate=useNavigate()

    const {cart}=useSelector(state=>state?.cart) || {}   ;


    //  set Total tk 
    useEffect(()=>{

        let getTotal=()=>{
         
          const res= cart?.reduce((prev,item)=>{
     
             let total= prev + ( item.price * item.quantity );
     
             return total
     
     
         },0)
     
         settotal(res) ;
     
     
        }
     
     
        getTotal()
     
     
     
     },[cart])
       

      // page navigate 

       useEffect(() => {

               if(isSuccess){
                 navigate(`/order/${data?.order?._id}`)
               }
          
       }, [data?.order?._id, isSuccess, navigate])
       

    // orderHander


     if(cart.length===0 ){
       return <h1 className='text-center text-2xl p-6 h-screen'>Emty Cart </h1>
     }


    const orderHandler=(e)=>{
            e.preventDefault()

             
               if(auth){
                  
            if(value && address && cart.length >0){


              
              createOrder({
                mobile:value,
                 address,
                 cart,
                 total
              })

               localStorage.removeItem("_my_Cart")
                dispatch(
                  emtyCart()
                )   
        }else{
             return toast("Wrong")
        }
               }else{
                return navigate('/login')
               }
 
    }
      

    return( <>
                       <div className="bg-gray-100     ">
                      <div className="mx-auto     ">
                        <div className="flex flex-col md:flex-row shadow-md   ">
                    
                          <div className="md:w-3/4 w-full bg-white px-2 md:px-10 py-10">
                    
                            <div className="flex justify-between border-b pb-8">
                              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                              <h2 className="font-semibold text-2xl"> {cart.length} {cart.length === 1 ? "ITEM":"ITEMS"} </h2>
                            </div>
                    
                            <div className="flex mt-10 mb-5">
                              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/4">Clik to Img</h3>
                              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/4  ">Quantity</h3>
                              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/4  ">Price</h3>
                              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/4  ">Each item total</h3>
                            </div>
                    
                    
                            {/* there will be set cart  */}
                    
                             { cart.map(item=> <CartItem item={item}  key={item._id} />)}
                     
                    
                            <Link to="/" className="flex font-semibold text-indigo-600 text-sm mt-10">
                          
                              <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
                              Continue Shopping
                            </Link>
                          </div>
                    
                          <form onSubmit={orderHandler} autoComplete='on' id="summary" className="md:w-1/4 w-full px-8 py-10">
                            <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                            <div className="flex justify-between mt-10 mb-5">
                              <span className="font-semibold text-sm uppercase">Items{cart.length}</span>
                               
                            </div>
                            <div>
                              <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                               
                            <PhoneInput  
                    
                               
                              autoComplete='on'
                              international
                              defaultCountry="BD"
                              placeholder="Enter phone number"
                        //   error={ value && formatPhoneNumberIntl(value)}
                          value={value}
                          onChange={setValue}
                          
                          />  
                    
                    
                    
                    
                            </div>
                            <div className="py-10">
                              <label  className="font-semibold inline-block mb-3 text-sm uppercase">Address</label>
                              <input  autoComplete='on' onChange={(e)=>setAddress(e.target.value)} value={address} type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
                            </div>
                            {/* <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button> */}
                            <div className="border-t md:mt-8">
                              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Total cost</span>
                                <span>${total}</span>
                              </div>
                              <button  type='submit' className="bg-green-500 font-semibold hover:bg-green-600 py-3 text-sm text-white uppercase w-full">Order Now !</button>
                            </div>
                          </form>
                    
                        </div>
                      </div>
                       </div>
                    
                      
                      </>
                      
       
          )

  
}

export default Cart