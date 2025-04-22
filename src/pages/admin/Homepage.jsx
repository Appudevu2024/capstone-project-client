 import React from 'react'
import LoginPage from '../shared/LoginPage'
import banner from '../../images/home.jpg'

 function Homepage() {
   return (
    <div className="relative">
      <img 
        src={banner} 
        alt="Hospital Banner" 
        className="w-full h-auto object-cover mb-6" 
      />
      
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="max-w-md w-full px-4">
           <LoginPage/>
           </div>
     </div>
     </div>
   )
 }
 
 export default Homepage
 