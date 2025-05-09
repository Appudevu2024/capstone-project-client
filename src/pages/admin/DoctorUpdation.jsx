import { Link, useNavigate,useParams } from 'react-router-dom'
import React, { useState,useContext,useEffect  } from 'react';
import { doctorDetails, doctorUpdation, listDepartment } from '../../services/adminServices';
import { toast } from 'react-toastify';
import { ThemeContext } from '../../context/ThemeContext';

export default function DoctorUpdtaion() {
  const theme  = useContext(ThemeContext);
  const [departments, setDepartments] = useState([]);
    useEffect(() => {
      listDepartment()
        .then((res) => setDepartments(res || []))
        .catch((err) => {
          console.error('Failed to load departments', err);
          setDepartments([]);
        });
    }, []);
  
  const navigate = useNavigate()
  const { id } = useParams();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    contact: '',
    qualification:'',
    gender: '',
    department: '',
    availableDays: '',
    address: '',
    timings: '',
    imageFile: null,
  });

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
       const res = await doctorDetails(id);
                       console.log('Full doctor details response:', res);
        const doctor = res.doctorExist; 
        if (!doctor) {
          toast.error('Doctor not found');
          return;
        }
  
        setValues({
          name: doctor.name || '',
          email: doctor.email || '',
          password: doctor.password||'',
          dateOfBirth: doctor.dob ? new Date(doctor.dob).toISOString().split('T')[0] : '',
          contact: doctor.contact || '',
          qualification:doctor.qualification|| '',
          gender: doctor.gender || '',
          department: doctor.department || '',
          availableDays: doctor.availableDays || '',
          address: doctor.address || '',
          timings: doctor.timings || '',
          imageFile: null,
        });
      } catch (error) {
        console.error('Error fetching doctor data:', error);
        toast.error('Failed to load doctor details');
      }
    };
  
    fetchDoctorDetails();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'imageFile' && value) {
          formData.append('image', value);
        } else {
          formData.append(key, value);
        }
      });

      formData.append('_id', id);

      await doctorUpdation(formData);

      toast.success('Doctor updated successfully!',{ position: "top-center" });
      navigate('/adminpanel?tab=doctors');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
              toast.error(error.response.data.message, { position: "top-center" });
            } else {
              toast.error("Failed updation", { position: "top-center" });
            };
            console.error("Update error:", error);
    }
  };

  return (
    <div className={`hero ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-base-200'}`}>
       <div className="card shrink-0 w-full max-w-md shadow-2xl card-body">
        <h2 className="text-2xl font-bold text-center mb-2">Update Doctor</h2>
        <div className="h-1 bg-[#0967C2] my-2 w-[250px]  mx-auto"></div>
         
          <div className="form-control">
                <label className="label"><span className="label-text">Name</span></label>
                <input type="text" name="name" className="input input-bordered w-full" required value={values.name}
                  onChange={(e) => setValues({ ...values, name: e.target.value })} />
             
                <label className="label"><span className="label-text">Email</span></label>
                <input type="email" name="email" className="input input-bordered w-full" required value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })} />
             
               <label className="label"><span className="label-text">Password</span></label>
              <input type="password" name="password" className="input input-bordered w-full" value={values.password}
                onChange={(e) => setValues({ ...values, password: e.target.value })} />
           
          
              <label className="label"><span className="label-text">Date Of Birth</span></label>
              <input type="date" name="dateOfBirth" className="input input-bordered w-full" required value={values.dateOfBirth}
                onChange={(e) => setValues({ ...values, dateOfBirth: e.target.value })} />
                <label className="label"><span className="label-text">Qualification</span></label>
              <input type="text" name="qualification" className="input input-bordered w-full" value={values.qualification}
                onChange={(e) => setValues({ ...values, qualification: e.target.value })} />
           
              <label className="label"><span className="label-text">Contact</span></label>
              <input type="tel" name="contact" className="input input-bordered w-full" required value={values.contact}
                onChange={(e) => setValues({ ...values, contact: e.target.value })} />
           

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
                <input type="radio" name="gender" value="female" className="radio checked:bg-blue-500" checked={values.gender === 'female'} onChange={(e) => {
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
              <label className="label"><span className="label-text">Available Days</span></label>
              <input type="text" name="availableDays" className="input input-bordered w-full" required value={values.availableDays}
                onChange={(e) => setValues({ ...values, availableDays: e.target.value })} />
           
                <label className="label"><span className="label-text">Address</span></label>
              <textarea name="address" className="textarea textarea-bordered w-full" rows={3} value={values.address}
                onChange={(e) => setValues({ ...values, address: e.target.value })} />
            
              <label className="label"><span className="label-text">Timings</span></label>
              <input type="text" name="timings" className="input input-bordered w-full" required value={values.timings}
                onChange={(e) => setValues({ ...values, timings: e.target.value })} />
            

             <label className="label text">Image</label>
            <input type="file" name="image" accept="image/*" className="file-input file-input-bordered w-full"
              onChange={(e) => setValues({ ...values, imageFile: e.target.files[0] })} />
        
          <div className="form-control text-center">
            <button className="btn bg-[#0967C2] text-white w-full" onClick={onSubmit}>Update</button>
          </div>
        </div>
      </div>
      </div>
   
  );
}