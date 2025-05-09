import React, { useEffect, useState } from 'react';
import { Eye, Pencil, Trash } from 'lucide-react';
import {  deleteDepartment, listDepartment } from '../../services/adminServices';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddDepartments from './AddDepartments';

export default function Departments() {
  const [department, setDepartment] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const navigate = useNavigate();



  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await deleteDepartment(id);
        toast.success('Deleted')
        fetchDepartment();
      } catch (error) {
        console.error('Deletion error:', error);
      }
    }
  };

  const handleView = (department) => {
    alert(`Department: ${department.name}\nDescription: ${department.description}`);
  };


  useEffect(() => {
    fetchDepartment();
  }, []);

  const fetchDepartment = () => {
    listDepartment()
      .then((res) => {
        setDepartment(res|| []);
        console.log(res);
        
      })
      .catch((err) => {
        console.error('Error fetching departments:', err);
        setDepartment([]);
      });
  };

  const filteredDepartment = department.filter(
    (department) =>
      department.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 dark:bg-gray-800 text-gray">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          Departments &gt;
          {!showForm && (
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                setSelectedDepartment(null);
                setShowForm(true);
              }}
            >
              {/* {' '} */}
              Add New
            </span>
          )}
          {showForm && (
            <span
              className="text-gray-500 cursor-pointer"
              onClick={() => setShowForm(false)}
            >
              {/* {' '} */}
              <span className="underline">Back to List</span>
            </span>
          )}
        </h2>
        {!showForm && (
            <input
              type="text"
              placeholder="Search by blood group"
              className="input input-bordered w-72"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
      </div>

      {showForm ? ( 
        
        <AddDepartments
        departmentToEdit={selectedDepartment}
          onCancel={() => {
            setShowForm(false)
            fetchDepartment();
          }}
          onSuccess=      
            {fetchDepartment}
        
         
        />
      ) : (
        <>
         

          <div className="overflow-x-auto dark:bg-gray-800 text-gray">
            <table className="table-lg dark:bg-gray-800">
              <thead className="bg-[#0967C2] text-white dark:bg-gray-800 text-gray-800 dark:text-white">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepartment.length > 0 ? (
                  filteredDepartment.map((department, index) => (
                    <tr key={department._id}>
                      <td>{index + 1}</td>
                      <td>{department.name}</td>
                      <td className="whitespace-normal max-w-xs break-words">{department.description}</td>
                      <td className="flex gap-2">
                        <button
                          className="btn btn-xs btn-ghost text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900"
                          onClick={() => handleView(department)}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="btn btn-sm btn-ghost text-green-500 hover:bg-green-100 dark:hover:bg-green-900"
                          onClick={() => handleEdit(department)}
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          className="btn btn-sm btn-ghost text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                          onClick={() => handleDelete(department._id)}
                        >
                          <Trash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No details found.
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
