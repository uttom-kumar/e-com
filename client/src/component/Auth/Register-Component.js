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
import { RegisterRequest } from "@/component/Request-Api/UserAuth";
import {IsEmail, passwordValidation, ValidPhone} from "@/component/Utility/FromValidation";
import {useRouter} from "next/navigation";
import LoadingButton from "@/component/client/common/LoadingButton";
import {useSelector} from "react-redux";

const RegisterComponent = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const isLoading = useSelector(state => state.loading.isLoading)

    const navigate = useRouter()

    const onchangeValue = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "name":
                setName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "phone":
                setPhone(value);
                break;
            case "birthday":
                setBirthday(value);
                break;
            case "gender":
                setGender(value);
                break;
            case "password":
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const submitFromHandler = async (e) => {
        e.preventDefault();
        const reqbody = { name, email, phone, birthday, gender, password };
        if (!name || !email || !phone || !birthday || !gender || !password) {
            return toast.error("All fields are required!");
        }
        else if(!IsEmail(email)){
            return toast.error("Enter valid email address!")
        }
        else if(!ValidPhone(phone)){
            return toast.error("Enter valid phone number!")
        }
        else if(passwordValidation(password)){
            return toast.error(passwordValidation(password));

        }
        else {
            let res = await RegisterRequest(reqbody);
            console.log(res)
            if (res === true) {
                setName("");
                setEmail("");
                setPhone("");
                setBirthday("");
                setGender("");
                setPassword("");
                navigate.push('/login')
            }
        }
    };

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
                    <form className="w-full space-y-3" onSubmit={submitFromHandler}>
                        {/* Name */}
                        <div>
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-gray-500 text-xs">
                                <FiUser size={15} className="mr-2" />
                                <input
                                    className="bg-transparent w-full outline-none placeholder-gray-400"
                                    name="name"
                                    value={name}
                                    onChange={onchangeValue}
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
                                    name="email"
                                    value={email}
                                    onChange={onchangeValue}
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
                                    name="phone"
                                    value={phone}
                                    onChange={onchangeValue}
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
                                    name="birthday"
                                    value={birthday}
                                    onChange={onchangeValue}
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
                                    name="gender"
                                    value={gender}
                                    onChange={onchangeValue}
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
                                    name="password"
                                    value={password}
                                    onChange={onchangeValue}
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
                        <LoadingButton
                            className ={"w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"}
                            type="submit"
                            onClick={submitFromHandler}
                            text="Register"
                            isLoading={isLoading}
                            disabled={false}
                        />
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
