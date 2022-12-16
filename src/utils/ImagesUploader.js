 import { useUploadImagesMutation } from "../features/auth/authAPi";

const imagesUpload=async(images)=>{

     const [uploadImages]=useUploadImagesMutation()
   

     let newImgs=[] ;


      for (let item of images) {


           let formData = new FormData() 
               formData.append('file',item)

            
              const data = await (formData).unwrap()



               if(data)return newImgs.push(data)

               
        
      }
}



export default imagesUpload