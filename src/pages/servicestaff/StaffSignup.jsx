
import { Link } from 'react-router-dom'
import React, { useState } from 'react';

export default function StaffSignup() {
  const [role, setRole] = useState('');
  return (
        <div className="hero bg-base-200">
    
          <div className="hero-content flex-col lg:flex-row-reverse">
    
           
    
            {/* Login Card */}
    
            <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
              
              <form className="card-body">
                <div className="form-control">
                  <div className="flex gap-6">
                    <div>
                      <label className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <input type="text" placeholder="Name" className="input input-bordered w-full" />
                    </div>
    
                    <div>
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input type="email" placeholder="Email" className="input input-bordered w-full" />
                    </div>
                  </div>
                </div>
    
                <div className="flex gap-6">
                  <div>
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="Password" className="input input-bordered w-full" />
                  </div>
    
                  <div>
                    <label className="label">
                      <span className="label-text">Confirm password</span>
                    </label>
                    <input type="password" placeholder="Confirm password" className="input input-bordered w-full" />
                  </div>
                </div>
    
    
                <div className="flex gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Date Of Birth</span>
                    </label>
                    <input type="date" placeholder="Date Of Birth" className="input input-bordered w-full" />
                  </div>
    
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Contact</span>
                    </label>
                    <input type="tel" placeholder="Mobile" className="input input-bordered" />
                  </div>
                </div>
    
                <div className="flex gap-6">
                  <div>
                    <label className="label">
                      <span className="label-text">Gender:</span>
                    </label>
                    <label className="label cursor-pointer ">
                     
                      <input type="radio" name="gender" value="male" className="radio checked:bg-blue-500" />
                      <span className="label-text">Male</span>
                    </label>
    
                    <label className="label cursor-pointer">
                      
                      <input type="radio" name="gender" value="female" className="radio checked:bg-blue-500" />
                      <span className="label-text">Female</span>
                    </label>
                    <label className="label cursor-pointer">
                     
                      <input type="radio" name="gender" value="others" className="radio checked:bg-blue-500" />
                      <span className="label-text">Others</span>
                    </label>
                  </div>
                </div>
    
    
    
                <div className="flex gap-6">
    
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text font-semibold">Role</span>
                    </label>
                    <select className="select select-bordered"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}>
                      <option disabled selected>Choose a role</option>
                      <option>Staff Nurse</option>
                      <option>Receptionist</option>
                      <option>Laboratory technician</option>
                      <option>X-ray technician</option>
                      
                    </select>
                  </div>
                  
                </div>
                <div className="flex gap-6">
    
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Address</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered"
                      placeholder="Address"
                      rows={3}
                    />
    
                  </div>
                 
                </div>
                <div className="form-control">
                  <label className="label text">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                </div>
    
                <div className="form-control text-center">
                  <button className="btn bg-[#0967C2] text-white">Signup</button>
                </div>
                <div className='text-center'>
                  Already have an account?<Link to={'/'} className='text-blue-600 underline'>Login</Link>
                </div>
    
              </form>
    
            </div>
    
          </div>
        </div>
  )
}

