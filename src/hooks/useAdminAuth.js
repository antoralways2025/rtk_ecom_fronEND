 

import { useSelector } from "react-redux";


const useAdminAuth=()=>{

    const {accessToken,user}=useSelector((state)=>state.auth) ;

         if(accessToken&&user?.role==='admin'){
            return true
         }else{
            return false
         }


}

export default useAdminAuth;