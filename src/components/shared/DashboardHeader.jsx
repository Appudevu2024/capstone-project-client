import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/hospital-logo.avif';
import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { adminLogout, doctorLogout, staffLogout } from '../../services/loginServices';
import { persistor } from '../../redux/store';
import { clearAdmin } from '../../redux/features/adminSlice';
import { clearDoctor } from '../../redux/features/doctorSlice';
import { clearStaff } from '../../redux/features/staffSlice';
import { ThemeContext } from '../../context/ThemeContext';


function DashboardHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const adminData = useSelector((state) => state.admin?.admin);
  console.log(adminData)
  const doctorData = useSelector((state) => state.doctor?.doctor);
  const staffData = useSelector((state) => state.staff?.staff);

  let loggedInUser = null;
  if (adminData?.email) {
    loggedInUser = { name: 'Admin', role: 'Admin' };
  } else if (doctorData?.doctorExist?._id) {
    loggedInUser = { name: doctorData.doctorExist.name, role: 'Doctor',image:doctorData.doctorExist.image };
  } else if (staffData?.staffExist?._id) {
    loggedInUser = { name: staffData.staffExist.name, role: 'Staff',image:staffData.staffExist.image };
  }

  const handleLogout = async () => {
    try {
      if (adminData?.email) {
        await adminLogout();
        dispatch(clearAdmin());
      } else if (doctorData?.doctorExist?._id) {
        await doctorLogout();
        dispatch(clearDoctor());
      } else if (staffData?.staffExist?._id) {
        await staffLogout();
        dispatch(clearStaff());
      }
      await persistor.purge();
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="w-full bg-white shadow">
      <div className="w-full px-4 py-3 flex justify-between items-center">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Hospital Logo" className="h-10 w-10 rounded-full object-cover" />
          <span className="text-2xl font-bold">HealthCare</span>
        </div>

        <div className="flex-1 flex justify-center px-4">
          <span className="text-xl font-bold">Welcome {loggedInUser.name}</span>
        </div>
        {/* Right Controls */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-sm border border-gray-300 dark:border-white hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* User Info + Logout */}
          {loggedInUser && (
            <div className="flex items-center space-x-2">
              {/* <p className="font-medium">{loggedInUser.name}</p> */}
              <img
              src={loggedInUser.image}
              alt="Staff"
              className="w-20 h-20 object-cover rounded-full shadow-md"
            />
              <button
                onClick={handleLogout}
                className="btn bg-[#0967C2] text-white hover:bg-blue-700 px-4 py-1 rounded-full text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;