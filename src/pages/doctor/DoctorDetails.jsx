import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { doctorDetails } from '../../services/adminServices';

export default function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await doctorDetails(id);
        console.log('Full doctor details response:', res);
        setDoctor(res.doctorExist);
      } catch (err) {
        console.error('Error fetching doctor details:', err);
      }
    };

    if (id) fetchDoctor();
  }, [id]);

  if (!doctor) return <div>Loading doctor details...</div>;

  return (

    <>
      <div className="w-full max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/adminpanel?tab=doctors')}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back
        </button>
      </div>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

        {/* Doctor Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex gap-6  ">
          {/* Doctor Image */}
          {doctor.image && (
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-80 h-70 object-cover rounded-full shadow-md"
            />
          )}

          {/* Doctor Details */}
          <div className="flex-1 mt-10 p-6">
            <h1 className="text-2xl font-bold mb-2">{doctor.name}</h1>
            <p><strong> {doctor.qualification}</strong></p>
            <p><strong>Specialist:</strong> {doctor.department}</p>
            <p><strong>Email:</strong> {doctor.email}</p>
            <p><strong>Contact:</strong> {doctor.contact}</p>
            <p><strong>Available Days:</strong> {doctor.availableDays}</p>
            <p><strong>Timings:</strong> {doctor.timings}</p>
          </div>
        </div>

      </div>
    </>
  );
}
