/* eslint-disable eqeqeq */
import apiSlice from "../api/apiSlice";


const userAPI= apiSlice.injectEndpoints({
    endpoints:builder=>({
        getUsers:builder.query({
            query:()=>`/api/users`
        }),
        getUser:builder.query({
            query:(id)=> `/api/users/${id}`,
            providesTags:(result,err,arg)=>{

                 return [{ type:"Video",id:arg}]
                 
            }
        }),
         deleteUser:builder.mutation({
            query:(id)=>({url:`/api/users/${id}`,method:"DELETE"}) 
             ,
            onQueryStarted:async( args,{dispatch,queryFulfilled })=>{

                            //  optimistic cash update 
           
                const patchResult= dispatch(
                    apiSlice.util.updateQueryData("getUsers",undefined,(draft)=>{   
                        
                             const  findIndex =   draft?.users?.findIndex(user=> user._id == args)
                                 draft?.users?.splice(findIndex,1)
                               
                    })
                  )
                 try {            

                       await queryFulfilled ;       
                 
                 } catch (error) {                                                                 
                    
                    patchResult.undo()
                 }


            }
         }),
         updateUser:builder.mutation({
            query:({role,id })=>({url:`/api/users/${id}`,method:"PATCH" ,body:{role}}) 
             ,
             onQueryStarted:async({role,id},{dispatch,queryFulfilled})=>{

                //  optimistic  patch update 

                  const patchResult= dispatch(
                             apiSlice.util.updateQueryData("getUsers",undefined,(draft)=>{

                                     const draftUser = draft?.users.find(user=>user._id == id )
                                       
                                     draftUser.role= role
                             })
                  )

                   try {
                          await queryFulfilled
                   } catch (error) {
                    patchResult.undo()
                   }
             },
             invalidatesTags:(result,error,{id})=>[ {type:"Video",id}]

            
         }),
    })
})

export const {useGetUsersQuery ,useDeleteUserMutation,useGetUserQuery ,useUpdateUserMutation }=userAPI ;