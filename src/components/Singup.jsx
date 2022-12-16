import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../features/auth/authAPi';
import Error from './ui/Error';
import LoadingSpinner from './ui/LoadingSpinner';
import Success from './ui/Success';


const Singup = () => {


    const [register,{data,isLoading,isSuccess ,isError,error:responseError}]=useRegisterMutation() ;

    const [error,setError]=useState('') ;
    const [success,setSuccess]=useState("") ;


    const navigate = useNavigate()



    useEffect(()=>{ 
         if(isError){
            setError(responseError?.data?.err)
         }
         if(isSuccess){
            setSuccess(data.msg) ;
            navigate('/login')
         }
         
    },[data, isError, isSuccess, navigate, responseError])
    
 

      const [name,setName]=useState("") ;
      const [email,setEmail]=useState("")
      const [password,setPassword]=useState("")
      const [confirmPassword,setConfirmPassword]=useState("")
       

      const handleDataSubmit=(e)=>{
            e.preventDefault() ;

            setError("")

                if(!password || !email || ! name || !confirmPassword){
                   return setError('There  are all field required !')
                }
               

             if(password === confirmPassword){

              return  register({
                 name,email,password,confirmPassword
              })
             
            }else{
               return   setError("Password and confirmPassword does not Match ")
            }

        }

  return (

    /* eslint-disable jsx-a11y/anchor-is-valid */
 
  <section className="bg-[#F4F7FF] py-10 lg:py-[50px]">
   <div className="container">
      <div className="flex flex-wrap -mx-4">
         <div className="w-full px-4">
            <div
               className="
               max-w-[525px]
               mx-auto
               text-center
               bg-white
               rounded-lg
               relative
               overflow-hidden
               md:py-16
               py-2
               px-10
               sm:px-12
               md:px-[60px]
               "
               >
               <div className="mb-10 md:mb-16 text-center">
               <h1 className=' text-blue-700 text-2xl'>Sing up </h1>
               </div>
               <form onSubmit={handleDataSubmit}>

                 
                  <div className="mb-6">
                     <input
                        type="text"
                        placeholder="User Name"
                        name='name'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className="
                        w-full
                        rounded-md
                        border
                        bordder-[#E9EDF4]
                        py-3
                        px-5
                        bg-[#FCFDFE]
                        text-base text-body-color
                        placeholder-[#ACB6BE]
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
                        />
                  </div>
                  <div className="mb-6">
                     <input
                        type="email"
                        placeholder="Eamil"
                        name='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="
                        w-full
                        rounded-md
                        border
                        bordder-[#E9EDF4]
                        py-3
                        px-5
                        bg-[#FCFDFE]
                        text-base text-body-color
                        placeholder-[#ACB6BE]
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
                        />
                  </div>
                  <div className="mb-6">
                     <input
                        type="password"
                        placeholder="Passowrd " 
                        name='password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="
                        w-full
                        rounded-md
                        border
                        bordder-[#E9EDF4]
                        py-3
                        px-5
                        bg-[#FCFDFE]
                        text-base text-body-color
                        placeholder-[#ACB6BE]
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
                        />
                  </div>
                  <div className="mb-6">
                     <input
                        type="password"
                        placeholder="Confirm Password"
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        className="
                        w-full
                        rounded-md
                        border
                        bordder-[#E9EDF4]
                        py-3
                        px-5
                        bg-[#FCFDFE]
                        text-base text-body-color
                        placeholder-[#ACB6BE]
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
                        />
                  </div>
                  <div className="mb-10">
                  {isLoading ?
                     <LoadingSpinner/>

                       : <input
                       disabled={isLoading}
                       type="submit"
                       value="Sing In" 
                       className="
                       
                       w-full
                       rounded-md
                       border
                       bordder-primary
                       bg-blue-800
                      
                       py-3
                       px-5
                       
                       text-base text-white
                       cursor-pointer
                       hover:bg-opacity-90
                       transition
                       "
                       />

                  }
                  </div>

                  {error && <Error message={error}/>} 
                  {isSuccess && <Success message={success} />}
                
               </form>
                
 
   
            </div>
         </div>
      </div>
   </div>
  </section>
  


  )
}

export default Singup
  

 