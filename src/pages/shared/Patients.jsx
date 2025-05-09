import React, { useEffect, useState } from 'react';
import { Eye, Pencil, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { deletePatient, getAllPatients } from '../../services/adminServices';
import { toast } from 'react-toastify';

export default function Patients() {

    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = () => {
        getAllPatients()
            .then((res) => {
                console.log('Fetched patients are:', res);
                setPatients(res || []);
                console.log(res);

            })
            .catch((err) => {
                console.error('Error fetching patients:', err);
                setPatients([]);
            });
    };

    const handleEdit = (patients) => {
        setSelectedPatient(patients);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            try {
                await deletePatient(id);
                toast.success('Deleted')
                fetchPatients();
            } catch (error) {
                console.error('Deletion error:', error);
            }
        }
    };


    const handleView = (patient) => {
        alert(`Name: ${patient.name}\nDOB: ${patient.dateOfBirth}\nContact: ${patient.contact}\nConsulting Doctor: ${patient.doctor.name}\nVisited Date: ${new Date(patient.appointment.date).toLocaleDateString()}\nTime: ${patient.appointment.time}`);
    };

    const filteredPatients = patients.filter(
        (patient) =>
            (patient.status !== 'completed') &&
            (patient.name.toLowerCase().includes(search.toLowerCase()) ||
                patient.doctor.name.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="p-4 dark:bg-gray-800 text-gray">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                    Patients
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

            {!showForm &&
                <>
                    <div className="overflow-x-auto dark:bg-gray-800 text-gray">
                        <table className="table-lg dark:bg-gray-800">
                            <thead className="bg-[#0967C2] text-white dark:bg-gray-800 text-gray-800 dark:text-white">
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
                            <tbody >
                                {filteredPatients.length > 0 ? (
                                    filteredPatients.map((patient, idx) => (
                                        <tr key={patient._id} className={patient.status === 'completed' ? 'opacity-50 pointer-events-none' : ''}>
                                            <td>{idx + 1}</td>
                                            <td>{patient.name}</td>

                                            <td>
                                                {patient.dateOfBirth
                                                    ? new Date(patient.dateOfBirth).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                    })
                                                    : 'N/A'}
                                            </td>

                                            <td>{patient.contact || 'N/A'}</td>

                                            <td>{patient.doctor?.name || 'Unknown'}</td>

                                            <td>
                                                {patient.appointment?.date
                                                    ? new Date(patient.appointment.date).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                    })
                                                    : 'N/A'}
                                            </td>

                                            <td>
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
                                                <button className="btn btn-xs btn-ghost text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900" onClick={() => handleView(patient)}>
                                                    <Eye size={16} />
                                                </button>
                                                <button className="btn btn-sm btn-ghost text-green-500 hover:bg-green-100 dark:hover:bg-green-900" onClick={() => handleEdit(patient)}>
                                                    <Pencil size={16} />
                                                </button>
                                                <button className="btn btn-sm btn-ghost text-red-500 hover:bg-red-100 dark:hover:bg-red-900" onClick={() => handleDelete(patient._id)} >
                                                    <Trash size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">No Patients found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            }
        </div>
    );
}