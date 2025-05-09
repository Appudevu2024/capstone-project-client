import React, { useState,useContext, useEffect } from 'react'
import { addBloodGroup,updateBloodbank } from '../../services/adminServices';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThemeContext } from '../../context/ThemeContext';


function AddBloodGroup({bloodGroupToEdit, onSuccess, onCancel }) {

 const theme  = useContext(ThemeContext);
 const navigate= useNavigate();
  const [values, setValues] = useState({
    bloodgroup: '',
    noofbagsavailable: ''
  })

  useEffect(() => {
    if (bloodGroupToEdit) {
      console.log(bloodGroupToEdit)
      setValues({
        _id: bloodGroupToEdit._id,
        bloodgroup: bloodGroupToEdit.bloodgroup,
        noofbagsavailable: bloodGroupToEdit.noofbagsavailable,
      });
    }
  }, [bloodGroupToEdit]);


  const onSubmit = async (e) => {
    //e.preventDefault();
  
    try {
      if (bloodGroupToEdit) {
        await updateBloodbank(values); // ⬅️ pass ID too
        toast.success('Updated successfully');
      } 
      else{
      const result = await addBloodGroup(values);
      console.log("Bloodgroup added:", result);
      toast.success('Saved successfully')
    }
      setValues({
        bloodgroup: '',
        noofbagsavailable: ''
      });
      if (onSuccess) onSuccess(); 
      if (onCancel) onCancel(); 
       
         } catch (err) {
      console.log(err)
      toast.error('Updation failed', {
        position: 'top-center'
      })
    }
  }

  return (
    
<div className={`hero ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-base-200'}`}>

      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* Login Card */}

        <div className="card shrink-0 w-full max-w-md  shadow-2xl  card-body ">
        <h2 className="text-2xl font-bold text-center mb-2">Bloodbank Info</h2>
        <div className="h-1 bg-[#0967C2] my-2 w-[250px]  mx-auto"></div>
          {/* <form className="card-body"> */}
          <div className="form-control">
          
              <div>
                <label className="label">
                  <span className="label-text">Blood Group</span>
                </label>
                <input type="text" name='bloodgroup' placeholder="bloodgroup" className="input input-bordered w-full" value={values.bloodgroup || ''} required    onChange={(e) => {
                  setValues({ ...values, [e.target.name]: e.target.value })
                }} />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">No.of Bags Available</span>
                </label>
                <input type="text" placeholder="no.of bags" name='noofbagsavailable' className="input input-bordered w-full" value={values.noofbagsavailable || ''} required   onChange={(e) => {
                  setValues({ ...values, [e.target.name]: e.target.value })
                }} />
              </div>
           
          </div>

          <div className="form-control text-center">
            <button className="btn bg-[#0967C2] text-white" onClick={onSubmit}>
            {bloodGroupToEdit ? 'Update ' : 'Save'}
            </button>
          </div>


          {/* </form> */}

        </div>

      </div>
    </div>
  )
}

export default AddBloodGroup
