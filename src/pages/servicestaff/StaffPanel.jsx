import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { LayoutDashboard, Users,  Droplet, LogOut } from 'lucide-react';
import Staffcard from '../../components/StaffDashboard/Staffcard';
import StaffPatients from './StaffPatients';
import AddPatientDetails from '../shared/AddPatientDetails';
import BloodBankData from "../shared/BloodBankData";
import { staffLogout } from "../../services/loginServices";
import { clearStaff } from "../../redux/features/staffSlice";
import { persistor } from "../../redux/store";


export default function StaffPanel() {

  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'dashboard';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const staffData = useSelector((state) => state.staff?.staff?.staffExist);

  const handleLogout = async () => {
    try {
      if (staffData?.email) {
        await staffLogout();
        dispatch(clearStaff());
      }
      await persistor.purge();
      navigate('/'); 
    } catch (error) {
      console.error("Logout error:", error);
      toast.error('Error logging out');
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
              onClick={() => {
                handleTabChange('bloodbank');
                setIsModalOpen(true);
              }}
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
      <div className="dark:bg-gray-800 text-gray flex-1 w-full">
        <main className="p-6 w-full">
          {activeTab === 'dashboard' && (
            <Staffcard />
          )}
          {activeTab === 'patients' && <StaffPatients navigate={navigate} />}  {/* Pass navigate here */}
          {activeTab === 'bloodbank' && isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg max-w-5xl max-h-[90vh] overflow-y-auto p-6">
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
        </main>
      </div>
    </div>
  );
}
