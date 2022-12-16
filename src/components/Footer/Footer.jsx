import React from 'react'

import fbLogo from '../../assets/facebook-svgrepo-com (1).svg'
import linkedInLogo from '../../assets/linkedin-svgrepo-com (1).svg'
import twTLogo from '../../assets/twitter-svgrepo-com (2).svg'

const Footer = () => {
  return (
    < > 
   <footer className="text-center sticky bottom-0 right-0  bg-green-900 text-white">
   

  <div className="text-center p-4"  >
       
          <div className=' flex gap-2 flex-wrap justify-center mt-2'>
          <span>  © 2022 Copyright:</span>
         <span > Online Bussines</span> 
     

    <a href="https://web.facebook.com/antoralways2025" target="_blank" rel="noreferrer">
    <img src={fbLogo} className='w-5' alt="" />
    </a>

 

    <a href="https://twitter.com/antoralways2025" target="_blank" rel="noreferrer">
    <img src={twTLogo} className='w-5' alt="" />
    </a>
    
    

    <a href="https://www.linkedin.com/in/antoralways2025/" target="_blank" rel="noreferrer" >
    <img src={linkedInLogo} className='w-5' alt="" />
    </a>
    
          </div>
  </div>
</footer>
    </>
  )
}

export default Footer