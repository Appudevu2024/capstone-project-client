
import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import Doctors from './Doctors';
import { ThemeContext } from '../../context/ThemeContext';
import BloodBankData from '../shared/BloodBankData';
import Departments from './Departments';
import Appointments from '../shared/Appointments';
import Patients from '../shared/Patients';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../services/loginServices';
import { clearAdmin } from '../../redux/features/adminSlice';
import { persistor } from '../../redux/store';
import StatsCards from '../../components/AdminDashboard/StatsCards';
import { LayoutDashboard, UserCheck,UserPlus , Users, CalendarCheck, Building, Droplet, LogOut } from 'lucide-react';
import StaffLists from './StaffsList';

export default function AdminPanel() {

  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'dashboard';
  const [activeTab, setActiveTab] = useState(initialTab);
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const adminData = useSelector((state) => state.admin?.admin);
  console.log(adminData)
  const doctorData = useSelector((state) => state.doctor?.doctor);
  const staffData = useSelector((state) => state.staff?.staff);

  let loggedInUser = null;
  if (adminData?.email) { 
    loggedInUser = { name: 'Admin', role: 'Admin' };
  } else if (doctorData?.doctorExist?._id) {
    loggedInUser = { name: doctorData.doctorExist.name, role: 'Doctor' };
  } else if (staffData?.staffExist?._id) {
    loggedInUser = { name: staffData.staffExist.name, role: 'Staff' };
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

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    navigate(`?tab=${tabName}`);
    if (tabName === 'logout') {

      handleLogout();
    }
  };

  

  return (
    <div className={`flex min-h-screen  ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-base-200'}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 p-4 shadow-md">
        {/* <h2 className="text-xl bg-white dark:bg-gray-800 font-bold mb-6">Admin Dashboard</h2> */}
        <ul className="menu  space-y-2">
          <li>
            <button
              onClick={() => handleTabChange('dashboard')}
              className={`btn btn-block w-full justify-start gap-2 ${activeTab === 'dashboard' ? 'bg-[#0967C2] text-white' : 'btn-ghost'}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabChange('doctors')}
              className={`btn btn-block w-full justify-start gap-2 ${activeTab === 'doctors' ? 'bg-[#0967C2] text-white' : 'btn-ghost'}`}
            >
              <UserCheck className="w-5 h-5" />
              Doctors
            </button>

          </li>
          <li>
            <button
              onClick={() => handleTabChange('staffs')}
              className={`btn btn-block w-full justify-start gap-2 ${activeTab === 'staffs' ? 'bg-[#0967C2] text-white' : 'btn-ghost'}`}
            >
              <UserPlus className="w-5 h-5" />
              Staffs
            </button>

          </li>
          <li>
            <button
              onClick={() => handleTabChange('patients')}
              className={`btn btn-block  w-full justify-start gap-2 ${activeTab === 'patients' ? 'bg-[#0967C2] text-white' : 'btn-ghost'}`}
            >
              <Users className="w-5 h-5" />
              Patients
            </button>

          </li>
          <li>
            <button
              onClick={() => handleTabChange('appointments')}
              className={`btn btn-block w-full justify-start gap-2 ${activeTab === 'appointments' ? 'bg-[#0967C2] text-white' : 'btn-ghost'}`}
            >
              <CalendarCheck className="w-5 h-5" />
              Appointments
            </button>

          </li>
          <li>
            <button
              onClick={() => handleTabChange('departments')}
              className={`btn btn-block w-full justify-start gap-2 ${activeTab === 'departments' ? 'bg-[#0967C2] text-white' : 'btn-ghost'}`}
            >
              <Building className="w-5 h-5" />
              Departments
            </button>

          </li>
          <li>
            <button
              onClick={() => handleTabChange('bloodbank')}
              className={`btn btn-block w-full justify-start gap-2 ${activeTab === 'bloodbank' ? 'bg-[#0967C2] text-white' : 'btn-ghost'}`}
            >
              <Droplet className="w-5 h-5" />
              Bloodbank
            </button>

          </li>
          <li>
            <button
              onClick={() => handleTabChange('logout')}
              className={`btn btn-block w-full justify-start gap-2 ${activeTab === 'logout' ? 'bg-[#0967C2] text-white' : 'btn-ghost'}`}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>

          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className=' dark:bg-gray-800 text-gray' >

        <main className="flex-1 p-6 ">
          {activeTab === 'dashboard' && (
            <>
              <StatsCards />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white ml-4  mt-8 border-b pb-2" > Appointments</h2>
              <Appointments isDashboard={true} />
            </>

          )}
          {activeTab === 'doctors' && <Doctors />}
          {activeTab === 'bloodbank' && <BloodBankData />}
          {activeTab === 'departments' && <Departments />}
          {activeTab === 'appointments' && <Appointments />}
          {activeTab === 'patients' && <Patients />}
          {activeTab==='staffs'&& <StaffLists/>}
        </main>
      </div>
    </div>
  );
}

