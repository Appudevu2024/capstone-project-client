 import React from 'react'
import Header from '../components/admin/Header'
import Footer from '../components/admin/Footer'
import { Outlet } from 'react-router-dom';
 
 function Adminlayout() {
   return (
     <div>
       <Header/>
       <Outlet/>
       <Footer/>
     </div>
   )
 }
 
 export default Adminlayout
 