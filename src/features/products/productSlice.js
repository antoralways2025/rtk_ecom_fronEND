import { createSlice } from '@reduxjs/toolkit';



const initialState={
          products:[]
    
}

const productSlice= createSlice({
    initialState,
    name:"products",
    reducers:{
        addPrdoucts:(state,action)=>{
            state.products=action.payload
        },
        addPrdouct:(state,action)=>{
            state.products.push(action.payload)
        }
       
    }
})



export const {addPrdoucts ,addPrdouct}=productSlice.actions ;


export default productSlice.reducer ;