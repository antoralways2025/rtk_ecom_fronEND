import { createSlice } from '@reduxjs/toolkit';



const initialState={
        category:'all',
        search:'all',
        sort:"",
        pages:0,
        pageNumber:1,
        limit:3,
}

const FilterSlice= createSlice({
    initialState,
    name:"Filter",
    reducers:{
       addCategory:(state,action)=>{state.category=action.payload}, 
       addSearch:(state,action)=>{state.search=action.payload},
       addSort:(state,action)=>{state.sort=action.payload},
       addPages:(state,action)=>{ state.pages= action.payload },
       addPageNumber:(state,action)=>{ state.pageNumber= action.payload }
    }
})



export const { addPageNumber,addCategory,addSearch,addSort ,addPages }= FilterSlice.actions ;


export default FilterSlice.reducer ;