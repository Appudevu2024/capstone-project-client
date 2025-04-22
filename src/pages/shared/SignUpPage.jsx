
import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import DoctorSignup from '../doctor/DoctorSignup';
import StaffSignup from '../servicestaff/StaffSignup';


export default function SignupPage() {
    const [selectedPage, setSelectedPage] = useState('');

    return (

        <div className="p-4 text-center">
            <div className="space-x-4 mb-6">
                <label className="label cursor-pointer">
                    <input
                        type="radio"
                        name="page"
                        value="doctor"
                        className="radio"
                        onChange={(e) => setSelectedPage(e.target.value)}
                    />
                    <span className="ml-2">Doctor </span>
                </label>

                <label className="label cursor-pointer">
                    <input
                        type="radio"
                        name="page"
                        value="servicestaff"
                        className="radio"
                        onChange={(e) => setSelectedPage(e.target.value)}
                    />
                    <span className="ml-2">Service staff</span>
                </label>
            </div>

            {/* Conditional Page Rendering */}
            {selectedPage === 'doctor' && <DoctorSignup />}
            {selectedPage === 'servicestaff' && <StaffSignup />}
        </div>
    );
}













