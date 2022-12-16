import React, { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
 
import { toast } from "react-toastify";
import { useGetSingleOrderQuery, useUpdateOrderMutation } from '../../features/order/orderAPI';
import ProductLooding from "../ui/ProductLooding";
import PayPal from './PayPal';

  const Order = () => {
    
     
     const {id}=useParams() ;
     const [updateOrder,{data:updatedData,isLoading,isSuccess}]=useUpdateOrderMutation();
     const {data,isLoading:isLoadingForGetOrder}=useGetSingleOrderQuery(id);
      
     const user=useSelector(state=>state.auth.user)

        const{order}= data || {} ;

     useEffect(()=>{
   
         if(isSuccess){
           toast(updatedData.msg)
         }
     },[isSuccess, updatedData?.msg])

    
          const AdminDeliveredHandler = useCallback( async()=>{
                     if(user.role ==='admin'){
                      updateOrder({id,data:{delivered:true, paid:true,method:"Hand_Cash/Mobile_Banking",paymentOfDate:new Date().toISOString()}})
                     }else{
                      toast("Authorization failed!")
                     }
       
                    },[id, updateOrder, user.role])
     


    const transitionSuccess=async(paymentId)=>{

      
    if(user.role ==='user'){

      updateOrder({id:order?._id,data:{delivered:true, paid:true,method:"Paypal",
      paymentId,
      paymentOfDate:new Date().toISOString()}})
     }else{
      toast("Authorization failed!")
     }
    }
  
  
        
  return (
           <>

           
           <div    className="bg-[#E6E6E6] md:p-4 p-2 h-screen">



{
  isLoadingForGetOrder &&  <><ProductLooding/>
  <ProductLooding/></>
}
{
  order && 
  <div className="container mx-auto  bg-white  border-b-4 border-green-500 shadow-lg   "> 
   


     <div className='  '>
      
  <button className='bg-green-800   rounded text-sm text-white px-2  md:px-4 p-1 md:py-2 m-4' onClick={window.print}>Print Invoice</button>
  <h1 className=' col-span-10 text-2xl   md:text-5xl md:p-4 font-light text-[#b9b8b8] text-center'> {order?.paid? "  Pay Slip":"Order Details"} </h1>
     </div>

  
     <div className='flex  flex-col md:flex-row    '>


         <div className={`${user?.role=== 'admin' || order?.paid ? 'w-4/4' :'md:w-2/4'}  w-full  px-2 md:px-10 py-10`}>   


                             {/* *************table  */}
                             
                            
           <table className="w-full">
           

            <tbody>

            
               
               
               <tr className="bg-green-100 hover:bg-green-300">
                   <td className="p-1 text-sm md:text-lg     text-black font-medium  ">Name</td>
                   <td className="p-1 text-center   text-gray-700 capitalize  font-light  ">{order?.user?.name}</td> 
               </tr>

               <tr className="text-left hover:bg-green-300">
                   <td className="p-1 text-sm md:text-lg  text-black font-medium ">Email</td>
                   <td className="p-1 text-center  text-gray-700 capitalize font-light ">{order?.user?.email}</td> 
               </tr>
               <tr className="bg-green-100 hover:bg-green-300">
                   <td className="p-1 text-sm md:text-lg    text-black font-medium ">Address </td>
                   <td className="p-1 text-center  text-gray-700  capitalize font-light ">{order?.address}</td> 
               </tr>

               <tr className="text-left hover:bg-green-300">
                   <td className="p-1 text-sm md:text-lg   text-black font-medium ">Phone </td>
                   <td className="p-1 text-center  text-gray-700 capitalize  font-light">{order?.mobile}</td> 
               </tr>


               <tr className="bg-green-100 ">
                   <td className="p-1 text-sm md:text-lg  text-black font-medium "> Delivery </td>
                   {
                     !order?.paid && user.role === 'admin' ? <td className='p-1 text-center  text-gray-700 capitalize '>
                       <button disabled={isLoading}  onClick={AdminDeliveredHandler} type="button" className="inline-block px-6 py-2 border-2 border-green-500 text-purple-500 font-medium text-xs leading-tight capitalize rounded bg-purple-100 hover:bg-purple-200 hover:bg-opacity-3 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Mark as Delivered!</button>
                       </td>
                                             : <td className="p-1 text-center font-light text-gray-700 capitalize ">{order?.delivered ? "YES" :"NO"}</td> 
                   }
               </tr>
               {
                 order?.paid && <>
                    <tr className="text-left hover:bg-green-300">
                 <td className="p-1 text-sm md:text-lg   text-black font-medium ">Method </td>
                 <td className="p-1 text-center  text-gray-700 capitalize font-light ">{order?.method}</td> 
                     </tr>

                     {
                       order?.paymentId&&
                    
                     <tr className="text-left  bg-green-100">
                     <td className="p-1 text-sm md:text-lg   text-black font-medium ">PaymentID </td>
                     <td className="p-1 text-center  text-gray-700 capitalize font-light ">{order?.paymentId}</td> 
                      </tr>
                      }
                 </>
               }
               

               <tr className={`text-left  ${!order?.paymentId? 'bg-green-100 ':'hover:bg-green-300' } `}>
                   <td className="p-1 text-sm md:text-lg   text-black font-medium "> Payment </td>
                   <td className="p-1 text-center  text-gray-700 capitalize font-light ">{order?.paid ?   order?.paymentOfDate :"NO"}</td> 
               </tr>
              </tbody>
           </table>




      
      {order?.cart?.map((item,index)=>{

             return(
                 <div key={index} className='w-full flex  flex-col md:flex-row   mt-4   gap-2  wrap justify-center md:justify-between items-center'>
                     <Link to={`/products/${item._id}`}  className='  hover:shadow-4xl shadow-lg border- border-b    ' >
                     <img key={order._id}  className="w-60  " src={item.images[0]?.url} alt="Img"/>
                     </Link> 

                        <Link to={`/products/${item._id}`} className=' capitalize  ' >{item.title}</Link>

                         <h2 className='font-medium  '>{item.quantity} X {item.price} = {item.quantity*item.price} $ </h2>
                 </div>
             )

      } )} 
       
              
{/* *************table  */}
         
         </div> 

         {/* Deatail part  */}
        {
          !order?.paid  && user?.role !== 'admin' && 
             <div className="md:w-2/4 w-full">  

           <PayPal  transitionSuccess={transitionSuccess}  order={order}/>

             </div>
        }

     </div>

  </div>
}

         </div>

 
           </>
   
  )
}


export default memo(Order)