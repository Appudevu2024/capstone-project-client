import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPatientById, updatePatientVitals } from '../../services/staffServices';
import { toast } from 'react-toastify';
import { usePatientContext } from '../../context/PatientContext';

export default function AddPatientDetails() {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const navigate=useNavigate()
    const [vitals, setVitals] = useState({
        bloodPressure: '',
        temperature: '',
        pulseRate: '',
        respirationRate: '',
        diagnostic: '',
    });

    const { handleVitalsAdded } = usePatientContext();

    useEffect(() => {
        getPatientById(id)
            .then((response) => {
                console.log('Full API Response:', response); // Log the entire response object
                if (response && response.data) {
                    const patientData = response.data.appointment;
                    const doctorData = response.data.doctor
                    console.log('Fetched patient data:', patientData);
                    setPatient({
                        name: patientData.patientname || '',
                        contact: patientData.contact || '',
                        dateOfBirth: patientData.dateOfBirth || '',
                        date: patientData.createdAt || '',
                        time: patientData.time || '',
                        doctor: patientData.doctor?._id || '',
                        doctorname: doctorData.name || '',
                        // Add other properties as needed
                    });
                    setVitals(patientData.vitals || {
                        bloodPressure: '',
                        temperature: '',
                        pulseRate: '',
                        respirationRate: '',
                        diagnostic: '',
                    });
                } else {
                    toast.error('Patient not found');
                }
            })
            .catch((error) => {
                toast.error('Error fetching patient details');
                console.error('Error fetching patient details:', error);
            });
    }, [id]);





    const handleChange = (e) => {
        setVitals({ ...vitals, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!vitals.bloodPressure || !vitals.temperature || !vitals.pulseRate || !vitals.respirationRate) {
            toast.error('All vital fields are required');
            return;
        }

        try {
            await updatePatientVitals(id, vitals);
            handleVitalsAdded(id);

            
            toast.success('Patient vitals updated', { position: 'top-center' });
            navigate('/staffpanel?tab=patients');
        } catch (error) {
            toast.error('Error updating patient vitals');
        }
    };

    if (!patient) return (
        <div className="flex justify-center items-center">
            <div className="loader">Loading...</div>
        </div>
    );

    return (
        <div className=" flex items-center justify-center bg-base-200">
            <div className="p-6 w-full max-w-4xl">

                <div className="card bg-white shadow-md p-6 mb-6 rounded-lg border">
                    <h2 className="text-2xl font-semibold mb-4 text-gray">Patient Details</h2>
                    <div className="space-y-2">
                        <p className='text-lg text-[#0967C2]'><strong className=" text-lg font-semibold">Name:</strong> {patient.name}</p>
                        <p className='text-lg text-[#0967C2]'><strong className="text-lg font-semibold">Contact:</strong> {patient.contact}</p>
                        <p className='text-lg text-[#0967C2]'><strong className="text-lg font-semibold">Date of Birth:</strong> {new Date(patient.dateOfBirth)
                            .toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            })}</p>
                        <p className='text-lg text-[#0967C2]'><strong className="text-lg font-semibold">Contact No.:</strong> {patient.contact}</p>

                        <p className='text-lg text-[#0967C2]'><strong className="text-lg font-semibold">Doctor:</strong> {patient.doctorname}</p>
                        <p className='text-lg text-[#0967C2]'><strong className="text-lg font-semibold">Date:</strong> {new Date(patient.Date)
                            .toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            })}{' '}{(() => {
                                const [hourStr, minute] = patient.time.split(":");
                                let hour = parseInt(hourStr, 10);
                                const suffix = hour >= 12 ? "PM" : "AM";
                                hour = hour % 12 || 12;
                                return `${hour}:${minute} ${suffix}`;
                            })()}</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <input name="bloodPressure" value={vitals.bloodPressure} onChange={handleChange} placeholder="Blood Pressure" className="input input-bordered" />
                    <input name="temperature" value={vitals.temperature} onChange={handleChange} placeholder="Body Temperature" className="input input-bordered" />
                    <input name="pulseRate" value={vitals.pulseRate} onChange={handleChange} placeholder="Pulse Rate" className="input input-bordered" />
                    <input name="respirationRate" value={vitals.respirationRate} onChange={handleChange} placeholder="Respiration Rate" className="input input-bordered" />
                    <textarea name="diagnostic" value={vitals.diagnostic} onChange={handleChange} placeholder="Diagnostic" className="textarea textarea-bordered col-span-2" />
                    <div className="col-span-2 flex justify-center ">
                        <button type="submit" className="btn bg-[#0967C2] text-white min-w-[200px]">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
