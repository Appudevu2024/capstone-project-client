import {createBrowserRouter} from "react-router-dom";
import Homepage from "../pages/admin/Homepage";
import Adminlayout from "../Layouts/Adminlayout";

import Doctors from "../pages/admin/Doctors";
import AboutPage from "../pages/admin/AboutPage";
import DoctorSignup from "../pages/doctor/DoctorSignup";
import StaffSignup from "../pages/servicestaff/StaffSignup";
import SignupPage from "../pages/shared/SignupPage";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Adminlayout/>,
        errorElement:<h1>Error Page</h1>,
        children:[
            {
                path:'',
                element: <Homepage/>,
            },
            {
                path:'about',
                element:<AboutPage/>,
            },
            {
                path:'doctors',
                element: <Doctors/>,
            },
            {
                path:'signup',
                element: <SignupPage/>,
            },
            {
                path:'doctorsignup',
                element: <DoctorSignup/>,
            },
            {
                path:'staffsignup',
                element: <StaffSignup/>,
            },
        ]
    },
   
]);