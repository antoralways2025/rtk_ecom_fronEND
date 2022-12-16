import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useUploadImagesMutation } from '../../features/auth/authAPi';
 
import { useGetCategoriesQuery } from '../../features/categories/categoriesApi';
import { useCreateProductMutation } from '../../features/products/productApi';

const ProductCreate = () => {


    const [images,setImages]=useState([]) ;
    const [uploadImages,{isError:imgIsError,error:imgError}]=useUploadImagesMutation() ;
    const [createProduct,{ isSuccess,isError,error}]=useCreateProductMutation() ;



    // toastyfy for alering
    useEffect(()=>{

      if(isSuccess){
        toast("Product Create Successfull!")
      }
    if(imgIsError){
      toast(imgError?.data?.err)
    }
      if(isError){
        toast(error?.data?.err)
      }
    },[error, imgError, imgIsError, isError, isSuccess])


    

    const {data}=useGetCategoriesQuery()

     const {categories} = data|| {}

    const {user}=useSelector(state=>state.auth)


     const initialState={
      title:"",
      inStock:"",
      price:"",
      content:"",
      description:"",
      category:""
      }
     const [formData,setFormData]=useState(initialState)



     const {title,inStock,price,content,description,category}=formData ;

 

    //  onChangeHandler for 


    const onChangeHandler=(e)=>{
       const {name,value}=e.target ;

         setFormData({...formData, [name]:value})
    }

    
    // onChangeImageHandler

    const onChangeImageHandler=(e)=>{


          let imagesArray=[];
          let num=0;
          let err;


         const files=[...e.target.files];

        // console.log(files)

         files.forEach(file=>{

              if(file.type !== "image/jpeg" && file.type !== "image/jpg" && file.type !== "image/png" ){
                return err="Only JPG, PNG, JPEG!"
              }

              if(file.size > 1024 * 1024){
                return err="Upload less than 1mb!"
              }


               num+=1;

               if(num>4){
                return err="Please Select less than 5!"
               }

               if(num <= 4){
                 imagesArray.push(file)
               }


               return imagesArray


          })
          
 

      if(err){
        return toast(err)
      }

           const imgCount=images.length ;


            if( imgCount + imagesArray.length <= 4 ){
                return setImages([...images,...imagesArray])
            }

           
    }

//    removeImg from images list 

 const removeImg=(index)=>{

          const newImg=[...images] ;

         newImg.splice(index,1) ;

        setImages(newImg)

 }
     



//  handleDataSubmit

const handleDataSubmit=async(e)=>{

   e.preventDefault() 


 
    if(!title || !inStock || !price || !content || !description || category === 'all' || images.length === 0 ){

   
       return     toast("Every field is required    !")


        
    }



  //    //  chcek admin or else 
   if(user.role !== 'admin'){
    return toast("Authentication failed !")
  }
      // this is for api calling space 
   

                 let media = await myImagesUploader(images)


               const data = createProduct({title:title.toLowerCase(),inStock,price,content,description,category ,
                            images:[...media] })


             if(data)return toast(data?.msg)


}



// Images upload helper funciton 


const myImagesUploader=async(images)=>{


    let newImg=[] ;

     for (let item of images) {


         let formData= new FormData() ;
          formData.append('file',item) ;

            
          const  data = await uploadImages(formData).unwrap();

          newImg.push(data)
      
     }

 return newImg

}
// myImagesUploader()

  return (
    <>
  

  <div className='bg-[#E6E6E6] p-2 md:p-6 '>


        <div className=" container mx-auto bg-white  ">
          <h1 className=' text-2xl py-4 md:text-5xl md:p-4 text-[#6e6e6e] text-center'>Product Create</h1>
        
       <div className="flex  gap-6   flex-col md:flex-row shadow-md  p-0 md:p-4 ">

      
            
       <div className="mx-auto md:w-2/4  w-full ">

               <form  onSubmit={handleDataSubmit}  autoComplete='on'
               className=" px-9"
       
    >

           

      <div className="mb-1">
 
        <input
          value={title}
            onChange={onChangeHandler}
         type="text"
         name="title"
          placeholder="Title"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
         />


      </div>
   
      <div className="mb-1">
   
        <input
                value={price}
                onChange={onChangeHandler}
         type="number"
         name="price"
          id="Price"
          placeholder="Price"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
       
     <div className="mb-1">
 
        <input
          value={inStock}
          onChange={onChangeHandler}
         type="number"
         name="inStock"
          id="inStock"
          placeholder="inStock"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>

      <div className="mb-1">
 
        <textarea 
      value={content}
     onChange={onChangeHandler}
     rows="3" cols="50"
         type="text"
         name="content"
          id="content"
          placeholder="Content"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
       
     <div className="mb-1">
 
        <textarea 
          value={description}
           onChange={onChangeHandler}
        rows="4" cols="50"
         type="text"
         name="description"
          id="description"
          placeholder="Description"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-1">
      <label htmlFor="Category">  Category:</label>

<select  onChange={onChangeHandler}  value={category}  name="category" id="cars">

  <option value="all">All</option>
  {
     categories?.map(category=><option key={category._id} value={category._id}>{category.name}</option> )
  }
  

 
</select>
 
       </div>
      <div>
        <button 
          type='submit'
          className="hover:shadow-form w-full rounded-md bg-green-600 text-white py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
          Click hear to Create Product 
        </button>
      </div>
               </form>
       </div>






{/* ***************************************** table ************************************************* */}

       <div className="  md:w-2/4  w-full px-10     bg-white">

       <div className="mb-1 z-0 ">
       <div className="mb-1  flex space-x-2  ">
        {
            images.length >0 && images.map((img,index)=>{

                  

                return(<div key={index}   className='w-[23%] max-h-[100px]  border-2  relative '>
                            <span onClick={()=>removeImg(index)} className='bg-green-700 hover:bg-red-700 w-6  cursor-pointer rounded-full  6-4 absolute 
                            -top-5 text-center  -right-3 text-white  '> X </span>
                        <img  className='w-full h-full  object-contain '  src={URL.createObjectURL(img)}  alt="file" />

                        </div>)
            })
        }
     </div>
       <div className="mb-1 z-50  overflow-hidden">

 <input  onChange={onChangeImageHandler}  type="file" name="avatar" multiple id="avatar" className="sr-only" />
 <label
   htmlFor ="avatar"
   className="relative flex min-h-[100px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0]   text-center"
 >
   <div>
  
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

       </div>




       </div>

        </div>
      
  </div>



    </>
  )
}

export default ProductCreate 