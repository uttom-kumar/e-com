'use client'
import React from 'react';
import { CiSearch } from "react-icons/ci";

const NavSearchButton = () => {
    return (
        <div className="w-full">
            <div className="max-w-xl ms-auto">
                <div className="flex rounded-lg overflow-hidden shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 transition">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full px-5 py-3 text-sm outline-none"
                        aria-label="Search input"
                    />
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 flex items-center justify-center transition-all duration-200"
                        aria-label="Search"
                    >
                        <CiSearch size={22} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NavSearchButton;
