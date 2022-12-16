import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EditUser from './components/admin/Edit_user'
import Users from './components/admin/Users'
import Cart from './components/cart/Cart'
import Categories from './components/categories/Categories'
import Footer from './components/Footer/Footer'
import Navbar from './components/Header/Navbar'
import Login from './components/Login'
import NotFoundPage from './components/NotFoundPage'
import Order from './components/order/Order'
 
import PrivateRoute from './components/PrivateRoute'
import EditProduct from './components/Products/EditProduct'
import ProductCreate from './components/Products/ProductCreate'
import SingleProductView from './components/Products/SingleProductView'
import Profile from './components/Profile/Profile'
import PublicRouter from './components/PublicRoute'
import Singup from './components/Singup'
import useAuthCheck from './hooks/useAuthCheck'
// THis is for Alert 
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import OrdersHistory from './components/order/OrdersHistory'
import Home from './components/pages/Home'
import useAdminAuth from './hooks/useAdminAuth'
const App = () => {
             const checkAuth= useAuthCheck() ;

              const checkAuthAdmin=useAdminAuth()
     
  return(!checkAuth ? <h1>Checking authorization  ..........</h1> :
  
    <BrowserRouter>


      {/*  navbar or Header  */}
      <Navbar/>
     

      <Routes>
   

         <Route path='/' element={<Home/>} /> 
         
         <Route path='/products/:id' element={<SingleProductView/>} /> 
         <Route path='/orderHistory' element={<OrdersHistory/>} /> 



       {
        checkAuthAdmin &&
        
         <>
          <Route path='/edit_product/:id' element={<EditProduct/>} />
         <Route path='/products_create' element={<ProductCreate/>} /> 
        <Route path='/users' element={<Users/>} />
        <Route path='/edit_user/:id' element={   <EditUser/> } /> 
        <Route path='/categories' element={<Categories/>} />
        
         </>
         
       }
          

        
         
         <Route path='/order/:id' element={<Order/>} /> 
       
         <Route path='/products/cart' element={<Cart/>} />
         
         <Route path='/login' element={ <PublicRouter> <Login/> </PublicRouter>} /> 
         <Route path='/profile' element={<PrivateRoute><Profile/> </PrivateRoute> } /> 
         <Route path='/singup' element={<PublicRouter> <Singup/> </PublicRouter> } />
         <Route path='*' element={<NotFoundPage/>} />

         
      </Routes>

      {/* Fotter  */}

      <ToastContainer/>

      <Footer/>

      
      
    </BrowserRouter>
)
  
   
}

export default App