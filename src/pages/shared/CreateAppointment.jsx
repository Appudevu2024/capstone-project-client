import React, { useState, useEffect, useContext } from 'react';
import { listDoctors } from '../../services/loginServices';
import { bookAppointment, updateAppointment } from '../../services/adminServices';
import { toast } from 'react-toastify';

const CreateAppointment = ({ appointmentToEdit, onSuccess, onCancel }) => {


  const [formData, setFormData] = useState({
    patientname: '',
    dateOfBirth: '',
    contact: '',
    doctor: '',
    date: '',
    time: '',
    status: '',
  });

  const [doctors, setDoctors] = useState([]);


  useEffect(() => {
    fetchDoctors();
  }, []);

  // Fetch doctors for dropdown
  const fetchDoctors = () => {
    listDoctors()
      .then((res) => {
        console.log('Fetched doctors', res);
        setDoctors(res || []);
        console.log(res.data);
      })

      .catch((err) => {
        console.error('Error fetching doctors:', err);
        setDoctors([]);
      });
  };


  useEffect(() => {
    if (appointmentToEdit) {
      console.log(appointmentToEdit)
      setFormData({
        _id: appointmentToEdit._id,
        patientname: appointmentToEdit.patientname,
        dateOfBirth:  new Date(appointmentToEdit.dateOfBirth).toISOString().split('T')[0],
        contact: appointmentToEdit.contact,
        doctor: appointmentToEdit.doctor._id,
        date: new Date(appointmentToEdit.date).toISOString().split('T')[0],
        time: appointmentToEdit.time,
        status: appointmentToEdit.status,
      });
    }
  }, [appointmentToEdit]);


  const onSubmit = async (e) => {
    e.preventDefault();

    try {

      const submissionData = {
        ...formData,

      };

      if (appointmentToEdit) {
        await updateAppointment(submissionData);
        toast.success('Updated successfully');
      } else {
        const result = await bookAppointment(submissionData);

        toast.success('Saved successfully');
      }

      setFormData({
        patientname: '',
        dateOfBirth: '',
        contact: '',
        doctor: '',
        date: '',
        time: '',
        status: ''
      });

      if (onSuccess) onSuccess();
      if (onCancel) onCancel();


    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message, { position: "top-center" });
      } else {
        toast.error("Failed to create appointment", { position: "top-center" });
      };
    }
    setFormData((prevData) => ({
      ...prevData,
      date: "",
      time: "",
    }));
  }
  return (

    <div className="hero-content flex-col lg:flex-row-reverse">

      <div className="card shrink-0 w-full max-w-md  shadow-2xl  card-body ">
        <h2 className="text-2xl font-bold text-center mb-2">Create Appointment</h2>
        <div className="h-1 bg-[#0967C2] my-2 w-[250px]  mx-auto"></div>

        <form className="space-y-4">
        <label htmlFor="patientname" className="label">
            <span className="label-text">Patient Name</span>
          </label>
          <input
            type="text"
            name="patientname"
            id="patientname"
            className="input input-bordered w-full"
            value={formData.patientname}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }}
            required
          />
          <label htmlFor="dateOfBirth" className="label">
            <span className="label-text">Date of Birth</span>
          </label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            className="input input-bordered w-full"
            value={formData.dateOfBirth}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }}
            required
          />
          <label htmlFor="contactnumber" className="label">
            <span className="label-text">Contact Number</span>
          </label>
          <input
            type="text"
            name="contact"
            id="contactnumber"
            className="input input-bordered w-full"
            value={formData.contact}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }}
            required
          />
          <select
            name="doctor"
            className="select select-bordered w-full"
            value={formData.doctor}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }}
            required
          >
            <option value="">Select Doctor</option>
            {Array.isArray(doctors) && doctors.map(doc => (
              <option key={doc._id} value={doc._id}>
                {doc.name}</option>
            ))}
          </select>
          <label htmlFor="appointmentdate" className="label">
            <span className="label-text">Appointment date</span>
          </label>
          <input
            type="date"
            name="date"
            id="appointmentdate"
            className="input input-bordered w-full"
            value={formData.date}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }}
            required
          />
          <label htmlFor="time" className="label">
            <span className="label-text">Time</span>
          </label>
          <input
            type="time"
            name="time"
            id="time"
            className="input input-bordered w-full"
            value={formData.time}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }}
            required
          />
          <select
            name="status"
            className="select select-bordered w-full"
            value={formData.status||"Select status"}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }}
            required
          >
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button className="btn bg-[#0967C2] text-white w-full" onClick={onSubmit}>
            {appointmentToEdit ? 'Update Appointment' : 'Book Appointment'}
          </button>
        </form>
      </div>
    </div>

  );
};

export default CreateAppointment;
