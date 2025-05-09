import React, { useEffect, useState } from 'react';
import { getAllPatients, listAppointments, listDepartment } from '../../services/adminServices';
import Patients from '../../pages/shared/Patients';
import { listDoctors } from '../../services/loginServices';

const Card = ({ title, value, bgColor, textColor, colSpan = '' }) => (
  <div className={`w-[250px] min-h-[100px] px-8 p-6 rounded-2xl shadow-lg text-center flex flex-col justify-center ${bgColor} ${textColor} ${colSpan}`}>
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <p className="text-4xl font-extrabold">{value}</p>
  </div>
);

const StatsCards = () => {
  const [appointments, setAppointments] = useState([]);
 const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
    fetchDepartment();
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
  };

  // const fetchAppointments = () => {
  //   listAppointments()
  //     .then((res) => {
  //       if (!res || !Array.isArray(res)) {
  //         setAppointments([]);
  //         return;
  //       }
  
  //       const now = new Date();
  
  //      console.log(now)
  //       const upcomingAppointments = res.filter(appointment => {
  //         const appointmentDate = new Date(appointment.date); // replace 'date' with your actual field
  //         return appointmentDate > now;
  //       });
  
  //       setAppointments(upcomingAppointments);
  //       console.log('Upcoming appointments:', upcomingAppointments);
  //     })
  //     .catch((err) => {
  //       console.error('Error fetching appointments:', err);
  //       setAppointments([]);
  //     });
  // };








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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-4">
      <Card
        title="Total Appointments"
        value={appointments.length}
        bgColor="bg-blue-500"
        textColor="text-white"
        colSpan="lg:col-span-1"
      />
      <Card
        title="Total Patients"
        value={patients.length}
        bgColor="bg-cyan-500"
        textColor="text-white"
        colSpan="lg:col-span-1"
      />
      <Card
        title="Total Doctors"
        value={doctors.length}
        bgColor="bg-purple-500"
        textColor="text-white"
        colSpan="lg:col-span-1"
      />
      <Card
        title="Total Departments"
        value={department.length}
        bgColor="bg-[#0967C2]"
        textColor="text-white"
        colSpan="lg:col-span-1"
      />
    </div>
  );
};

export default StatsCards;