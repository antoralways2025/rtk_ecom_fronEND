import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetCategoriesQuery } from '../../features/categories/categoriesApi';

import { useDispatch } from 'react-redux';
import { addCategory, addSearch, addSort } from '../../features/Filters/FilterSlice';
import { useGetProdutsQuery } from '../../features/products/productApi';
const Filters =() => {



            const [skip,setSkip]=useState(false) ;
            // const [search,setSearch]=useState("all") ;
            // const [category,setCategory]=useState("all") ;
            // const [sort,setSort]=useState("") ;


            const dispatch=useDispatch()

             const {category,search,sort,pageNumber} =  useSelector(state=>state.filter) ;  
             

            useEffect(()=>{
                if(search !== 'all' || category !== 'all' || sort){
                  setSkip(true)
                }
            },[category, search ,sort])

     const {data,}=useGetCategoriesQuery() ;
           
     const query=`search=${search}&category=${category}&page=${pageNumber}${sort&&`&sort=${sort}`}`

      useGetProdutsQuery(query,{skip:!skip , refetchOnMountOrArgChange:true}) ;

               

      //  my debounce funtion for searching.......
      
      function debounce(func, timeout = 1500){
         let timer;
         return (...args) => {

           clearTimeout(timer);
           timer = setTimeout(() => {
            //  func.apply(this, args);

                            func(...args)
             }, timeout);

         };
       }
       function saveInput(e){

        searchChangeHanlder(e.toLowerCase())
          
       }
       
       const processChange = debounce(saveInput);
   


      //  my category handler 

      const categoryChangeHanlder=(e)=>{
           
                 dispatch(  addCategory(e.target.value))
        } 
        const searchChangeHanlder=(e)=>{
          dispatch( addSearch(e.toLowerCase()))
          } 
          const sortChangeHanlder=(e)=>{
           
            dispatch( addSort(e.target.value))
            } 

  return (
     <div className='  mx-auto 
     sticky z-20 top-20 
    bg-green-200 md:px-4'>
         <div className='grid grid-cols-12 p-4  gap-1 md:gap-4 items-center '>
        
        <div className='md:col-span-2 col-span-3'>

              <select className='w-full px-4 py-1'  onChange={categoryChangeHanlder}  value={category} >
                  <option className='text-sm p-2' value="all">All </option>
                  {
                    data?.categories?.map(category=> <option className='text-sm p-2' key={category._id} value={category._id}>{category.name}</option> )
                  }
                
                
                
              </select>

        </div>
        <div className='md:col-span-8 col-span-6'> 
           <input    onChange={e=>processChange(e.target.value)} className='w-full px-4      py-1 rounded outline-none text-gray-400 text-sm ' type="search"  placeholder='Branded T-shirt'/>
        </div>
        <div className=' md:col-span-2 col-span-3 '>
        
                 
            <select className='w-full py-1 text-sm border border-gray-300 md:px-2 md:py-2' value={sort} name=""
             onChange={sortChangeHanlder}  id="" >
                        <option value="-createdAt"> Newest</option>
                        <option value="createdAt"> Oldest</option>
                        <option value="-sold"> Best selse</option>
                        <option value="-price"> High to Low</option>
                        <option value="price"> Low to High</option>
                       
                       </select>
                 
                        
                 
                
        </div>
            </div>
     </div>
  )
}

export default Filters