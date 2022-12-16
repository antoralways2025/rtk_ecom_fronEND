import { ArrowsRightLeftIcon, CheckIcon, Cog6ToothIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDeleteUserMutation } from '../../features/users/userAPI';

const User = ({user ,index}) => {

 const [deleteUser,{data,isSuccess,}]=useDeleteUserMutation() ;
  const [,setSucces]=useState("")

  const  auth=useSelector(state=>state.auth)


   
 useEffect(()=>{
     if(isSuccess){
        setSucces(data?.msg)
     }
 },[data?.msg, isSuccess])



 const deleteHanlder=()=>{

    
      


             if(window.confirm("Are You sure you wanna delete this user ?")){
               deleteUser(user._id)

             }

       
      
      

 }



  return (
    <>
 <tr className="text-center hover:bg-gray-100 dark:hover:bg-gray-700 ">
   
  
   
  
   <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
   <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user._id}</td>
   <td className="px-6 py-4 text-sm font-medium text-center text-gray-500 whitespace-nowrap dark:text-white"> 
    <img src={user.avatar} alt={user.avatar} className='w-10 h-10 mx-auto text-center rounded-md hover:scale-150' />
   </td>
   <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
   <td className="px-6 py-4 text-sm font-medium whitespace-nowrap ">
       {user.email} 
   </td>

   <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap ">

                                 
                          
                            {
                                user.role === 'admin' ? user.root ? 
                                   <span className='text-emerald-500'>
                                    <CheckIcon  className='inline w-6 text-center text-emerald-500'  /> 
                                      ----
                                 
                                    <Cog6ToothIcon  className='inline w-6 text-center text-emerald-500'  />
                                   </span>
                                  :<CheckIcon  className='inline w-6 text-center text-emerald-500'  /> 
                                  :<XMarkIcon  className='inline w-6 text-center text-red-600' />
                            }

                                
                            </td>

   <td className="px-6 py-4 text-sm font-medium whitespace-nowrap  cursor-pointer ">

 
         
    <Link to={ auth.user.root & auth.user.email !== user.email ? `/edit_user/${user._id}`:`#!`}>
     <PencilSquareIcon className="inline w-6 text-center dark:text-teal-600 text-emerald-500"  />
   </Link>
    

     <ArrowsRightLeftIcon className='inline w-6 text-center text-green-600 mx-2  md:mx-4' />

      <button  disabled={auth.user.email=== user.email}  onClick={deleteHanlder} >
      <XMarkIcon  className={`inline w-6 text-center  ${auth.user.email=== user.email? `text-gray-500`:`text-red-600`}`} />
      </button>
  

   </td>
</tr>

    </>
  )
}

export default User