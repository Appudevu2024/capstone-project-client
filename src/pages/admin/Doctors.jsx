import React, { useEffect, useState } from 'react';
import { listDoctors } from '../../services/loginServices';
import DoctorRegistration from './DoctorRegistration';
import { Eye, Pencil, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { deleteDoctor } from '../../services/adminServices';
import { toast } from 'react-toastify';

export default function Doctors() {

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();


  const handleView = (doctor) => {
    navigate(`/adminpanel/doctors/doctorDetails/${doctor._id}`);
  };

  const handleEdit = (doctor) => {
    navigate(`/adminpanel/doctorUpdation/${doctor._id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        const res = await deleteDoctor(id);
        toast.success("Deleted successfully")
        console.log(res.message);
        fetchDoctors();

      } catch (err) {
        console.error("Error deleting doctor:", err);
      }
    }
  };

  useEffect(() => {
    fetchDoctors();

  }, []);

  const fetchDoctors = () => {
    listDoctors()
      .then((res) => {
        setDoctors(res || []);
      })
      .catch((err) => {
        console.error('Error fetching doctors:', err);
        setDoctors([]);
      });
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 dark:bg-gray-800 text-gray">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          Doctors &gt;
          {!showForm && (
            <>
              {/* {' '} */}
              <span className="text-blue-600 cursor-pointer" onClick={() => setShowForm(true)}>
                Add New
              </span>
            </>
          )}
          {showForm && (
            <>
              {/* {' '} */}
              <span className="text-gray-500 cursor-pointer" onClick={() => {
                setShowForm(false);
                fetchDoctors();
              }
              }>
                <span className="underline">Back to List</span>
              </span>
            </>
          )}
        </h2>
        {!showForm && (
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      </div>

      {showForm  ? (
        <DoctorRegistration onCancel={() => setShowForm(false)} onSuccess={fetchDoctors} />
      ) : (
        <>


          <div className="overflow-x-auto dark:bg-gray-800 text-gray">
            <table className="table-lg dark:bg-gray-800 ">
              <thead className='  bg-[#0967C2] text-white  dark:bg-gray-800 text-gray-800 dark:text-white'>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  {/* <th>DOB</th> */}
                  <th>Gender</th>
                  <th>Contact</th>
                  <th>Qualification</th>
                  <th>Department</th>
                  {/* <th>Days</th>
                  <th>Timings</th>*/}
                  <th>Actions</th> 
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor, index) => (
                    <tr key={doctor._id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="avatar">
                          <div className="w-12 rounded-full">
                            <img src={doctor.image || 'https://via.placeholder.com/150'} />
                          </div>
                        </div>
                      </td>
                      <td>{doctor.name}</td>
                      <td>{doctor.email}</td>
                      {/* <td>{doctor.dob ? new Date(doctor.dob).toISOString().split('T')[0] : ''}</td> */}
                      <td>{doctor.gender}</td>
                      <td>{doctor.contact}</td>
                      <td>{doctor.qualification}</td>
                      <td>{doctor.department}</td>
                      {/* <td>{doctor.availableDays}</td>
                      <td>{doctor.timings}</td> */}
                      <td className="flex items-center space-x-2">
                        <button className="btn btn-sm btn-ghost text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900" onClick={() => handleView(doctor)}>
                          <Eye size={18} />
                        </button>
                        <button className="btn btn-sm btn-ghost text-green-500 hover:bg-green-100 dark:hover:bg-green-900" onClick={() => handleEdit(doctor)} >
                          <Pencil size={18} />
                        </button>
                        <button className="btn btn-sm btn-ghost text-red-500 hover:bg-red-100 dark:hover:bg-red-900" onClick={() => handleDelete(doctor._id)}
                        >
                          <Trash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center">
                      No doctors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}