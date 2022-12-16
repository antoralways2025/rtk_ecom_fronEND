import apiSlice from "../api/apiSlice";
import { loggedInUser } from "./authSlice";



const authApi=apiSlice.injectEndpoints({
    

    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`/api/user/login`,
                method:"POST",
                body:data,
                // credentials:true
               
            }),
            onQueryStarted:async(arg,{queryFulfilled, dispatch , getState})=>{

                 try {
                    const result = await queryFulfilled ;

                    //  console.log(result.data.accessToken)

                     const{user,accessToken}=result.data ;
  

                        dispatch(
                            loggedInUser({user,accessToken})
                        )

                 } catch (error) {
                    
                 }
                 

            }
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`/api/user/register`,
                method:'POST',
                body:data
            })
        }),
        uploadImages:builder.mutation({
            query:(data)=> ( {
                    url:"/api/images/upload",
                    method:"POST",
                    body:data,
                    // credentials:"include"
    
                }),
           
            
        }),
        resetPassword:builder.mutation({
            query:(data)=>({
                url:'/api/user/resetPassword',
                method:'PATCH',
                body:{password:data}
                 
            })
        }),
        updateInformation:builder.mutation({
            query:({name,avatar})=>({
                url:'/api/user/updateInfo',
                method:'PATCH',
                body:{name,avatar}
                 
            })
        })

    })
})



export const {

    useLoginMutation ,
    useRegisterMutation,
 
    useAddCartMutation ,
    useUploadProfileMutation ,
    useUpdateInformationMutation,
    useResetPasswordMutation,
    useUploadImagesMutation
    

    }=authApi ;