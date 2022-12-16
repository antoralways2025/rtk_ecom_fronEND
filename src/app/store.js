import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import FilterReducer from '../features/Filters/FilterSlice';
import orderReducer from '../features/order/orderSlice';
import productsReducer from '../features/products/productSlice';

const store=configureStore({
    reducer:{
     [apiSlice.reducerPath]:apiSlice.reducer ,
     auth:authReducer,
     products:productsReducer,
     cart:cartReducer ,
     order:orderReducer,
     filter:FilterReducer
    },
    middleware:(getDefatultMiddlware)=> getDefatultMiddlware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !=='production',
})



export default store