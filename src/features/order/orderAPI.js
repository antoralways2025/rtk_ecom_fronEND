import apiSlice from "../api/apiSlice";


const orderApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getOrders:builder.query({
            query:()=> `/api/orders`,
            
        }),
        getSingleOrder:builder.query({
            query:(id)=>`/api/orders/${id}`,
            providesTags:(result, error, arg)=>{
       
              return  [{type: 'Order', id:arg}]

            }
        }),
        createOrder:builder.mutation({
            query:(data)=>({
                url:'/api/orders',
                method:"POST",
                body:data
            }),
            onQueryStarted:async(args,{dispatch , queryFulfilled,getState})=>{
                try {
                            //  pessimistic update 

                             const {data}= await queryFulfilled ;

                              dispatch(

                                apiSlice.util.updateQueryData("getOrders",undefined,(draft)=>{

                                        draft.orders.push(data?.order)

                                })
                              )


                              
                } catch (error) {
                    console.log(error)
                     
                }
            }
        }),
        updateOrder:builder.mutation({
            query:({id,data})=>({
                url:`/api/orders/${id}`,
                method:'PATCH',
                body:data
            }),
            onQueryStarted:async({id,data},{dispatch,queryFulfilled,getState})=>{
                
                    // optimistic patch update ;
                    
                  const pathResult =  dispatch(

                        apiSlice.util.updateQueryData("getOrders",undefined,(draft)=>{


                                     // eslint-disable-next-line eqeqeq
                                     const findDraftObj= draft.orders.find(order=>order._id == id)


                                     findDraftObj.delivered=data.delivered ;
                                     findDraftObj.paid=data.paid ;
                                     findDraftObj.method=data.method ;
                                     findDraftObj.paymentOfDate=data.paymentOfDate ;

                                        if(data.paymentId){
                                            findDraftObj.paymentId= data.paymentId
                                        }
                                     
                                      
                                

                        })
                      )


                    try {
                         await queryFulfilled;
                    }catch (error) {
                        pathResult.undo()
                    }

            },
            invalidatesTags:(result,error,arg)=>{


  
                console.log(arg.id)

                return [{type: 'Order', id:arg.id}]
            }
        })


    })
})




export const {
    useCreateOrderMutation ,
    useGetOrdersQuery , useGetSingleOrderQuery ,
    useUpdateOrderMutation}=orderApi 