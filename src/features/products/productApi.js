/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import apiSlice from "../api/apiSlice";
import { addPages } from "../Filters/FilterSlice";

 const prductsApi= apiSlice.injectEndpoints({
    endpoints:builder=>({
        getProduts:builder.query({
            query:(queryData)=>`/api/products?${queryData}`,
            // keepUnusedDataFor:180,
            onQueryStarted:async(args,{dispatch,queryFulfilled})=>{


                try {
                      const {data}=await queryFulfilled;
      
                             dispatch(
                                addPages  (
                                    data?.pages
                                )
                             )
                    
                } catch (error) {
                    
                    console.log(error)
                }

            }
           
        }),
        getProductsFilter:builder.query({
            query:(query)=>`/api/products?${query}`,
        }),
        getProdut:builder.query({
            query:(id)=> `/api/products/${id}`,
            providesTags:(result,error,args)=>[{type:"Product",id:args}]
        }),
        createProduct:builder.mutation({
            query:(data)=>({
                 method:'POST',
                 url:"/api/products",
                 body:data
            }),
            onQueryStarted:async(args,{dispatch,queryFulfilled})=>{ 

             
                 
                         try {
                            // passimistic patch update ;
                             const result = await queryFulfilled;

                              if(result?.data?.product){

                                dispatch(

                                    apiSlice.util.updateQueryData("getProduts",undefined,(draft)=>{
    
                                               draft.products.unshift(result.data.product)
                
                                          
                
                                        
                
                                    })
                                )
                              }

                         } catch (error) {
                            console.log(error)
                             
                         }
                            
            }
        }),
            
        updateProduct:builder.mutation({
            query:({id,data})=>({
                 method:'PUT',
                 url:`/api/products/${id}`,
                 body:data
            }),
            onQueryStarted:async({id,data},{dispatch,queryFulfilled})=>{ 

                             const patchResult=dispatch(

                                 apiSlice.util.updateQueryData("getProduts",undefined,(draft)=>{
 
                                  let darftProduct = draft.products.find(product=>product._id == id) ;
                                  
                                          

                                    darftProduct._id=id;
                                    darftProduct.title=data.title
                                    darftProduct.price=data.price
                                    darftProduct.inStock=data.inStock
                                    darftProduct.content=data.content
                                    darftProduct.description=data.description
                                    darftProduct.category=data.category ; 
                                    darftProduct.images=data.images;
                                    darftProduct.checked=data.checked;
                                 })
                               )

                         try {
                           
                               await queryFulfilled;

                               
                         } catch (error) {
                              patchResult.undo()
                             
                         }
                            
            },
            invalidatesTags:(result,error,{id})=>[{type:"Product",id}]
        }),
        deleteProduct:builder.mutation({
            query:({id,query})=>({
                 method:'DELETE',
                 url:`/api/products/${id}`,
            }),
            onQueryStarted:async({id,query},{dispatch,queryFulfilled})=>{ 

                             const patchResult=dispatch(

                                 apiSlice.util.updateQueryData("getProduts", query,(draft)=>{
                                   
                                     console.log(JSON.parse(
                                        JSON.stringify(
                                            draft
                                        )
                                     ))

                                     const findIndex = draft?.products.findIndex(product=>product._id == id)
                                                draft?.products.splice(findIndex,1)
                                 })
  
                               )

                         try {
                           
                               await queryFulfilled;

                               
                         } catch (error) {
                              patchResult.undo()
                             
                         }
                            
            },
            invalidatesTags:(result,error,{id})=>[{type:"Product",id}]
        }),

    })
 })
 



 export const {
    useGetProdutsQuery ,
    useGetProdutQuery ,
    useCreateProductMutation ,
    useUpdateProductMutation,
    useGetProductsFilterQuery,
    useDeleteProductMutation
}=prductsApi