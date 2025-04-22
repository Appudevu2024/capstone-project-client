import React, { useEffect, useState } from 'react'
import Cards from '../shared/Cards'
import axiosInstance from '../../axios/axiosinstance'
import { listDoctors } from '../../services/doctorServices'
import { data } from 'react-router-dom'



export default function Doctors() {
  const [doctors, setDoctors] = useState([])
  useEffect(() => {
    listDoctors().then((res) => {
      console.log(res);
      setDoctors(res || []);
    })
    .catch((err) => {
      console.log('Error fetching doctors:', err);
      setDoctors([]);
    });
}, []);
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
       {doctors.map((doctor, index) => (
        <Cards key={index} doctor={doctor} />
      ))}


    </div>
  )
}


