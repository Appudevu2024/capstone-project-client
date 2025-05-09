// components/StaffDashboard/StaffPatients.jsx
import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { getAllPatients } from '../../services/staffServices';
import { Link } from 'react-router-dom';
import { usePatientContext } from '../../context/PatientContext';

const StaffPatients = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const { vitalsAddedPatients } = usePatientContext();

  useEffect(() => {
    getAllPatients().then(setPatients).catch(console.error);
  }, []);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.doctor?.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (patient) => {
    alert(`Name: ${patient.name}\nDOB: ${patient.dateOfBirth}\nContact: ${patient.contact}\nConsulting Doctor: ${patient.doctor?.name}\nVisited Date: ${new Date(patient.appointment?.date).toLocaleDateString()}\nTime: ${patient.appointment?.time}`);
  };

  const handleVitalsAdded = (patientId) => {
    vitalsAddedPatients((prev) => [...prev, patientId]);
};

  return (
    <div className="p-4">
      <div className="flex  gap-72 items-center mb-4">
        <h2 className="text-xl font-semibold">Patients</h2>
        <input
          type="text"
          placeholder="Search by patient"
          className="input input-bordered w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="table-lg">
        <thead className="bg-[#0967C2] text-white">
          <tr>
            <th>#</th>
            <th>Patient Name</th>
            <th>DOB</th>
            <th>Contact</th>
            <th>Consulting Doctor</th>
            <th>Visited Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient, idx) => (
              <tr key={patient._id}>
                <td>{idx + 1}</td>
                <td>{patient.name}</td>
                <td>{new Date(patient.dateOfBirth).toLocaleDateString('en-GB')}</td>
                <td>{patient.contact || 'N/A'}</td>
                <td>{patient.doctor?.name || 'Unknown'}</td>
                <td>{new Date(patient.appointment?.date).toLocaleDateString('en-GB')}</td>
                <td>
                  {/* {patient.appointment?.time || 'N/A'} */}
                  {patient.appointment?.time
                                                    ? (() => {
                                                        const [hourStr, minute] = patient.appointment.time.split(":");
                                                        let hour = parseInt(hourStr, 10);
                                                        const suffix = hour >= 12 ? "PM" : "AM";
                                                        hour = hour % 12 || 12;
                                                        return `${hour}:${minute} ${suffix}`;
                                                    })()
                                                    : 'N/A'}
                  </td>
                <td className="flex gap-2">
                  <button onClick={() => handleView(patient)} className="btn btn-xs btn-ghost text-blue-500">
                    <Eye size={16} />
                  </button>
                  <Link
                    to={`/staffpanel/patientdetails/${patient._id}`}
                    className="btn btn-sm btn-ghost text-blue-500 underline"
                    disabled={vitalsAddedPatients.includes(patient._id)}
                    
                  >
                    Add Vitals
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No patients found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StaffPatients;
