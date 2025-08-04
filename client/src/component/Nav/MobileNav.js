'use client';
import React from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { IoBagOutline, IoHomeOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { GiSelfLove } from "react-icons/gi";
import { GrDeliver } from "react-icons/gr";

const MobileNav = () => {
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg rounded-t-2xl border-t z-50">
            <nav
                className="w-full flex justify-between items-center px-8 py-3 relative"
                style={{ height: 64 }}
            >
                {/* Products */}
                <Link
                    href={'/products'}
                    aria-label="Products"
                    className={`text-lg transition-all duration-200 hover:text-blue-600 ${
                        isActive('/products') ? 'text-blue-600' : 'text-gray-600'
                    }`}
                >
                    <AiOutlineProduct size={24} />
                </Link>

                {/* Cart */}
                <Link
                    href={"/add-cart"}
                    aria-label="Cart"
                    className={`text-lg transition-all duration-200 hover:text-blue-600 ${
                        isActive('/add-cart') ? 'text-blue-600' : 'text-gray-600'
                    }`}
                >
                    <IoBagOutline size={24} />
                </Link>

                {/* Home Button (Floating) */}
                <Link
                    href={'/'}
                    aria-label="Home"
                    className={`absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-xl hover:bg-blue-700 transition-all duration-300 ${
                        isActive('/') ? 'scale-110' : ''
                    }`}
                >
                    <IoHomeOutline size={24} />
                </Link>

                {/* Wishlist */}
                <Link
                    href={'/wishes'}
                    aria-label="Wishlist"
                    className={`text-lg transition-all duration-200 hover:text-blue-600 ${
                        isActive('/wishes') ? 'text-blue-600' : 'text-gray-600'
                    }`}
                >
                    <GiSelfLove size={24} />
                </Link>

                {/* Orders */}
                <Link
                    href={'/order'}
                    aria-label="Orders"
                    className={`text-lg transition-all duration-200 hover:text-blue-600 ${
                        isActive('/order') ? 'text-blue-600' : 'text-gray-600'
                    }`}
                >
                    <GrDeliver size={24} />
                </Link>
            </nav>
        </div>
    );
};

export default MobileNav;
