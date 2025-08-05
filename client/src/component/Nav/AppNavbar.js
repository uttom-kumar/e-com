'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineLogout, AiOutlineProduct } from 'react-icons/ai';
import {CiSearch, CiUser} from "react-icons/ci";
import { IoBagOutline, IoHomeOutline } from "react-icons/io5";
import { GrDeliver } from "react-icons/gr";
import { GiSelfLove } from "react-icons/gi";
import { isUserLoggedIn } from "@/component/Utility/Helper";
import { LogoutRequest } from "@/component/Request-Api/UserAuth";
import toast from "react-hot-toast";
import NavSearchButton from "@/component/Nav/Nav-Search-Button";

const AppNavbar = () => {
    const pathname = usePathname();
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const profileMenuRef = useRef(null);
    const searchContainerRef = useRef(null);

    const token = isUserLoggedIn();

    const toggleProfileMenu = () => setProfileMenuOpen(prev => !prev);
    const toggleProfileClose = () => setProfileMenuOpen(false);
    const toggleSearch = () => {
        setSearchOpen((prev) => !prev);
    };

    const items = [
        { path: '/', icon: <IoHomeOutline size={20} />, text: 'Home' },
        { path: '/products', icon: <AiOutlineProduct size={20} />, text: 'Products' },
        { path: '/add-cart', icon: <IoBagOutline size={20} />, text: 'Add Cart', count: 20 },
        { path: '/wishes', icon: <GiSelfLove size={20} />, text: 'Wishes', count: 3 },
        { path: '/order', icon: <GrDeliver size={20} />, text: 'Order' },
    ];

    // Handle outside click for both profile menu and search dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setProfileMenuOpen(false);
            }
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Log out request
    const logout = async () => {
        let res = await LogoutRequest();
        if (res === true) {
            window.location.reload();
            toast.success('Logout Successfully');
        }
    };

    return (
        <div className="bg-white shadow-md px-4 md:px-8 py-4 relative z-50">
            <nav className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/">
                    <span className="text-2xl font-bold text-blue-600 cursor-pointer hover:opacity-80 transition">
                        MyShop
                    </span>
                </Link>


                {/* Desktop Menu */}
                <div className="flex items-center gap-5 md:gap-10">
                    {items.map((item, index) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link className="hidden sm:block" key={index} href={item.path}>
                                <div
                                    className={`group relative flex items-center gap-2 transition cursor-pointer ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}
                                >
                                    <span>{item.icon}</span>
                                    <span className="hidden lg:block">{item.text}</span>

                                    {/* Tooltip */}
                                    <div className="block xl:hidden">
                                        <span
                                            className="lg:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block whitespace-nowrap bg-black text-white text-xs rounded px-2 py-1 z-10 shadow-lg"
                                        >
                                            {item.text}
                                        </span>
                                    </div>

                                    {/* Badge if count > 0 */}
                                    {item.count !== undefined && item.count > 0 && (
                                        <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full px-1">
                                            {item.count}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        );
                    })}

                    {/* Search Container */}
                    <div className="relative inline-block" ref={searchContainerRef}>
                        {/* Search Button */}
                        <button
                            onClick={toggleSearch}
                            className="flex items-center justify-center gap-2 cursor-pointer rounded-full p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all shadow-sm"
                        >
                            <CiSearch size={18} />
                        </button>

                        {/* Animated Dropdown */}
                        <div
                            className={`absolute top-12 right-0 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out ${
                                searchOpen
                                    ? 'opacity-100 scale-100 translate-y-0'
                                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                            } w-[250px]`}
                        >
                            <div className="p-2">
                                <NavSearchButton />
                            </div>
                        </div>
                    </div>

                    {/* Profile Menu */}
                    <div className="relative inline-block" ref={profileMenuRef}>
                        <button
                            onClick={toggleProfileMenu}
                            className="cursor-pointer p-2 bg-gray-400 text-white rounded-full"
                        >
                            <CiUser size={15} />
                        </button>

                        {/*profile section */}
                        {profileMenuOpen && (
                            <>
                                {token ? (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow">
                                        <ul className="text-sm text-gray-700">
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                <Link className="flex items-center gap-2" onClick={toggleProfileClose} href="/profile">
                                                    <CiUser size={15} /> Profile
                                                </Link>
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                <button onClick={logout} className="flex gap-2 items-center w-full text-left cursor-pointer">
                                                    <AiOutlineLogout size={15} /> Log out
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow">
                                        <Link onClick={toggleProfileClose} className="hover:text-blue-600 py-2 text-center block" href="/login">
                                            Login
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default AppNavbar;
