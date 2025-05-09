
import React, { useEffect, useState } from 'react';
import { Eye, Pencil, Trash } from 'lucide-react';
import { toast } from 'react-toastify';
import { listAppointments, deleteAppointment } from '../../services/adminServices';
import CreateAppointment from './CreateAppointment';

export default function Appointments({ isDashboard = false }) {

  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    listAppointments()
      .then((res) => {
        console.log('Fetched appointments:', res);
        setAppointments(res || []);
        console.log(res);

      })
      .catch((err) => {
        console.error('Error fetching departments:', err);
        setAppointments([]);
      });

    }


  const handleEdit = (appointments) => {
    setSelectedAppointment(appointments);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await deleteAppointment(id);
        toast.success('Deleted')
        fetchAppointments();
      } catch (error) {
        console.error('Deletion error:', error);
      }
    }
  };

  const handleView = (appointment) => {
    alert(`Patient: ${appointment.patientname}\nDOB: ${appointment.dateOfBirth}\nContact: ${appointment.contact}\nDoctor: ${appointment.doctor.name}\nDate: ${new Date(appointment.date).toLocaleDateString()}\nTime: ${appointment.time}\nStatus: ${appointment.status}`);
  };




  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      appointment.patientname.toLowerCase().includes(search.toLowerCase())
  );

 

  return (

    <div className="p-4 dark:bg-gray-800 text-gray">
       {!isDashboard && (
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Appointments &gt;
          {!showForm && (
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                setSelectedAppointment(null);
                setShowForm(true);
              }}
            >
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
            placeholder="Search by patient"
            className="input input-bordered w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
      </div>
       )}
      {showForm  && !isDashboard ? (

        <CreateAppointment
          appointmentToEdit={selectedAppointment}
          onCancel={() => {
            setShowForm(false)
            fetchAppointments();
          }}
          onSuccess=
          {fetchAppointments}


        />
      ) : (
        <>
          <div className="overflow-x-auto dark:bg-gray-800 text-gray">
            <table className="table-lg dark:bg-gray-800">
              <thead className="bg-[#0967C2] text-white dark:bg-gray-800 text-gray-800 dark:text-white">
                <tr>
                  <th>#</th>
                  <th>Patient</th>
                  <th>DOB</th>
                  <th>Contact</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody >
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment, idx) => (
                    <tr key={appointment._id}>
                      <td>{idx + 1}</td>
                      <td>{appointment.patientname}</td>

                      <td> {new Date(appointment.dateOfBirth)
                        .toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}</td>

                      <td>{appointment.contact}</td>
                      <td>{appointment.doctor?.name || 'Unknown'}</td>

                      <td> {new Date(appointment.date)
                        .toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}</td>

                      <td> {(() => {
                        const [hourStr, minute] = appointment.time.split(":");
                        let hour = parseInt(hourStr, 10);
                        const suffix = hour >= 12 ? "PM" : "AM";
                        hour = hour % 12 || 12;
                        return `${hour}:${minute} ${suffix}`;
                      })()}</td>

                      <td>{appointment.status}</td>
                      <td className="flex gap-2">
                        <button className="btn btn-xs btn-ghost text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900" onClick={() => handleView(appointment)}>
                          <Eye size={16} />
                        </button>
                        <button className="btn btn-sm btn-ghost text-green-500 hover:bg-green-100 dark:hover:bg-green-900" onClick={() => handleEdit(appointment)}>
                          <Pencil size={16} />
                        </button>
                        <button className="btn btn-sm btn-ghost text-red-500 hover:bg-red-100 dark:hover:bg-red-900" onClick={() => handleDelete(appointment._id)} >
                          {/* onClick={() => handleDelete(appt._id)} */}
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">No appointments found</td>
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


