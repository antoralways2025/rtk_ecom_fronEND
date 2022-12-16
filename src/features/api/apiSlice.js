import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

  

const apiSlice=createApi({
    baseQuery:fetchBaseQuery({
        // baseUrl:"https://eager-gabardine-foal.cyclic.app/",
         baseUrl:"https://mernecommerce.up.railway.app/",
        // baseUrl:"https://ecommercedemo.onrender.com/",
          // baseUrl:"http://localhost:9000/",
        // credentials:'include',
        prepareHeaders: (headers, { getState ,endpoint }) => {
            const token = getState().auth.accessToken ;
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
              headers.set('authorization', `Bearer ${token}`)
            }

            // if(endpoint === 'uploadProfile'){
            //   headers.set('Content-Type', 'multipart/form-data')
            // }
           
    
            return headers
          },
        

    }),
    tagTypes:["User","Product","Order"] ,
    endpoints:(builder)=>({})
})


export default apiSlice