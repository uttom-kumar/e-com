'use client';

import React, {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {FaShoppingCart } from 'react-icons/fa';
import { AiOutlineProduct} from 'react-icons/ai';
import {CiUser } from "react-icons/ci";
import NavSearchButton from "@/component/Nav/Nav-Search-Button";
import {IoBagOutline, IoHomeOutline} from "react-icons/io5";
import {GrDeliver} from "react-icons/gr";
import {GiSelfLove} from "react-icons/gi";
import MobileNav from "@/component/Nav/MobileNav";

const AppNavbar = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [myToken, setMyToken] = useState(null);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const profileMenuRef = useRef(null);


    const toggleProfileMenu = () => setProfileMenuOpen(prev => !prev);
    const toggleProfileClose = ()  => setProfileMenuOpen(!profileMenuOpen);


    useEffect(() => {
        const token = localStorage.getItem('token');
        setMyToken(token);
    }, []);
    

    const items = [
        { path: '/', icon: <IoHomeOutline  size={20} />, text: 'Home' },
        { path: '/products', icon: <AiOutlineProduct  size={20} />, text: 'Products' },
        { path: '/add-cart', icon: <IoBagOutline  size={20} />, text: 'Add Cart', count: 20 },
        { path: '/wishes', icon: <GiSelfLove size={20} />, text: 'Wishes', count: 3 },
        { path: '/order', icon: <GrDeliver size={20} />, text: 'Order' },
    ];

    const toggleMenu = () => setMenuOpen(!menuOpen);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setProfileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
       <div className={" bg-white shadow-md px-4 md:px-8 py-4 relative z-50 "}>
           <nav className="container mx-auto">
               <div className="flex items-center justify-between">
                   {/* Logo */}
                   <Link href="/">
                      <span className="text-2xl font-bold text-blue-600 cursor-pointer hover:opacity-80 transition">
                        MyShop
                      </span>
                   </Link>


                   {/* Desktop Menu */}
                   <div className=" flex items-center gap-5 md:gap-10">
                       {items.map((item, index) => {
                           const isActive = pathname === item.path;
                           return (
                               <Link className={'hidden sm:block'} key={index} href={item.path}>
                                   <div
                                       className={`group relative flex items-center gap-2 transition cursor-pointer ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}
                                   >
                                       <span>{item.icon}</span>

                                       {/* Tooltip */}
                                       <span
                                           className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block whitespace-nowrap bg-black text-white text-xs rounded px-2 py-1 z-10 shadow-lg"
                                       >
                                      {item.text}
                                    </span>


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
                       <div>
                           <div className={'flex items-center gap-6'}>
                               {
                                   !myToken ? (
                                       <>
                                           <div className="relative inline-block" ref={profileMenuRef}>
                                               <button
                                                   onClick={toggleProfileMenu}
                                                   className="cursor-pointer p-2 bg-gray-400 text-white rounded-full"
                                               >
                                                   <CiUser size={15} />
                                               </button>

                                               {profileMenuOpen && (
                                                   <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow">
                                                       <ul className="text-sm text-gray-700">
                                                           <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                               <Link className={'block'} onClick={toggleProfileClose} href={'/profile'}>Profile</Link>
                                                           </li>
                                                           <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Orders</li>
                                                           <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Returns</li>
                                                           <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                                                       </ul>
                                                   </div>
                                               )}
                                           </div>
                                       </>
                                   ) : (
                                       <Link className={"hover:text-blue-600"} href={'/login'}>Login</Link>
                                   )
                               }
                           </div>
                       </div>
                   </div>
               </div>
           </nav>
       </div>
    );
};

export default AppNavbar;