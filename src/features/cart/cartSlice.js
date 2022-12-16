import { createSlice } from '@reduxjs/toolkit';



const initialState={
          cart:[]   
}

const cartSlice= createSlice({
    initialState,
    name:"products",
    reducers:{
        addCart:(state,action)=>{
            // needed id , cart
            state.cart=[...action.payload]
        },   
         emtyCart:(state)=>{
             
            state.cart=[ ]
        },
         
        removeToCart:(state,action)=>{

                    
            state.cart= state.cart.filter(item=>item._id !== action.payload)  

            const myLocalCart=localStorage.getItem('_my_Cart') ;

            if(myLocalCart){

               localStorage.setItem('_my_Cart',JSON.stringify(state.cart))
            }
           

        },
        increaseQuantity:(state,action)=>{

     
              state.cart= state.cart.map(item=>{

                  if(item._id === action.payload){

                     item.quantity = item.quantity + 1
                  }

                  return item
             })




            //  update my localstoreage
             const myLocalCart=localStorage.getItem('_my_Cart') ;

                   if(myLocalCart){

                      localStorage.setItem('_my_Cart',JSON.stringify(state.cart))
                   }
               
              
         

        },
        decreaseQuantity:(state,action)=>{

     
            state.cart= state.cart.map(item=>{

                if(item._id === action.payload){
                   item.quantity =item.quantity - 1
                }

                return item
           })
            
       

           
            //  update my localstoreage
            const myLocalCart=localStorage.getItem('_my_Cart') ;

            if(myLocalCart){

               localStorage.setItem('_my_Cart',JSON.stringify(state.cart))
            }

        },
        
       
    }
})



export const {addCart ,removeToCart ,increaseQuantity, decreaseQuantity ,emtyCart }=cartSlice.actions ;


export default cartSlice.reducer ;