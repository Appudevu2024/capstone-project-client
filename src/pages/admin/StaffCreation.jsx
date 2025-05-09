import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { createStaff, updateStaffdata } from '../../services/staffServices';

const StaffCreation = ({ staffToEdit, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        contact: '',
        gender: '',
        dob: '',
        address: '',
        staffrole: '',
        image:null    
    });

    useEffect(() => {
        if (staffToEdit) {
            setFormData({
                _id: staffToEdit._id,
                name: staffToEdit.name,
                email: staffToEdit.email,
                password: staffToEdit.password,
                contact: staffToEdit.contact,
                gender: staffToEdit.gender,
                dob: staffToEdit.dob ? new Date(staffToEdit.dob).toISOString().split('T')[0] : '',
                address: staffToEdit.address,
                staffrole: staffToEdit.staffrole,
                image: staffToEdit.image,
            });
        }
    }, [staffToEdit]);

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
    
        const submissionData = new FormData(); // ✅ Renamed to avoid conflict
    
        // Append text fields
        submissionData.append('name', formData.name);
        submissionData.append('email', formData.email);
        submissionData.append('password', formData.password);
        submissionData.append('contact', formData.contact);
        submissionData.append('gender', formData.gender);
        submissionData.append('dob', formData.dob);
        submissionData.append('address', formData.address);
        submissionData.append('staffrole', formData.staffrole);
    
        // Append image file if exists
        if (formData.image) {
            submissionData.append('image', formData.image);
        }
        if (formData._id) {
            submissionData.append('_id', formData._id);
        }
        try {
            if (staffToEdit) {
                await updateStaffdata(submissionData);
                toast.success('Updated successfully');
            } else {
                await createStaff(submissionData);
                toast.success('Saved successfully');
            }
    
            // Clear form state
            setFormData({
                name: '',
                email: '',
                password: '',
                contact: '',
                gender: '',
                dob: '',
                address: '',
                staffrole: '',
                image:null
            });
    
            if (onSuccess) onSuccess();
            if (onCancel) onCancel();
        } catch (err) {
            if (err.response?.data?.message) {
                toast.error(err.response.data.message, { position: "top-center" });
            } else {
                toast.error("Failed to create staff", { position: "top-center" });
            }
        }
    };
    

    return (
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card shrink-0 w-full max-w-md shadow-2xl card-body">
                <h2 className="text-2xl font-bold text-center mb-2">Staff Creation</h2>
                <div className="h-1 bg-[#0967C2] my-2 w-[250px] mx-auto"></div>

                <form className="space-y-4" onSubmit={onSubmit}>
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="input input-bordered w-full"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    />

                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="input input-bordered w-full"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    />

                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="input input-bordered w-full"
                        required={!staffToEdit}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    />

                    <label className="label">
                        <span className="label-text">Contact</span>
                    </label>
                    <input
                        type="tel"
                        name="contact"
                        className="input input-bordered w-full"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    />

                    <div className="flex gap-2">
                        <label className="label">
                            <span className="label-text">Gender:</span>
                        </label>
                        <label className="label cursor-pointer">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                className="radio checked:bg-blue-500"
                                checked={formData.gender === 'male'}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            />
                            <span className="label-text">Male</span>
                        </label>

                        <label className="label cursor-pointer">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                className="radio checked:bg-blue-500"
                                checked={formData.gender === 'female'}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            />
                            <span className="label-text">Female</span>
                        </label>

                        <label className="label cursor-pointer">
                            <input
                                type="radio"
                                name="gender"
                                value="others"
                                className="radio checked:bg-blue-500"
                                checked={formData.gender === 'others'}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            />
                            <span className="label-text">Others</span>
                        </label>
                    </div>

                    <label className="label">
                        <span className="label-text">Date Of Birth</span>
                    </label>
                    <input
                        type="date"
                        name="dob"
                        className="input input-bordered w-full"
                        required
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    />

                    <label className="label">
                        <span className="label-text">Address</span>
                    </label>
                    <textarea
                        name="address"
                        className="textarea textarea-bordered w-full"
                        rows={3}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    />

                    <label className="label">
                        <span className="label-text">Staff Role</span>
                    </label>
                    <input
                        type="text"
                        name="staffrole"
                        className="input input-bordered w-full"
                        required
                        value={formData.staffrole}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    />

                    <label className="label text">Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="file-input file-input-bordered w-full"
                        onChange={handleImageChange}
                    />

                    <button type="submit" className="btn bg-[#0967C2] text-white w-full">
                        {staffToEdit ? 'Update Staff' : 'Create Staff'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StaffCreation;
