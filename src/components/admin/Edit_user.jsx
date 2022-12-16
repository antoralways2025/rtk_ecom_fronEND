import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetUserQuery, useUpdateUserMutation } from '../../features/users/userAPI'
const Edit_user = () => {

    const{ id }= useParams()


     const {data,isSuccess}= useGetUserQuery(id)
 
     const [updateUser]=useUpdateUserMutation()

      const navigate=useNavigate()

      const {user}=data || {}
     
       const [name,setName]=useState('')
       const [email,setEmail]=useState('')
       const [isAdmin,setIsAdmin]=useState(false) ;


       useEffect(()=>{

        if(isSuccess){

             setName(data?.user?.name) 
             setEmail(data?.user?.email)
             setIsAdmin(data?.user?.role === 'user' ? false:true)

        }
    },[data?.user?.email, data?.user?.name, data?.user?.role, isSuccess])
        


    const handleDataSubmit=(e)=>{
       e.preventDefault();


        if(user.role !==( isAdmin ? "admin":'user')){
 
   

            updateUser({id,role: isAdmin ? "admin":'user'})


            return  navigate('/users')
            
        }
         

        console.log("wrong")
      
        
    }
      

    
  return (
    <div className='bg-white h-screen  '>


    <div className=" container mx-auto md:p-10 pt-5">


 <h1 className='text-center text-green-500 md:text-4xl'>Edit_User</h1>
    
   <div className="flex   flex-col md:flex-row shadow-md  p-4 ">
        
   <div className="mx-auto md:w-2/4   w-full ">
           <form   onSubmit={handleDataSubmit} 
           className=" px-9"
   
>

 
<div className="mb-1">
    <label
      htmlFor="email"
      className="mb-1 block text-base font-medium text-[#07074D]"
    >
       Name
    </label>
    <input 
    
    type="text"
     value={name}
      disabled
    name="name"
      id="name"
      placeholder="example@domain.com"
      className="w-full lowercase rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    />
  </div>
  <div className="mb-4">
    <label
      htmlFor="email"
      className="mb-1 block text-base font-medium text-[#07074D]"
    >
       Email:
    </label>
    <input 
    disabled
    value={email}
    type="email"
    name="email"
      id="email"
      placeholder="example@domain.com"
      className="w-full lowercase rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    />
  </div>

 
  <div className="mb-4  flex items-center space-x-4 bg-purple-100">
    <label
      htmlFor="password"
      className="mb-1   text-base font-medium text-[#07074D]"
    >
     Admin
    </label>
    <input 
       
     checked={isAdmin}
     onChange={e=> setIsAdmin(e.target.checked)}

      type="checkbox"
      name="checkBox"
      id="checkBox"
      className=" w-4 h-4 text-green-700   bg-gray-600   cursor-pointer    "
    />
  </div>

  

  <div>
    <button 
     type='submit'
     
      className="hover:shadow-form w-full rounded-md bg-green-600 text-white py-2 px-8 text-center text-base font-semibold text-white outline-none"
    >
      Upadate 
    </button>
  </div>
           </form>
   </div>






 




   </div>

    </div>
  
</div>
  )
}

export default Edit_user