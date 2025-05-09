import React, { useState,useContext, useEffect } from 'react'
import { addDepartment,updateDepartment } from '../../services/adminServices';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThemeContext } from '../../context/ThemeContext';


function AddDepartments({departmentToEdit, onSuccess, onCancel }) {

 const theme  = useContext(ThemeContext);
  const [values, setValues] = useState({
    name: '',
    description: ''
  })

  useEffect(() => {
    if (departmentToEdit) {
      console.log(departmentToEdit)
      setValues({
        _id: departmentToEdit._id,
        name: departmentToEdit.name,
        description: departmentToEdit.description,
      });
    }
  }, [departmentToEdit]);



  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (departmentToEdit) {
        await updateDepartment(values);
        toast.success('Updated successfully');
      } else {
        const result = await addDepartment(values);
        console.log("Department added:", result);
        toast.success('Saved successfully');
      }
  
      setValues({
        name: '',
        description: ''
      });
  
      if (onSuccess) onSuccess();
      if (onCancel) onCancel();
  
      // navigate('/adminpanel?tab=departments');
    } catch (err) {
      console.error(err);
      toast.error('Action failed. Please try again.', {
        position: 'top-center'
      });
    }
  };

  return (
    
<div className={`hero ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-base-200'}`}>

      <div className="hero-content flex-col lg:flex-row-reverse">
      
        
        <div className="card shrink-0 w-full max-w-md  shadow-2xl  card-body ">
        <h2 className="text-2xl font-bold text-center mb-2">Department Info</h2>
        <div className="h-1 bg-[#0967C2] my-2 w-[250px]  mx-auto"></div>
       
          {/* <form className="card-body"> */}
          <div className="form-control">
          
              <div>
             
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name='name' placeholder="name of Dept." className="input input-bordered w-full" value={values.name || ''} required    onChange={(e) => {
                  setValues({ ...values, [e.target.name]: e.target.value })
                }} />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea rows={3}  placeholder="Dept. description" name='description' className="textarea textarea-bordered  max-w-lg" value={values.description || ''} required   onChange={(e) => {
                  setValues({ ...values, [e.target.name]: e.target.value })
                }} />
              </div>
           
          </div>

          <div className="form-control text-center">
            <button className="btn w-full bg-[#0967C2] text-white" onClick={onSubmit}>
              {departmentToEdit ? 'Update  ' : 'Save'}

            </button>
          </div>


          {/* </form> */}

        </div>

      </div>
    </div>
  )
}

export default AddDepartments
