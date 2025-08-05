'use client';
import React, {useEffect, useState} from 'react';
import {FiEye, FiEyeOff, FiLock} from "react-icons/fi";
import {IoMdTransgender} from "react-icons/io";
import {FaPhoneAlt} from "react-icons/fa";
import {BsCalendar} from "react-icons/bs";
import {MdOutlineMail} from "react-icons/md";
import {UserReadProfileRequest} from "@/component/Request-Api/UserProfileRequest";
import {useSelector} from "react-redux";

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

    const profileData = useSelector((state) => state.ProfileData.profileData)
    console.log(profileData)

    useEffect(() => {
        (async () => {
            await UserReadProfileRequest()
        })()
    }, []);

    useEffect(() => {
        if (profileData && profileData.length > 0) {
            const user = profileData[0]; // or just profileData if it's not an array
            setFullName(user.name || '');
            setEmail(user.email || '');
            setBirthday(user.birthday || '');
            setGender(user.gender || '');
            setPhone(user.phone || '');
        }
    }, [profileData]);


    return (
        <div className={'container mx-auto py-6'}>
            <div className=" bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Manage My profile</h1>

                {
                    profileData.map((data,i)=>{
                        return (
                            <div key={i}>
                                {!isPassEdit ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Full Name */}
                                        <div>
                                            <p className="text-sm text-gray-500">Full Name</p>
                                            {isEditing ? (
                                                <div className={'flex items-center bg-gray-100 rounded-lg px-3 py-2 text-gray-500 text-xs'}>
                                                    <input
                                                        type="text"
                                                        className="bg-transparent w-full outline-none placeholder-gray-400"
                                                        value={fullName}
                                                        onChange={(e) => setFullName(e.target.value)}
                                                    />
                                                </div>
                                            ) : (
                                                <p className="font-medium">
                                                    {!data?.name ? 'Enter your full name' : data.name}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <p className="text-sm text-gray-500">Email Address</p>
                                            {isEditing ? (
                                                <div className={'flex items-center bg-gray-100 rounded-lg px-3 py-2 text-gray-500 text-xs'}>
                                                    <MdOutlineMail size={15} className="mr-2" />
                                                    <input
                                                        type="email"
                                                        className="bg-transparent w-full outline-none placeholder-gray-400"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                            ) : (
                                                <p className="font-medium">
                                                    {!data?.email ? 'Enter your email address' : data?.email}
                                                </p>
                                            )}
                                        </div>

                                        {/* Birthday */}
                                        <div>
                                            <p className="text-sm text-gray-500">Birthday</p>
                                            {isEditing ? (
                                                <div className={'flex items-center bg-gray-100 rounded-lg px-3 py-2 text-gray-500 text-xs'}>
                                                    <BsCalendar size={15} className="mr-2" />
                                                    <input
                                                        type="date"
                                                        className="bg-transparent w-full outline-none placeholder-gray-400"
                                                        value={birthday}
                                                        onChange={(e) => setBirthday(e.target.value)}
                                                    />
                                                </div>
                                            ) : (
                                                <p className="font-medium">
                                                    {!data?.birthday ? 'Enter your birthday' : data?.birthday}
                                                </p>
                                            )}
                                        </div>

                                        {/* Gender */}
                                        <div>
                                            <p className="text-sm text-gray-500">Gender</p>
                                            {isEditing ? (
                                                <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-gray-500 text-xs">
                                                    <IoMdTransgender size={15} className="mr-2" />
                                                    <select
                                                        className="bg-transparent w-full outline-none text-gray-600"
                                                        name="gender"
                                                        value={gender}
                                                        onChange={(e) => setGender(e.target.value)}
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                            ) : (
                                                <p className="font-medium">
                                                    {!data?.gender ? 'Enter your gender' : data?.gender}
                                                </p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Mobile <span className="text-blue-500 cursor-pointer">| Add</span>
                                            </p>
                                            {isEditing ? (
                                                <div className={'flex items-center bg-gray-100 rounded-lg px-3 py-2 text-gray-500 text-xs'}>
                                                    <FaPhoneAlt size={15} className="mr-2" />
                                                    <input
                                                        type="text"
                                                        className="bg-transparent w-full outline-none text-gray-600"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                    />
                                                </div>
                                            ) : (
                                                <p className="font-medium">
                                                    {!data?.phone ? 'Enter your phone number' : data?.phone}
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
                                                    <div className={'flex items-center bg-gray-100 rounded-lg px-3 py-2 text-gray-500 text-xs'}>
                                                        <FiLock size={15} className="mr-2" />
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            className="bg-transparent w-full outline-none placeholder-gray-400"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </div>
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
                                                    <div className={'flex items-center bg-gray-100 rounded-lg px-3 py-2 text-gray-500 text-xs'}>
                                                        <FiLock size={15} className="mr-2" />
                                                        <input
                                                            type={showConfirmPassword ? 'text' : 'password'}
                                                            className="bg-transparent w-full outline-none placeholder-gray-400"
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                        />
                                                    </div>
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
                        )
                    })
                }
            </div>
        </div>
    );
};

export default ProfilePage;
