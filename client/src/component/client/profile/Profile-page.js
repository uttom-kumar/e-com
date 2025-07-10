'use client';
import React, { useState } from 'react';
import {FiEye, FiEyeOff} from "react-icons/fi";

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isPassEdit,  setPassEdit] = useState(false);
    const [fullName, setFullName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword,  setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleEdit = () => setIsEditing(!isEditing);
    const passToggleEdit = () => setPassEdit(!isPassEdit);


    return (
        <div className={'container mx-auto py-6'}>
            <div className=" bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Manage My profile</h1>

                {!isPassEdit ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="w-full border px-3 py-1 rounded"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            ) : (
                                <p className="font-medium">
                                    {!fullName ? 'Enter your full name' : fullName}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <p className="text-sm text-gray-500">Email Address</p>
                            {isEditing ? (
                                <input
                                    type="email"
                                    className="w-full border px-3 py-1 rounded"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            ) : (
                                <p className="font-medium">
                                    {!email ? 'Enter your email address' : email}
                                </p>
                            )}
                        </div>

                        {/* Birthday */}
                        <div>
                            <p className="text-sm text-gray-500">Birthday</p>
                            {isEditing ? (
                                <input
                                    type="date"
                                    className="w-full border px-3 py-1 rounded"
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                            ) : (
                                <p className="font-medium">
                                    {!birthday ? 'Enter your birthday' : birthday}
                                </p>
                            )}
                        </div>

                        {/* Gender */}
                        <div>
                            <p className="text-sm text-gray-500">Gender</p>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="w-full border px-3 py-1 rounded"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            ) : (
                                <p className="font-medium">
                                    {!gender ? 'Enter your gender' : gender}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <p className="text-sm text-gray-500">
                                Mobile <span className="text-blue-500 cursor-pointer">| Add</span>
                            </p>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="w-full border px-3 py-1 rounded"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            ) : (
                                <p className="font-medium">
                                    {!phone ? 'Enter your phone number' : phone}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Old Password */}
                        <div>
                            <p className="text-sm text-gray-500">Old Password</p>
                            {isPassEdit && (
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="w-full border px-3 py-1 rounded pr-10"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-2 cursor-pointer text-gray-600"
                                    >
                                        {showPassword ? <FiEyeOff /> : <FiEye />}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* New Password */}
                        <div>
                            <p className="text-sm text-gray-500">New Password</p>
                            {isPassEdit && (
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        className="w-full border px-3 py-1 rounded pr-10"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <span
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-2 cursor-pointer text-gray-600"
                                    >
                                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                )
                }

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={toggleEdit}
                        className={`cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded ${isPassEdit && 'hidden'}`}
                    >
                        {isEditing ? 'SAVE PROFILE' : 'EDIT PROFILE'}
                    </button>
                    <button
                        onClick={passToggleEdit}
                        className={`cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded ${
                            isEditing && 'hidden'
                        }`}
                    >
                        {isPassEdit ? 'SAVE PASSWORD' : 'EDIT PASSWORD'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
