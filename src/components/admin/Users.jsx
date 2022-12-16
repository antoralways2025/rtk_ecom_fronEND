/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useGetUsersQuery } from '../../features/users/userAPI';

import { EnvelopeIcon } from '@heroicons/react/24/solid';

import Error from '../ui/Error';
import User from './User';

const Users = () => {

   const {data,isLoading,isError} = useGetUsersQuery();
 
  //delete User 


   let content = null;

       if(isLoading){ return<h1 className='min-h-screen'>Loading..............</h1>} 

       else if(!isLoading && isError){ <h1  className='min-h-screen text-center'>There are somthing error !</h1> }
       else if(!isLoading && !isError && data?.users.length === 0 ){content= <Error message="User is 0"/>}
       else if(!isLoading && !isError && data?.users.length > 0 ){
        
         content= data?.users.map((user,index)=> <User key={user._id} user={user} index={index}/>  )
       }

    return (
      <div> 
         
  
          <div className="flex flex-col min-h-screen">
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                  <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                      <thead className=" bg-gray-100 dark:bg-gray-700 ">
                          <tr>
   
  
                              <th scope="col" className="px-6 py-3 text-xs tracking-wider text-center text-gray-700 uppercase font- dark:text-gray-400">
                                  NO
                              </th>
  
                              <th scope="col" className="px-6 py-3 text-xs tracking-wider text-center text-gray-700 uppercase font- dark:text-gray-400">
                                  ID
                              </th>
                              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                      AVATAR
                              </th>
                              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                   NAME
                              </th>
                              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
  
                                  <EnvelopeIcon   className='inline w-6 mr-2 text-center text-green-700' />
  
                                  
                                   email
                              </th>
                              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                   Admin and Users  
                              </th>
  
                              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                                 
                                  Edit
  
                              </th>
  
  
                              
                          </tr>
                      </thead>
  
  
                 
  
                          <tbody className="bg-white divide-y divide-gray-200 cursor-pointer dark:bg-gray-800 dark:divide-gray-700">

                          
                           {
                            content 
                           }
   
                            </tbody>
  
  
                       
  
    
                  </table>
              </div>
          </div>
      </div>
  </div>
          
      </div>
    )
}

export default Users