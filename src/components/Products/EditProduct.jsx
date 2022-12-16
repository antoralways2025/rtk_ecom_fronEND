/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUploadImagesMutation } from '../../features/auth/authAPi';
import { useGetCategoriesQuery } from '../../features/categories/categoriesApi';
import { useGetProdutQuery, useUpdateProductMutation } from '../../features/products/productApi';

   const EditProduct = () => {

    const {id}=useParams()

    const {data:productData,isSuccess}=useGetProdutQuery(id);

         
      const {product}=productData ||{} ;

    const [uploadImages]=useUploadImagesMutation() ;
    const [updateProduct ,{isSuccess:isUpdateSuccess,isError:isUpdateError,error:updateError}]=useUpdateProductMutation()


    // useeffect for aleiting .
     useEffect(()=>{

        if(isUpdateSuccess){
            
          toast("Update Successfull!")
        }
        if(isUpdateError){
           toast(updateError?.data?.err)
        }
            
     },[ isUpdateSuccess,isUpdateError])


    const {data}=useGetCategoriesQuery()
 
     const {categories} = data|| {}

    const {user}=useSelector(state=>state.auth)



    // my input states
     const [title,setTitle]=useState('')
     const [inStock,setInStock]=useState('')
     const [price,setPrice]=useState(0)
     const [content,setContent]=useState('')
     const [description,setDescription]=useState('')
     const [category,setCategory]=useState('')
     const [images,setImages]=useState([]) ;


      useEffect(()=>{
            if(isSuccess){
                setTitle(product?.title)
                setInStock(product?.inStock)
                setPrice(product?.price)
                setContent(product?.content);
                setDescription(product?.description) ;
                setCategory(product?.category)
                setImages(product?.images)
                 
            }
      },[isSuccess])

   
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

           const imgCount=images?.length ;


            if( imgCount + imagesArray?.length <= 4 ){
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


 
    if(!title || !inStock || !price || !content || !description || category === 'all' || images?.length === 0 ){

   
       return     toast("Every field is required    !")


        
    }



  //    //  chcek admin or else 
   if(user.role !== 'admin'){
    return toast("Authentication failed !")
  }
      // this is for api calling space 
   


                    //  chcek which img to do online

                     const oldImgages= images.filter(img=> img.url) ;
                     const newImages= images.filter(img=>!img.url) ;

                 let media = await myImagesUploader(newImages)


                  const updateTodata={title,inStock,price,content,description,category ,
                    images:[...media,...oldImgages] }

               updateProduct({id,data:updateTodata})

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
          <h1 className=' text-2xl py-4 md:text-5xl md:p-4 text-[#6e6e6e] text-center'>Update Product</h1>
        
       <div className="flex  gap-6   flex-col md:flex-row shadow-md  p-0 md:p-4 ">

      
            
       <div className="mx-auto md:w-2/4  w-full ">

               <form  onSubmit={handleDataSubmit}  autoComplete='on'
               className=" px-9"
       
    >

           

      <div className="mb-1">
 
        <input
          value={title}
            onChange={(e)=>setTitle(e.target.value)}
         type="text"
         name="title"
          placeholder="Title"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
         />


      </div>
   
      <div className="mb-1">
   
        <input
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
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
          onChange={(e)=>setInStock(e.target.value)}
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
      onChange={(e)=>setContent(e.target.value)}
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
          onChange={(e)=>setDescription(e.target.value)}
        rows="4" cols="50"
         type="text"
         name="description"
          id="description"
          placeholder="Description"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-1">
      <label >  Category:</label>

<select   onChange={(e)=>setCategory(e.target.value)} value={category}     >

  <option value="all">All</option>
  {
     categories?.map(category=><option key={category.name} value={category._id}>{category.name}</option> )
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
            images?.length >0 && images.map((img,index)=>{

                  

                return(<div key={index} className='w-[23%] max-h-[100px]  border-2  relative '>
                            <span onClick={()=>removeImg(index)} className='bg-green-700 hover:bg-red-700 w-6  cursor-pointer rounded-full  6-4 absolute 
                            -top-5 text-center  -right-3 text-white  '> X </span>
                        <img  className='w-full h-full  object-contain '  src={img.url? img.url : URL.createObjectURL(img)}  alt="file" />

                        </div>)
            })
        }
     </div>
       <div className="mb-1 z-50  overflow-hidden">


 <label
    
   className="relative flex min-h-[100px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0]   text-center"
 >
   <div>
   <input  onChange={onChangeImageHandler}  type="file" name="avatar" multiple id="avatar" 
 className="sr-only " />
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

export default EditProduct 