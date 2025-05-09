import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from '../../context/ThemeContext';
import BloodBankData from '../shared/BloodBankData';
import Patients from '../shared/Patients';
import StatsCards from '../../components/AdminDashboard/StatsCards';
import { adminLogout } from '../../services/loginServices';
import { clearAdmin } from '../../redux/features/adminSlice';
import { persistor } from '../../redux/store';
import { LayoutDashboard, Users, Droplet, LogOut } from 'lucide-react';

export default function DoctorPanel() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'dashboard';
  const [activeTab, setActiveTab] = useState(initialTab);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const adminData = useSelector((state) => state.admin?.admin);

  const handleLogout = async () => {
    try {
      if (adminData?.email) {
        await adminLogout();
        dispatch(clearAdmin());
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
    if (tabName === 'logout') handleLogout();
  };

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-base-200'}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 p-4 shadow-md">
        <ul className="menu space-y-2">
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
              onClick={() => handleTabChange('patients')}
              className={`btn btn-block w-full justify-start gap-2 ${activeTab === 'patients' ? 'bg-[#0967C2] text-white' : 'btn-ghost'}`}
            >
              <Users className="w-5 h-5" />
              Patients
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
      <div className='dark:bg-gray-800 text-gray flex-1'>
        <main className="p-6">
          {activeTab === 'dashboard' && (
            <>
              <StatsCards />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white ml-4 mt-8 border-b pb-2">
                Overview
              </h2>
              {/* You can add dashboard summary widgets here if needed */}
            </>
          )}
          {activeTab === 'patients' && <Patients />}
          {activeTab === 'bloodbank' && <BloodBankData />}
        </main>
      </div>
    </div>
  );
}
