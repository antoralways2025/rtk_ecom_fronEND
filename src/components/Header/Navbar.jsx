/* eslint-disable jsx-a11y/anchor-is-valid */
 import { HomeIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHref, useNavigate } from 'react-router-dom'
import { loggedOutUser } from '../../features/auth/authSlice'
import useAuth from '../../hooks/useAuth'

const Navbar = () => {

   const auth= useAuth()
   const {cart}=useSelector(state=>state.cart)

   const [show,setShow]=useState(false)
   const handleShow=()=>{

  

    setShow(!show)

}

   const {user}=useSelector(state=>state.auth);
   const { name,email,avatar,role} = user || {} ;  
    const dispatch=useDispatch() ;
    const navigate=useNavigate()

      const isActiveHref=useHref() ;
     

      // active page selected

          const activePage=(url)=>{
              
               if(isActiveHref ===url){
                  return ' rounded bg-green-900'
               }

               return ''
          }


 


          //  adminLinks
           const adminLinks=()=>{

            return(
                <>
                      <li  onClick={handleShow}>
        <Link  to="/users" className={`block py-2 px-4  hover:bg-green-400  ${activePage('/users')}`}>Users</Link>
      </li>
      
     

      <li  onClick={handleShow}>
        <Link   to="/products_create" className={`block py-2 px-4  hover:bg-green-400  ${activePage('/products_create')}`}>Crate Product</Link>
      </li>
      <li  onClick={handleShow}>
        <Link    to="/categories"  className={`block py-2 px-4  hover:bg-green-400  ${activePage('/categories')}`}>Categories</Link>
      </li>
                </>
            )
           }
     
           
          //  adminLinks
          const usersLinks=()=>{

            return(
                 <>
                    <li   onClick={handleShow}>
                  <Link   to="/profile" className={`block py-2 px-4  hover:bg-green-400  ${activePage('/profile')}`}>Dashboard</Link>
                </li>
                <li  onClick={handleShow}>
                  <Link  to="/orderHistory"   className={`block py-2 px-4  hover:bg-green-400  ${activePage('/orderHistory')}`}>OrderHistory</Link>
                </li>
                 </>
            )
           }
    
  
   // logoutHandler userr

   const logoutHandler=()=>{
      
           dispatch(
            loggedOutUser()
          )
           navigate('/')

           setShow(false)

          
 }

 
 const LogInPart=()=>{
      return(
             <div className='w-full'>
                     
<button id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar"
 className=" bg-green-500 border border-1  border-white  p-2 flex mx-3 text-sm rounded-full md:mr-0  " type="button">
    <span className="sr-only"> Open user menu</span>
    <img  onClick={handleShow}  className="w-8 h-8 rounded-md object-fill " src={avatar}  alt='Something ' />
</button>

{/* <!-- Dropdown menu --> */}

<div className='  '>



<div id="dropdownAvatar"  className={`  ${!show&& 'hidden'} text-white  px-10 md:px-2  w-full  h-screen   md:w-44 md:h-80  bg-green-500 rounded divide-y divide-gray-100 shadow  `}  
style={{position: "absolute", top:'55px', right:"0",  margin: "0px",transform: "translate(0px, 19px)"}}
>
    <div className="py-3 px-4 text-sm   dark:text-white">
      <div>{name}</div>
      <div className="font-medium truncate">{email}</div>
    </div>
    <ul className="py-1 text-sm   dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
       
      {
        usersLinks()
      }

      {/* admin Links */}

    {
       role ==='admin' && adminLinks()
    }     

       
    </ul>
    <div className="py-1">
      <button onClick={logoutHandler} className="block w-full bg-green-400 text-whtie py-2 px-4 text-sm     ">Sign out</button>
    </div>
</div>
</div>

    </div>
      )
   }

  return (
    <> 
 
 
<nav  id="header" className="w-full bg-green-600 sticky z-30 top-0 py-2 px-1 md:px-10 text-white shadow-lg border-b border-blue-400 ">
      <div className="w-full flex items-center justify-between mt-0 px-6 py-2">
         <Link to='/'   className="cursor-pointer md:hidden block">
                 <HomeIcon className='w-8  border-b border-white    text-green-300' />
         </Link>
         <input className="hidden" type="checkbox" id="menu-toggle" />
         
         <div className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
            <nav>
               <ul className="md:flex items-center justify-between text-base text-blue-600 pt-4 md:pt-0">

                  <li  >

                    <Link className={`inline-block      font-light text-lg text-white     px-4 lg:-ml-2 ${activePage('/')}`} to="/">Home</Link>

                    </li>
                  
               
               </ul>
            </nav>
         </div>
         
         <div className="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4" id="nav-content">
            <div className="auth flex items-center w-full md:w-full">

               {
                  !auth &&<button > 
                  <Link to='/login ' 
                  className={`  text-white  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700 text-sm ${activePage('/login')}`}
                  >Sign in</Link> 
                  </button>
               }
              
 
                {/* /products/cart */}
               
                   <Link to="/products/cart ">
                  <button type="button" className="  inline-flex relative items-center  p-2 text-sm font-medium text-center text-white   rounded-lg  focus:ring-4 focus:outline-none  ">
                  <ShoppingCartIcon className='w-8  border-b border-white    text-green-300    '/>
          
                 <div className="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-green-500 rounded-full border-2 border-white dark:border-gray-900">{cart.length}</div>
                     </button>
                  </Link>
                 
            {/* when user logged in  */}

            {
              auth &&  LogInPart()
            }
         </div>
         </div>
      </div>
   </nav>

    </>
  )
}

export default Navbar  