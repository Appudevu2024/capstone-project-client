import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { LoginContext } from '../../context/LoginContext';
import { adminLogin, doctorLogin, staffLogin } from '../../services/loginServices';
import { saveAdmin } from '../../redux/features/adminSlice';
import { saveDoctor } from '../../redux/features/doctorSlice';
import { saveStaff } from '../../redux/features/staffSlice';
import { ThemeContext } from '../../context/ThemeContext';

function LoginPage() {
  const { setShowLogin } = useContext(LoginContext);
  const { theme } = useContext(ThemeContext); // Accessing current theme
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [role, setRole] = useState('admin'); // default role

  const onSubmit = async () => {
    try {
      let loginFn, redirectPath;

      if (role === 'admin') {
        loginFn = adminLogin;
        redirectPath = '/adminpanel';
      } else if (role === 'doctor') {
        loginFn = doctorLogin;
        redirectPath = '/doctorpanel';
      } else if (role === 'staff') {
        loginFn = staffLogin;
        redirectPath = '/staffpanel';
      }

      const data = await loginFn(values);
      if (role === 'admin') dispatch(saveAdmin(data.user));
      if (role === 'doctor') dispatch(saveDoctor(data.user));
      if (role === 'staff') dispatch(saveStaff(data.user));
      toast.success(`${role} login successful`, { position: 'top-center' });
      setTimeout(() => {
        navigate(redirectPath);
      }, 100);
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Login failed', {
        position: 'top-center',
      });
    }
  };

  return (

    <div className={`hero  ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-base-200'}`}>
      
      <div className="hero-content flex-col lg:flex-row-reverse bg-white text-black dark:bg-gray-800 dark:text-white">
        {/* Login Card */}
        <div className={`card shrink-0 w-full max-w-sm   shadow-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-base-100'} relative`}>
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-black text-xl"
            onClick={() => setShowLogin(false)}
          >
            &times;
          </button>
          <div className="card-body  space-y-3">
              <div className="form-control mb-6">
                <label className="label w-32 mr-8">
                  <span className="label-text">Login as</span>
                </label>
                <select
                  className="select select-bordered bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
            <div className="form-control">
              <label className="label w-32 mr-8">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                className="input input-bordered input-dark"
                onChange={(e) => {
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="form-control">
              <label className="label w-32 mr-8">
                <span className="label-text pr-4">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
                onChange={(e) => {
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="form-control text-center">
              <button className="btn bg-blue-700  text-white dark:bg-gray-800 dark:text-white dark:border-gray-600 hover:bg-blue-800 w-20  rounded-full text-sm" onClick={onSubmit}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
