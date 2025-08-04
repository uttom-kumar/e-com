'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { MdOutlineMail } from "react-icons/md";
import { FiLock, FiUser } from "react-icons/fi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { BsCalendar } from "react-icons/bs";
import { IoMdTransgender } from "react-icons/io";
import toast from "react-hot-toast";

const RegisterComponent = () => {
    const [showPassword, setShowPassword] = useState(false);

    const submitFrom = (e) => {
        e.preventDefault();
        toast.success('Register Success');
    }

    return (
        <div>
            <div className="h-[90vh] flex items-center justify-center relative overflow-hidden">
                <div
                    className="relative z-10 max-w-sm w-full bg-gradient-to-b from-[#c0e7ff] to-white rounded-2xl shadow-lg p-8 flex flex-col items-center"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at top, #c0e7ff 0%, #ffffff 100%)"
                    }}
                >
                    <h2 className="font-semibold text-black text-center text-base leading-tight mb-1">
                        Create your account
                    </h2>
                    <p className="text-center text-gray-600 text-xs leading-snug mb-6 px-6">
                        Join us to bring your words, data, and teams together.
                        It only takes a minute!
                    </p>
                    <form className="w-full space-y-3" onSubmit={submitFrom}>
                        {/* Name */}
                        <div>
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-gray-500 text-xs">
                                <FiUser size={15} className="mr-2" />
                                <input
                                    className="bg-transparent w-full outline-none placeholder-gray-400"
                                    id="name"
                                    placeholder="Full Name"
                                    type="text"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-gray-500 text-xs">
                                <MdOutlineMail size={15} className="mr-2" />
                                <input
                                    className="bg-transparent w-full outline-none placeholder-gray-400"
                                    id="email"
                                    placeholder="Email"
                                    type="email"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-gray-500 text-xs">
                                <FaPhoneAlt size={15} className="mr-2" />
                                <input
                                    className="bg-transparent w-full outline-none placeholder-gray-400"
                                    id="phone"
                                    placeholder="Phone Number"
                                    type="tel"
                                />
                            </div>
                        </div>

                        {/* Birthday */}
                        <div>
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-gray-500 text-xs">
                                <BsCalendar size={15} className="mr-2" />
                                <input
                                    className="bg-transparent w-full outline-none placeholder-gray-400"
                                    id="birthday"
                                    placeholder="Birthday"
                                    type="date"
                                />
                            </div>
                        </div>

                        {/* Gender */}
                        <div>
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-gray-500 text-xs">
                                <IoMdTransgender size={15} className="mr-2" />
                                <select
                                    className="bg-transparent w-full outline-none text-gray-600"
                                    id="gender"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-gray-500 text-xs">
                                <FiLock size={15} className="mr-2" />
                                <input
                                    className=" bg-transparent w-full outline-none placeholder-gray-400"
                                    id="password"
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                />
                                <button
                                    type="button"
                                    className="cursor-pointer ml-2 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <IoEyeOutline size={15} />
                                    ) : (
                                        <IoEyeOffOutline size={15} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            className="cursor-pointer w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-lg py-2 mt-2 text-sm font-medium shadow-md hover:shadow-lg transition-shadow"
                            type="submit"
                        >
                            Register
                        </button>
                    </form>
                    <div className="dotted-line-text mt-3">
                        Already have an account? <Link href="/login">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;
