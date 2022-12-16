import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiSlice from '../../features/api/apiSlice'
import { useDeleteProductMutation, useGetProdutsQuery } from '../../features/products/productApi'
import Paginations from '../Paginations'
import Error from '../ui/Error'
import ProductLooding from '../ui/ProductLooding'
import Product from './Product'

const Products = () => {

    
    const user=useSelector(state=>state.auth.user)
  const {search,category,sort ,pageNumber }=useSelector(state=>state.filter)


        const [deleteProduct,{isLoading:isLoadingForDltproduct}]=useDeleteProductMutation()
  //  call for to get productlist  

    const query=`search=${search}&category=${category}&page=${pageNumber}${sort&&`&sort=${sort}`}`

      const {data ,isLoading,isError,isSuccess} = useGetProdutsQuery(query,{refetchOnMountOrArgChange:true});
       
       //  const {products}=useSelector(state=>state.products)
     //  what will render let's go take decition 
 
     const dispatch=useDispatch()

  const [check,setChcek]=useState(false) ;
       
 
   const handleCheck=(id)=>{

                
  dispatch(
    apiSlice.util.updateQueryData("getProduts",query,(draft)=>{

           draft?.products.forEach(product=>{
                  // eslint-disable-next-line eqeqeq
                  if(product._id == id){
                    product.checked=!product.checked
                  }
           })

          
           

    })
  )


        

   }


 const chceckBoxHanderlOnchange= ()=>{

          
  dispatch(
    apiSlice.util.updateQueryData("getProduts", query,(draft)=>{
           
           draft?.products.forEach(product=>{
            product.checked  =   !product.checked
           })
           setChcek(!check)

    })
  )
           
 }


const deleteALl=()=>{



   if(user.role){

   
  dispatch(
    apiSlice.util.updateQueryData("getProduts",query,(draft)=>{

           draft?.products.forEach(async product=>{

               if(product.checked){

                   if(window.confirm("Do you want to Delete Markable Items?")){
                    await deleteProduct({id:product._id,query}).unwrap()
                    setChcek(!check)
                   }

                    
               }

               

           
           })

         

    })
  )
  }


}
   





    let content = null ;




      if(isLoading){
         content= <>
                     <ProductLooding/>
                   <ProductLooding/>
                   <ProductLooding/>
                   <ProductLooding/>
                   <ProductLooding/>
                   <ProductLooding/>
                 </>
      }
       if(!isLoading && isError){
        content = <Error message={"There is an Error accord to fetch data !"} />
      } if(isSuccess && data?.products?.length === 0 ){
              return <h1 className=' min-h-screen  text-xl md:text-4xl m-5   text-center'>We did not find anthing!</h1>
      } if(isSuccess && data?.products?.length > 0 ){

         content= data?.products?.map(product=> <Product query={query} handleCheck={handleCheck}   product={product}  key={product._id}/>)

      }

     
     
     return (

             <div className='container mx-auto min-h-screen '>
                     

                  {
                    user?.role === 'admin' && <div className='  sticky z-20 top-36 '>
                    <button disabled={isLoadingForDltproduct} onClick={deleteALl} className='bg-red-400 p-1 px-2 text-white  m-2 rounded '>Delete All</button>
               <div className=' bg-green-400 inline px-2 p-1 m-2 rounded text-white'>
            
               <span>Mark ALl</span>
               <input onChange={chceckBoxHanderlOnchange}  checked={check}  className='m-2' type="checkbox" />
               </div>
                </div>
                  } 

        <div className='flex justify-center flex-col'>

        {/* <div className= 'container mx-auto grid p-4   grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-2 gap-y-8  mt-2 md:mt-4 '>  */}
                    

 
        <div className= 'container   grid md:grid-cols-3  sm:grid-cols-2  gap-4 px-4 mt-4   '> 

            {
              content
             }
        </div>

      <div className='mx-auto'>
      <Paginations/>
      </div>
        </div>
              </div>
  )
}

export default Products