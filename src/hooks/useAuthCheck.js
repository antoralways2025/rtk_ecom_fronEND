import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

 import { loggedInUser } from "../features/auth/authSlice";
import { addCart } from "../features/cart/cartSlice";

const useAuthCheck = () => {

     const [check,setCheck]=useState(false) ;
     const  dispatch=useDispatch()


    useEffect(()=>{


         const localAuth= localStorage?.getItem('auth') ;
         const myLocalCart=localStorage?.getItem('_my_Cart')

          


          if(localAuth){

             const auth= JSON.parse(localAuth) ; 

              
                     const {accessToken,user}=auth || {} ;
              
               if(accessToken && user){

                        dispatch(
                            loggedInUser({accessToken,user})
                        )
               }


          }



         //  set cart from localstorage to redux

           if(myLocalCart){


              const _my_Cart=JSON.parse(myLocalCart) ;

                  if(_my_Cart.length>0){
                     dispatch( addCart(_my_Cart))
                  }

           }

        
        setCheck(true)
      
        
        
     },[dispatch])



  return  check 
}

export default useAuthCheck