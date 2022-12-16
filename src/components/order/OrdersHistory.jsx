import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useGetOrdersQuery } from '../../features/order/orderAPI';



const OrdersHistory = () => {


     const [serarch,setSearch]=useState('')
     const [category,setCategory]=useState('all')



     const categoryhandler=(e)=>{

        setCategory(e.target.value)
     }

     
    function debounce(func, timeout = 1500){
        let timer;
        return (...args) => {

          clearTimeout(timer);
          timer = setTimeout(() => {
           //  func.apply(this, args);

                           func(...args)
            }, timeout);

        };
      }
      function saveInput(e){

        setSearch(e)
         
      }
      
      const processChange = debounce(saveInput);
  

   const {data,isLoading,isError}=useGetOrdersQuery() ;

 
     const {orders}=data||{} ;

      if(isLoading){<h1 className='min-h-screen'>Loading............</h1>}
      if(!isLoading && isError){<h1>Error............</h1>}
       

  return (
    <>

<div className=" mt-0 pt-0 font-sans min-h-screen  ">
    <div className="container mx-auto ">
        <div className="">
            <div>
                <h2 className="text-2xl font-semibold leading-tight text-center">Users Order History</h2>
            </div>
            <div className="my-2 flex gap-2      sm:flex-row flex-col">
                <div className="flex flex-row mb-1 sm:mb-0">
     
                    <div className="px-4">
                        <select
                            onChange={categoryhandler}
                            className="appearanceNone h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearanceNone w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                            <option value="all">All</option>
                            <option value={true}>Paid</option>
                            <option value={false} >notPaid</option>
                        </select>
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className=" px-4">
                   

                    <input type='search' placeholder="search with ID"

                    onChange={e=>processChange(e.target.value)}
                        className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                </div>
            </div>

            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full  leading-normal">
                        <thead className=' overflow-hidden'>
                            <tr>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    order ID
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Date
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                     Total 
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Dellivery
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Paid
                                </th>
                            </tr>
                        </thead>

                        <tbody className='bg-red-300 h-[200px]   '>

                            {
                                // eslint-disable-next-line eqeqeq
                                orders?.filter(item=> !serarch ? item : item._id == serarch)
                                .filter(item=>{
                                    if(category === 'true'){
                                       
                                        return item.paid
                                    } if(category=== 'false' ){
                                       
                                        return !item.paid
                                    }else{
                                       
                                        return item
                                    }
                                })
                                
                                .map(list=>{

                                    const {_id,createdAt,total,delivered,paid }=list 
                               
                            return(
                                
                                <tr  key={_id}>

                              
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">

                                    <Link to={`/order/${_id}`}>
                                    {_id}
                                    </Link>
                                     
                                </td>  
                                
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                            
                                          {
                                           moment().format(createdAt)  
                                             
                                          }
                                        
                                        </p>
                                     
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        $ {total}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span
                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span className="relative">{delivered ? "Yes":"No"}</span>
                                    </span>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span
                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                            className={`absolute inset-0 ${paid?'bg-green-200':"bg-red-200"} opacity-50 rounded-full`}></span>
                                        <span className="relative">{paid?'Yes' :"No"}</span>
                                    </span>
                                </td>
                                </tr>
                                
                            )
    })
}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
</div>
    </>
  )
}

export default OrdersHistory