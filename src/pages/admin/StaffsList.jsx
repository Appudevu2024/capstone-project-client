import React, { useEffect, useState } from 'react';
import { Eye, Pencil, Trash } from 'lucide-react';
import { toast } from 'react-toastify';
import { createStaff, deleteStaff, listAllStaffs } from '../../services/staffServices';
import StaffCreation from './StaffCreation';

export default function StaffLists() {
  const [staffs, setStaffs] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleView = (staff) => {
    alert(`Name: ${staff.name}\nDOB: ${staff.email}\nContact: ${staff.contact}\nDOB: ${new Date(staff.dob).toLocaleDateString()}\nAddress:${staff.address}\nRole: ${staff.staffrole}`);
  };

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff?')) {
      try {
        await deleteStaff(id);
        toast.success("Deleted successfully");
        fetchStaffs();
      } catch (err) {
        console.error("Error deleting staff:", err);
      }
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = () => {
    listAllStaffs()
      .then((res) => {
        setStaffs(res || []);
      })
      .catch((err) => {
        console.error('Error fetching staff:', err);
        setStaffs([]);
      });
  };

  const filteredStaffs = staffs.filter(
    (staff) =>
      staff.name.toLowerCase().includes(search.toLowerCase()) ||
      staff.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 dark:bg-gray-800 text-gray">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          Staffs &gt;
          {showForm ? (
            <>
              <span className="text-gray-500 cursor-pointer" onClick={() => {
                setShowForm(false);
                setSelectedStaff(null);
                fetchStaffs();
              }}>
                <span className="underline">Back to List</span>
              </span>
            </>
          ) : (
            <>
              <span className="text-blue-600 cursor-pointer" onClick={() => setShowForm(true)}>
                Add New
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

      {showForm ? (
        <StaffCreation
          staffToEdit={selectedStaff}
          onCancel={() => {
            setShowForm(false);
            setSelectedStaff(null);
          }}
          onSuccess={() => {
            fetchStaffs();
            setShowForm(false);
            setSelectedStaff(null);
          }}
        />
      ) : (
        <div className="overflow-x-auto dark:bg-gray-800 text-gray">
          <table className="table-lg dark:bg-gray-800">
            <thead className='bg-[#0967C2] text-white dark:bg-gray-800 text-gray-800 dark:text-white'>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaffs.length > 0 ? (
                filteredStaffs.map((staff, index) => (
                  <tr key={staff._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="w-12 rounded-full">
                          <img src={staff.image || 'https://via.placeholder.com/150'} />
                        </div>
                      </div>
                    </td>
                    <td>{staff.name}</td>
                    <td>{staff.email}</td>
                    <td>{staff.gender}</td>
                    <td>{staff.contact}</td>
                    <td>{staff.staffrole}</td>
                    <td>{staff.address}</td>
                    <td className="flex items-center space-x-2">
                      <button
                        className="btn btn-sm btn-ghost text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900"
                        onClick={() => handleView(staff)}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="btn btn-sm btn-ghost text-green-500 hover:bg-green-100 dark:hover:bg-green-900"
                        onClick={() => handleEdit(staff)}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        className="btn btn-sm btn-ghost text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                        onClick={() => handleDelete(staff._id)}
                      >
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    No Staffs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
