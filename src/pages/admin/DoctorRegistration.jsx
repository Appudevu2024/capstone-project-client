import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useContext, useEffect } from 'react';
import { doctorRegister, listDepartment } from '../../services/adminServices';
import { toast } from 'react-toastify';
import { ThemeContext } from '../../context/ThemeContext';

export default function DoctorRegistration() {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate()


  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    listDepartment()
      .then((res) => setDepartments(res || []))
      .catch((err) => {
        console.error('Failed to load departments', err);
        setDepartments([]);
      });
  }, []);

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    qualification: '',
    dateOfBirth: '',
    contact: '',
    gender: '',
    department: '',
    availableDays: '',
    address: '',
    timings: '',
    image: '',
  })

  const onSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("qualification", values.qualification);
    formData.append("dob", values.dateOfBirth);
    formData.append("gender", values.gender);
    formData.append("contact", values.contact);
    formData.append("address", values.address);
    formData.append("department", values.department);
    formData.append("availableDays", values.availableDays);
    formData.append("timings", values.timings);
    formData.append("image", values.imageFile); // must be a File object

    try {
      const result = await doctorRegister(formData);
      console.log("Doctor registered:", result);
      toast.success('Saved successfully',{ position: "top-center" })

      setValues({
        name: '',
        email: '',
        password: '',
        qualification: '',
        dateOfBirth: '',
        gender: '',
        contact: '',
        address: '',
        department: '',
        availableDays: '',
        timings: '',
        imageFile: null
      });
     
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.error, {
        position: 'top-center'
      })
    }
  }
  return (

    <div className={`hero ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-base-200'}`}>

      <div className="card shrink-0 w-full max-w-md  shadow-2xl  card-body ">
        <h2 className="text-2xl font-bold text-center mb-2">Add Doctor</h2>
        <div className="h-1 bg-[#0967C2] my-2 w-[250px]  mx-auto"></div>
        {/* <form className="card-body"> */}
        <div className="form-control">

          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name='name' className="input input-bordered w-full" required  value={values.name} onChange={(e) => {
            setValues({ ...values, [e.target.name]: e.target.value })
          }} />

          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' className="input input-bordered w-full" required value={values.email} onChange={(e) => {
            setValues({ ...values, [e.target.name]: e.target.value })
          }} />

          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' className="input input-bordered w-full" required value={values.password} onChange={(e) => {
            setValues({ ...values, [e.target.name]: e.target.value })
          }} />



          <label className="label">
            <span className="label-text">Date Of Birth</span>
          </label>
          <input type="date" name='dateOfBirth' className="input input-bordered w-full" required  value={values.dateOfBirth} onChange={(e) => {
            setValues({ ...values, [e.target.name]: e.target.value })
          }} />

          <label className="label">
            <span className="label-text">Contact</span>
          </label>
          <input type="tel" name='contact' className="input input-bordered w-full" required value={values.contact} onChange={(e) => {
            setValues({ ...values, [e.target.name]: e.target.value })
          }} />

          <div className="flex gap-2 ">

            <label className="label">
              <span className="label-text">Gender:</span>
            </label>
            <label className="label cursor-pointer ">

              <input type="radio" name="gender" value="male" className="radio checked:bg-blue-500" checked={values.gender === 'male'} onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value })
              }} />
              <span className="label-text">Male</span>
            </label>

            <label className="label cursor-pointer">
              <input type="radio" name="gender" value="female" className="radio checked:bg-blue-500"  checked={values.gender === 'female'} onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value })
              }} />

              <span className="label-text">Female</span>
            </label>
            <label className="label cursor-pointer">

              <input type="radio" name="gender" value="others" className="radio checked:bg-blue-500" checked={values.gender === 'others'} onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value })
              }} />
              <span className="label-text">Others</span>
            </label>

          </div>
          <label className="label">
            <span className="label-text">Qualification</span>
          </label>
          <input type="text" name='qualification' className="input input-bordered w-full" required value={values.qualification} onChange={(e) => {
            setValues({ ...values, [e.target.name]: e.target.value })
          }} />

          <label className="label">
            <span className="label-text font-semibold">Departments</span>
          </label>
          <select
            name="department"
            className="select select-bordered w-full"
            required
            value={values.department}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          >
            <option disabled value="">
              Choose a department
            </option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>

          <label className="label">
            <span className="label-text">Available Days</span>
          </label>
          <input type="text" name='availableDays' className="input input-bordered w-full" required value={values.availableDays} onChange={(e) => {
            setValues({ ...values, [e.target.name]: e.target.value })
          }}
          />

          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <textarea
            name='address' className="textarea textarea-bordered  w-full" value={values.address}
            rows={3} onChange={(e) => {
              setValues({ ...values, [e.target.name]: e.target.value })
            }}
          />

          <label className="label">
            <span className="label-text">Timings</span>
          </label>
          <input type="text" name='timings' className="input input-bordered w-full" required value={values.timings} onChange={(e) => {
            setValues({ ...values, [e.target.name]: e.target.value })
          }} />

          <label className="label text">Image</label>
          <input
            type="file" name='image'
            accept="image/*"
            className="file-input file-input-bordered w-full " onChange={(e) => {
              setValues({ ...values, imageFile: e.target.files[0] })
            }}
          />

          <div className="form-control text-center">
            <button className="btn bg-[#0967C2] text-white w-full" onClick={onSubmit}>Register</button>
          </div>


          {/* </form> */}

        </div>

      </div>
    </div>
  )
}


