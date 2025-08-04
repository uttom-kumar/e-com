'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { MdOutlineMail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const LoginComponent = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <div className="h-[80vh] flex items-center justify-center relative overflow-hidden">
                <div
                    className="relative z-10 max-w-sm w-full bg-gradient-to-b from-[#c0e7ff] to-white rounded-2xl shadow-lg p-8 flex flex-col items-center"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at top, #c0e7ff 0%, #ffffff 100%)"
                    }}
                >
                    <h2 className="font-semibold text-black text-center text-base leading-tight mb-1">
                        Sign in with email
                    </h2>
                    <p className="text-center text-gray-600 text-xs leading-snug mb-6 px-6">
                        Make a new doc to bring your words, data,
                        <br />
                        and teams together. For free
                    </p>
                    <form className="w-full space-y-3">
                        {/* Email Field */}
                        <div>
                            <label className="sr-only" htmlFor="email">
                                Email
                            </label>
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-gray-500 text-xs">
                                <MdOutlineMail size={15} className="mr-2"/>
                                <input
                                    className="bg-transparent w-full outline-none placeholder-gray-400"
                                    id="email"
                                    placeholder="Email"
                                    type="email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="sr-only" htmlFor="password">
                                Password
                            </label>
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-gray-500 text-xs">
                                <FiLock size={15} className="mr-2"/>
                                <input
                                    className="bg-transparent w-full outline-none placeholder-gray-400"
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
                                        <IoEyeOutline size={15}/>
                                    ) : (
                                        <IoEyeOffOutline size={15}/>
                                    )}
                                </button>
                            </div>
                            <div className="text-right mt-1">
                                <a
                                    className="text-xs text-gray-600 hover:text-gray-800 transition-colors"
                                    href="#"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            className="cursor-pointer w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-lg py-2 mt-2 text-sm font-medium shadow-md hover:shadow-lg transition-shadow"
                            type="submit"
                        >
                            Get Started
                        </button>
                    </form>
                    <div className="dotted-line-text mt-3">
                        Or <Link href="/register">sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
