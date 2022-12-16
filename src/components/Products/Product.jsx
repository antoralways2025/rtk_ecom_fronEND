import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCart } from '../../features/cart/cartSlice'
import { useDeleteProductMutation } from '../../features/products/productApi'

import { toast } from 'react-toastify'

const Product = ({product,handleCheck ,query}) => { 
 

      const {cart}=useSelector(state=>state.cart) ;
      const user=useSelector(state=>state.auth.user) ;
      const [deleteProduct]=useDeleteProductMutation()
      const dispatch=useDispatch()


      const addToCartHandler=()=>{



               const isExist= cart.find(item=>item._id=== product._id)

                
               if(isExist){
                toast("This Products is already Added in Cart !")
               }else if(product.inStock === 0 ){
                toast("Sorry The product is stock out!")
               }
             
               else{
                dispatch(
                    addCart([...cart,product])
                   )

                   localStorage.setItem("_my_Cart",JSON.stringify([...cart,product]))
               }

      }
    

    //   deleteProductHandler

      const deleteProductHandler=()=>{

           if(user.role === 'admin'){

         

        if(window.confirm("Do you want to delete this Product!")){
        deleteProduct(
            {
                id:product._id,
                query
            }
        )
    }  
}

      }
   

             
  return (
    <> 
 
 
    
 <div className="bg-white shadow-md border border-gray-200 rounded-lg  ">
        
            <div className='relative'>


            <Link to={user.role==='admin' && `/products/${product._id}`}>
            
            

            <img  className="  object-cover h-[200px] w-full transition   p-4 relative rounded-t-3xl   shadow-lg  " src={product.images[0].url} alt="" />
              
            </Link>
              {
                user?.role === 'admin'&&<input type="checkbox"  onChange={()=>handleCheck(product._id)}  checked={product.checked} className='absolute  top-0 right-0'/>
            }
            </div>
            

             
         

        <div className="p-4 max-h-[150]">
            <div
            className='flex justify-between'
            >
                <h5 className="text-gray-900 font-bold text-1xl tracking-tight">{product.title}</h5>
                 <h5>Price {product.price}$</h5>
            </div>
            <p className="font-normal text-gray-700 mb-3  text-sm">{product.content.slice(0, 80)}</p>

            <div className='flex justify-between'>

            <Link to={user.role === 'admin' ? `/edit_product/${product._id}`:`products/${product._id}`} className="text-white bg-green-500 hover:bg-green-600  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              

             {user.role=== 'admin' ? "Edit" :"View"} 

            </Link>


            <button    onClick={  user.role === 'admin' ? deleteProductHandler :  addToCartHandler}  className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
               
                {user.role=== 'admin' ? "Delete" :" Add Cart"} 
            </button>
            </div>

        </div>
</div>
     
 
 
    </>
  )
}

export default Product