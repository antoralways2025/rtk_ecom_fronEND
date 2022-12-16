import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';



const PublicRouter = ({children}) => {
  
 const auth=useAuth() ;

 
 return  auth ? <Navigate to='/'/> :  children

}

export default PublicRouter