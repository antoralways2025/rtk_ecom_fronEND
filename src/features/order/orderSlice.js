import { createSlice } from '@reduxjs/toolkit';



const initialState={
          orderList:[] 
}

const orderSlice= createSlice({
    initialState,
    name:"order",
    reducers:{

        addToOrder:(state,action)=>{
             state.orderList=action.payload
        }
  
       
    }
})



export const {addToOrder }=orderSlice.actions ;


export default orderSlice.reducer ;