/* eslint-disable eqeqeq */
import apiSlice from "../api/apiSlice";


 const categoriesApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({

         getCategories:builder.query({
            query:()=>`/api/categories`
         }),
         createCategory:builder.mutation({
            query:(name)=>({ url:`/api/categories`,method:"POST",body:{name}}),
            onQueryStarted:async(args,{dispatch,queryFulfilled})=>{
                //   passimistic patch update 
                 try {
                     const result=  await queryFulfilled;

                      console.log(result)

                          if(result?.data?.category
                            ){
                            
                                        dispatch(
                                            apiSlice.util.updateQueryData("getCategories",undefined,(draft)=>{


                                                                    draft.categories.push(
                                                                        result.data.category
                                                                    )

                                                            console.log(JSON.stringify(draft))
                                            })
                                        )
                          }
                 } catch (error) {
                      console.log(error)
                 }
            }
         }),
         deleteCategory:builder.mutation({
            query:(id)=>({
                url:`/api/categories/${id}`,
                method:"DELETE"
            }),
            onQueryStarted:async(args,{dispatch,queryFulfilled})=>{
                //   optimistic patch update 


             const patchResult=   dispatch(
                    apiSlice.util.updateQueryData("getCategories",undefined,(draft)=>{

            const  indexCategory=draft.categories.findIndex(category=> category._id == args)
                                             

                      if(indexCategory !== -1){

                        draft.categories.splice(indexCategory,1)

                      }
                                    
                    })
                )
                 try {
                   await queryFulfilled;

                 } catch (error) {
                    patchResult.undo()
                 }
            }
         }),
         
          updateCategory:builder.mutation({
            query:({id,name})=>({
                url:`/api/categories/${id}`,
                method:"PATCH",
                body:{name}
            }),
            onQueryStarted:async({id,name},{dispatch,queryFulfilled})=>{
                //   optimistic patch update 


             const patchResult =   dispatch(
                    apiSlice.util.updateQueryData("getCategories",undefined,(draft)=>{

            const    draftCategory=draft.categories.find(category=> category._id == id)

                                
                                       draftCategory.name=name ;
                                    
                    })
                )
                 try {
                   await queryFulfilled;

                 } catch (error) {
                    patchResult.undo()
                 }
            }
         })

    })
 })



 export const {useGetCategoriesQuery,useCreateCategoryMutation ,useDeleteCategoryMutation ,useUpdateCategoryMutation}=categoriesApi;