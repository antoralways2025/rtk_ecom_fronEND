import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPageNumber } from "../features/Filters/FilterSlice";
import { useGetProdutsQuery } from "../features/products/productApi";
const Paginations = () => {

  const dispatch=useDispatch()

  const {category,search,sort ,pageNumber} =  useSelector(state=>state.filter) ;  

   const [skip,setSkip]=useState(false)
  //  const [targetedPage,setTargetedPage]=useState(1)
  
  useGetProdutsQuery( `search=${search}&category=${category}&page=${pageNumber}${sort&&`&sort=${sort}`}`,{
       skip:!skip,
      //  refetchOnMountOrArgChange:true
   });



  const paginationListRef=useRef( )

 
    const {pages}= useSelector(state=> state.filter)
 

 

  const addPageHandler = (pageNumber ,index) => {

    
    let items=[...paginationListRef.current.children] 

    

    


      items.forEach((item,idx)=>{

      if ( idx === index ) {

                 
				item.classList.remove('bg-green-400') 
				item.classList.add('bg-green-600')
			} else {
				item.classList.remove('bg-green-600')
				item.classList.add('bg-green-400')
			}
     }) 


         // conditoinal rendering/fetching........

        //  setTargetedPage(pageNumber)

         dispatch(
          addPageNumber(pageNumber)
         )
           setSkip(true)
         

 
  };

   

     let content;


       if(pages >1){ 

         content =  new Array(pages).fill('').map((item, idx) => { 
              
          let pageCount= idx+1
      return (
        <div
          onClick={() => addPageHandler(pageCount,idx)}
          key={idx}
					className={`${
						idx === 0 ? 'bg-green-600' : 'bg-green-400'
					} text-white px-4 py-1 rounded-full cursor-pointer`}
        > 
        
          {pageCount}
        </div>
      )
        })

       }else{
           content=null
       }





  
   
   return (
    <>
       <section className="pt-2"   >  
        <div  ref={paginationListRef} className='max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 justify-end' >
        {content}  
        </div>
        </section>
     
    </>
    )

};

export default Paginations;
