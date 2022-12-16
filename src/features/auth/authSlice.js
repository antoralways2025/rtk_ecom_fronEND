import { createSlice } from '@reduxjs/toolkit';



const initialState={
        accessToken:"",
        user:{}
    
}

const authSlice= createSlice({
    initialState,
    name:"auth",
    reducers:{
        loggedInUser:(state,action)=>{     

            // lets save to localhost 
            localStorage.setItem(
                "auth",
                JSON.stringify({
                  accessToken:action.payload.accessToken,
                  user:action.payload.user,
                })
              );


            state.user = action.payload.user
            state.accessToken=action.payload.accessToken
        },
        loggedOutUser:(state)=>{

            localStorage.removeItem("auth")
            state.user={}
            state.accessToken=""
        }

    }
})



export const {loggedInUser ,loggedOutUser ,updateLoggedInUser}=authSlice.actions ;


export default authSlice.reducer ;