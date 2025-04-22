 import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { doctorLogin } from '../../services/doctorServices'
import { toast } from 'react-toastify';
 function LoginPage() {

   const [values,setValues]= useState({
      
      email:'',
      password:'',
      
    })

 const onSubmit=()=>{

     doctorLogin(values).then((res)=>{
     console.log(res);
       toast.success('Login successful')
        navigate('/doctors')
      }).catch(err=>
       {
         console.log(err)
          toast.error(err.response.data.error,{
            position:'top-center'
         })
      }
     )
    console.log(values,"values")
  }

   return (
    <div className="hero  bg-base-200 ">
    <div className="hero-content flex-col lg:flex-row-reverse">
      
        
      {/* Login Card */}
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100  card-body">
        {/* <form className="card-body"> */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email"  name='email' placeholder="Email" className="input input-bordered" onChange={(e)=>{
                    setValues({...values, [e.target.name]:e.target.value})
                  }} />
          </div>
  
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" name='password' placeholder="Password" className="input input-bordered"  onChange={(e)=>{
                    setValues({...values, [e.target.name]:e.target.value})
                  }}/>
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
  
          <div className="form-control">
            <button className="btn bg-[#0967C2] text-white" onClick={onSubmit}>Login</button>
          </div>
          <div className='text-center'>
          Don't have an account?<Link to={'/signup'} className='text-blue-600 underline'>Signup</Link>
        </div>
        {/* </form> */}
        
      </div>
  
    </div>
  </div>
   )
 }
 
 export default LoginPage
 