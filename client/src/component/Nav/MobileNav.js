'use client'
import React from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { IoBagOutline, IoHomeOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { GiSelfLove } from "react-icons/gi";
import { GrDeliver } from "react-icons/gr";

const MobileNav = () => {


    return (
        <div>
            <nav
                className="w-full bg-white border-t rounded-t-2xl shadow-lg flex justify-between items-center px-8 py-3 relative"
                style={{ height: 56 }}
            >
                <Link href={'/products'} aria-label="Grid" className="text-gray-600 text-lg">
                    <AiOutlineProduct size={20}/>
                </Link>
                <button aria-label="Bag" className="text-gray-600 text-lg">
                    <IoBagOutline size={20}/>
                </button>
                <button
                    aria-label="Home"
                    className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-lg"
                >
                    <IoHomeOutline size={20} />
                </button>
                <button aria-label="Favorites" className="text-gray-600 text-lg">
                    <GiSelfLove size={20}/>
                </button>
                <button aria-label="Delivery" className="text-gray-600 text-lg">
                    <GrDeliver size={20}/>
                </button>
            </nav>
        </div>
    );
};

export default MobileNav;
