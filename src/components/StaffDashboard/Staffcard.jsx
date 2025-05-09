// components/StaffDashboard/Staffcard.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BloodBankData from '../../pages/shared/BloodBankData';
import { getAllPatients } from '../../services/staffServices';



const Card = ({ title, value, bgColor, textColor, colSpan = '', onClick, valueSize = 'text-4xl' }) => {
  const isClickable = typeof onClick === 'function';

  return (
    <div
      className={`min-h-[100px] px-8 p-6 rounded-2xl shadow-lg text-center justify-center ${bgColor} ${textColor} ${colSpan} ${isClickable ? 'cursor-pointer hover:opacity-90' : ''}`}
      onClick={onClick}
    >
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <div className={`${valueSize} font-extrabold`}>{value}</div>
    </div>
  );
};

const Staffcard = ({ totalPatients, onBloodBankClick }) => {
  const staffData = useSelector((state) => state.staff?.staff?.staffExist);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patients, setPatients] = useState([]);

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



  return (
    <>
      
      {/* <div className="flex-[1] ">
        <Card
          title={
            <div className="flex justify-center items-center h-full">
            <img
              src={staffData?.image}
              alt="Staff"
              className="w-60 h-60 object-cover rounded-full shadow-md"
             
            />
             </div>
          }
          value={staffData?.name}
          bgColor="bg-white"
          textColor="text-gray"
          colSpan="lg:col-span-1"
        />
         </div> */}
          <div className="flex  justify-center items-center bg-base-200 p-6"> 
         <div className="flex  gap-32 ">
        <Card
          title="Total Patients"
          value={patients.length}
          bgColor="bg-[#0967C2]"
          textColor="text-white"
          colSpan="lg:col-span-1"
          
        />
        <Card
          title="Blood Bank"
          value="Check blood group availability"
          bgColor="bg-white"
          textColor="text-[#0967C2]"
          colSpan="lg:col-span-1"
          valueSize="text-sm"
          onClick={() => setIsModalOpen(true)}
        />
        </div>
      </div> 
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-5xl  max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Blood Bank Information</h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setActiveTab('dashboard');
                  navigate('?tab=dashboard');
                }}
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </button>
            </div>
            <div className="modal-bloodbank-slim W-[100px]">
              <BloodBankData />
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Staffcard;
