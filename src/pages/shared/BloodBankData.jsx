import React, { useEffect, useState } from 'react';
import { Eye, Pencil, Trash } from 'lucide-react';
import { listBloodBank,deleteBloodgroup } from '../../services/adminServices';
import AddBloodGroup from '../admin/AddBloodGroup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function BloodBankData() {
  const [bloodbank, setBloodbank] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
  const navigate = useNavigate();



  const handleEdit = (bloodgroup) => {
    setSelectedBloodGroup(bloodgroup);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blood group?')) {
      try {
        await deleteBloodgroup(id);
        toast.success('Deleted')
        fetchBloodBank();
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const handleView = (bloodgroup) => {
    alert(`Blood Group: ${bloodgroup.bloodgroup}\nAvailable Bags: ${bloodgroup.noofbagsavailable}`);
  };


  useEffect(() => {
    fetchBloodBank();
  }, []);

  const fetchBloodBank = () => {
    listBloodBank()
      .then((res) => {
        setBloodbank(res|| []);
        console.log(res);
        
      })
      .catch((err) => {
        console.error('Error fetching blood bank:', err);
        setBloodbank([]);
      });
  };

  const filteredBloodbank = bloodbank.filter(
    (bloodgroup) =>
      bloodgroup.bloodgroup.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 dark:bg-gray-800 text-gray">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          BloodBank &gt;
          {!showForm && (
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                setSelectedBloodGroup(null);
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
        
        <AddBloodGroup
        bloodGroupToEdit={selectedBloodGroup}
          onCancel={() => {
            setShowForm(false)
            fetchBloodBank();
          }}
          onSuccess=      
            {fetchBloodBank}
        
         
        />
      ) : (
        <>
         

          <div className="overflow-x-auto dark:bg-gray-800 text-gray">
            <table className="table-lg dark:bg-gray-800">
              <thead className="bg-[#0967C2] text-white dark:bg-gray-800 text-gray-800 dark:text-white">
                <tr>
                  <th>#</th>
                  <th>Blood Group</th>
                  <th>No. of Bags available</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBloodbank.length > 0 ? (
                  filteredBloodbank.map((bloodgroup, index) => (
                    <tr key={bloodgroup._id}>
                      <td>{index + 1}</td>
                      <td>{bloodgroup.bloodgroup}</td>
                      <td>{bloodgroup.noofbagsavailable}</td>
                      <td className="flex items-center space-x-2">
                        <button
                          className="btn btn-sm btn-ghost text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900"
                          onClick={() => handleView(bloodgroup)}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="btn btn-sm btn-ghost text-green-500 hover:bg-green-100 dark:hover:bg-green-900"
                          onClick={() => handleEdit(bloodgroup)}
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          className="btn btn-sm btn-ghost text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                          onClick={() => handleDelete(bloodgroup._id)}
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
