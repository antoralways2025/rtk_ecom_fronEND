import React, { useState } from 'react';
import { toast } from 'react-toastify';

 

import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { useResetPasswordMutation, useUpdateInformationMutation, useUploadImagesMutation } from '../../features/auth/authAPi';

import { loggedInUser } from '../../features/auth/authSlice';
import { useGetOrdersQuery } from '../../features/order/orderAPI';

const Profile = () => {

  const [uploadImages]=useUploadImagesMutation()
    const [resetPassword,{isLoading:isLoadingForPass}]=useResetPasswordMutation() ;  
    const [updateInformation,{isLoading:isLoadingForInfo}]=useUpdateInformationMutation() ; 
         
      //  This called for to get order histort
     const {isLoading:isloadingForOrder}= useGetOrdersQuery()

     const [name,setName]=useState('') ;
     const [email,setEmail]=useState('someTHing@gmail.com')
     const [password,setPassword]=useState('') ;
     const [confirmPssword,setConfirmPssword]=useState('') ; 
     const [avatar,setAvatar]=useState('') ;

     const { user,accessToken  }= useSelector(state=>state.auth) 



     const dispatch=useDispatch() 
     const {orderList}=useSelector(state=>state.order)


 

  useEffect(()=>{

        setName(user?.name)  
        setEmail(user?.email)
        

  },[user])

    //  this is for crop images 
   
   // imgOnChangeHandler

   const imgOnChangeHandler=(e)=>{
  
    const file=e.target.files[0] ;

    if(!file){
     return toast("NO found any file ")
    }

   else if(file.type !== "image/png" && file.type !== "image/jpeg" && file.type !== "image/jpg"){          
       return  toast("Only you can take JPG,PNG,JPEG!") 
    }
    else if(file.size > 1024 * 1024 ){ 
       return toast("Please upload lessthan 1mb file !")
    }
   else{
    setAvatar(file)
   }
        }


    
    const updateHandler=async(e)=>{
        e.preventDefault()

        if( avatar || name !== user.name){

        
            let media ;

             if(avatar){
              media = await imagesUploader([avatar])
            
               
            }


             
              
            
                 const updatedDataForInfo =  await updateInformation({ name,avatar: avatar ? media[0].url:user.avatar }).unwrap() 
                 
                  dispatch(
                    loggedInUser({user:updatedDataForInfo.user ,accessToken})
                  )
                 
                  setAvatar('')
          

            }

            //   change Password 
              if(password && password === confirmPssword){
                     
                resetPassword(password)

               }
      
    }





    // this function for image uploader 


    const imagesUploader=async(images)=>{
      let newImgs=[] ;


      for (let item of images) {
 
 
           let formData = new FormData() 
               formData.append('file',item)
 
            
              const data = await uploadImages (formData).unwrap()

              console.log("data",data)
 
                newImgs.push(data)
 
               
        
      }
 
 

      console.log(newImgs)
 
      return newImgs ;
    }

      



 
  return (
    <>
  

  <div className='bg-white  '>


        <div className=" container mx-auto">

        
       <div className="flex   flex-col md:flex-row shadow-md p-1 md:p-4 ">
            
       <div className="mx-auto md:w-2/4  w-full ">
               <form onSubmit={updateHandler} autoComplete='on'
               className=" px-9 py-2"
       
    >

          <div className="mb-1">
 
          <div className="mb-1">
        
          {/* <input  onChange={imgOnChangeHandler} type="file" name="file" id="file" className="sr-only " /> */}
          <label className="relative flex min-h-[100px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0]   text-center"
          >
            <div>
            <input  onChange={imgOnChangeHandler} type="file" name="file" id="file" className="sr-only " />
              <span className="mb-1 block text-xl font-semibold text-[#07074D]">
              <img  className='w-full h-44 ' src={avatar?URL.createObjectURL(avatar):user.avatar} alt="avatar" />
              </span>
              <span className="mb-1 block text-base font-medium text-[#6B7280]">
                 click here to upload photo
              </span>
              <span
                className="inline-flex rounded border border-[#e0e0e0]   px-3 text-base font-medium text-[#07074D]"
              >
                Browse
              </span>
            </div>
          </label>
        </div>
 
 
            </div>


      <div className="mb-1">
        <label
          htmlFor="Name"
          className="mb-1 block text-base font-medium text-[#07074D]"
        >
          Name 
        </label>
        <input
         value={name}
         onChange={(e)=>setName(e.target.value)}
         type="text"
         name="name"
          placeholder="Muhammad (s)"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-1">
        <label
          htmlFor="email"
          className="mb-1 block text-base font-medium text-[#07074D]"
        >
           Email:
        </label>
        <input 
        disabled
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        type="email"
        name="email"
        
          placeholder="example@domain.com"
          className="w-full lowercase rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>

      <div className="mb-1">
        <label
         
          className="mb-1 block text-base font-medium text-[#07074D]"
        >
          Password:
        </label>
        <input
           value={confirmPssword}
           onChange={(e)=>setConfirmPssword(e.target.value)}
         type="password"
         name="password"
          
          placeholder="****"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-1">
        <label
          htmlFor="password"
          className="mb-1 block text-base font-medium text-[#07074D]"
        >
          Confirm Password:
        </label>
        <input 
           value={password}
            onChange={(e)=>setPassword(e.target.value)}
          type="password"
          name="password"
          
          placeholder="****"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-xm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>

      

      <div>
        <button 
         disabled={isLoadingForInfo || isLoadingForPass}
          className="hover:shadow-form w-full rounded-md bg-green-600   py-2 mt-2 md:py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
          Upadate 
        </button>
      </div>
               </form>
       </div>











       </div>

        </div>
      
  </div>


  {/* <ToastContainer/> */}
    </>
  )
}

export default Profile