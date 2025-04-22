import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import { doctorSignUp } from '../../services/doctorServices';
import { toast } from 'react-toastify';

export default function DoctorSignup() {
  
  const [values,setValues]= useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
    dateOfBirth:'',
    contact:'',
    gender:'',
    department:'',
    availableDays:'',
    address:'',
    timings:'',
    image:'',
  })
  const navigate= useNavigate()

  const onSubmit=()=>{

    doctorSignUp(values).then((res)=>{
      console.log(res);
      toast.success('Saved successfully')
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

    <div className="hero bg-base-200">

      <div className="hero-content flex-col lg:flex-row-reverse">

       

        {/* Login Card */}

        <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100 card-body">
          
          {/* <form className="card-body"> */}
            <div className="form-control">
              <div className="flex gap-6">
                <div>
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input type="text" name='name' placeholder="Name" className="input input-bordered w-full" required onChange={(e)=>{
                    setValues({...values, [e.target.name]:e.target.value})
                  }}/>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" placeholder="Email" name='email' className="input input-bordered w-full" required onChange={(e)=>{
                    setValues({...values, [e.target.name]:e.target.value})
                  }}/>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password"  name='password' placeholder="Password" className="input input-bordered w-full" required onChange={(e)=>{
                    setValues({...values, [e.target.name]:e.target.value})
                  }} />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Confirm password</span>
                </label>
                <input type="password" name='confirmPassword' placeholder="Confirm password" className="input input-bordered w-full" required  onChange={(e)=>{
                    setValues({...values, [e.target.name]:e.target.value})
                  }}/>
              </div>
            </div>


            <div className="flex gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date Of Birth</span>
                </label>
                <input type="date" name='dateOfBirth' placeholder="Date Of Birth" className="input input-bordered w-full" required onChange={(e)=>{
                    setValues({...values, [e.target.name]:e.target.value})
                  }}/>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contact</span>
                </label>
                <input type="tel" name='contact' placeholder="Mobile" className="input input-bordered" required onChange={(e)=>{
                    setValues({...values, [e.target.name]:e.target.value})
                  }} />
              </div>
            </div>

            <div className="flex gap-6">
              <div>
                <label className="label">
                  <span className="label-text">Gender:</span>
                </label>
                <label className="label cursor-pointer ">
                
                  <input type="radio" name="gender" value="male" className="radio checked:bg-blue-500" onChange={(e)=>{
                    setValues({...values, [e.target.name]:e.target.value})
                  }} />
                  <span className="label-text">Male</span>
                </label>

                <label className="label cursor-pointer">
                  <input type="radio" name="gender" value="female" className="radio checked:bg-blue-500"  onChange={(e)=>{
                    setValues({...values, [e.target.name]:e.target.value})
                  }}/>
                  
                  <span className="label-text">Female</span>
                </label>
                <label className="label cursor-pointer">
                  
                  <input type="radio" name="gender" value="others" className="radio checked:bg-blue-500"  onChange={(e)=>{
                    setValues({...values, [e.target.name]:e.target.value})
                  }}/>
                  <span className="label-text">Others</span>
                </label>
              </div>
            </div>



            <div className="flex gap-6">

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text font-semibold">Department</span>
                </label>
                <select  name ='department' className="select select-bordered" required
                  value={values.department}
                  onChange={(e) => {
                    setValues((values) => ({
                      ...values,
                      [e.target.name]: e.target.value,
                    }));
                  }}>
                  <option disabled value=''>Choose a department</option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
                  <option>Orthopedics</option>
                  <option>Pediatrics</option>
                  <option>Oncology</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Available Days</span>
                </label>
                <input type="text" name='availableDays' placeholder="Available Days" className="input input-bordered" required onChange={(e)=>{
                    setValues({...values, [e.target.name]:e.target.value})
                  }}/>

              </div>

            </div>
            <div className="flex gap-6">

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <textarea
                 name='address' className="textarea textarea-bordered  max-w-lg"
                  placeholder="Address"
                  rows={3} onChange={(e)=>{
                    setValues({...values, [e.target.name]:e.target.value})
                  }}
                />

              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Timings</span>
                </label>
                <input type="text" name='timings' placeholder="Timings" className="input input-bordered" required  onChange={(e)=>{
                    setValues({...values, [e.target.name]:e.target.value})
                  }}/>

              </div>
            </div>
            <div className="form-control">
              <label className="label text">Image</label>
              <input
                type="file" name='image'
                accept="image/*"
                className="file-input file-input-bordered w-full max-w-xs" onChange={(e)=>{
                  setValues({...values, [e.target.name]:e.target.value})
                }}
              />
            </div>

            <div className="form-control text-center">
              <button className="btn bg-[#0967C2] text-white" onClick={onSubmit}>Signup</button>
            </div>
            <div className='text-center'>
              Already have an account?<Link to={'/'} className='text-blue-600 underline'>Login</Link>
            </div>

          {/* </form> */}

        </div>

      </div>
    </div>
  )
}


