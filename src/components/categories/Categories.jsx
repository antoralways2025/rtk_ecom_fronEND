import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from '../../features/categories/categoriesApi';
import Error from '../ui/Error';
const Categories = () => {

     const {data,isLoading,isError,isSuccess}=useGetCategoriesQuery() ;
     const[createCategory]=useCreateCategoryMutation() ;
     const [deleteCategory]=useDeleteCategoryMutation() ;
     const [updateCategory]=useUpdateCategoryMutation()

      const [inputValue,setInputValue]=useState("") ;

      const [edit,setEdit]=useState(false) ;
      const [id,setId]=useState('') ;
      const [isMatch,setIsMatch]=useState('')

         const {categories}=data || {} ;

         
        //  deleteCategory funtion
         
        const deleteCategoryHandler=(id)=>{

            if(window.confirm(`Are you sure ? `)){

               deleteCategory(id)
            }
        }

        // update 
        const updateCategoryHandler=({id,name})=>{

             setEdit(true)
             setInputValue(name) ;
             setId(id)

             setIsMatch(name)
           

        }

        
        // update or create 

        const submitHandler=(e)=>{
            e.preventDefault()
             
              if(!edit && inputValue){
                 createCategory(inputValue)
                  setInputValue('')
              }


             //   update 
              if(edit && id && inputValue){

                  if(isMatch !== inputValue){
                    updateCategory({id,name:inputValue}) ;
                  }
                
                 setInputValue('')
                 setEdit(false) ;
                 setId('')
              }
     }


    //  cancelHandler

     const cancelHandler=()=>{

         setEdit(false) ;
         setInputValue('')
     }

     
       
        let content=null ;

        if(isLoading) {content=<h1 className='min-h-screen'>Loading...............</h1>}
        else if(!isLoading && isError){content = <Error message="Something Error Occured!" />}
        else if(isSuccess && categories.length === 0  ){content = <Error message="Categories Emty" />}
        else if(isSuccess && categories.length > 0 ){
            content =  categories.map(category=>{

                 return ( <li  className='flex py-2 m-2 bg-green-100 hover:bg-green-400 px-4 justify-between items-center' key={category._id}>    
                 
                 
                   <span>{category.name}</span>
                 
                         <div className='flex space-x-4 '>

           <PencilSquareIcon onClick={()=>updateCategoryHandler({id:category._id,name:category.name})} className=' w-6 cursor-pointer  '/>

                            <button    onClick={()=>deleteCategoryHandler(category._id)} >
                            <TrashIcon className=' w-6 cursor-pointer  '/>
                            </button>
                         
                         </div>
                 
                  </li>)
            })
            
        
        
        
        }







  return (
    <div className='container min-h-screen  '>


          <div className='max-w-[400px] mx-auto mt-2  md:mt-10 '>

          <h1 className='text-3xl text-center text-gray-400 m-4'>Category Section</h1>

<form onSubmit={submitHandler} className='  p-4' >

    <div>
      <input  value={inputValue} onChange={e=> setInputValue(e.target.value)}  className="w-full block mb-2  rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-300 focus:shadow-md" type="text" />

      {
        edit &&  <button  onClick={cancelHandler}  className='bg-green-600 mb-2 w-full text-white text-center px-4 py-1 rounded-md'>

        Cancel

     </button>
      }

      
      <button typeof='submit' className='bg-green-600 w-full text-white text-center px-4 py-1 rounded-md'>

        {edit?"Update":"Create"}
      </button>
    </div>
    
</form>



          <ul className=' '>
                    {content}
          </ul>
          </div>

    </div>
  )
}

export default Categories