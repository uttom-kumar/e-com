'use client';
import React from "react";
import { FaSearch } from "react-icons/fa";

const BannerSection = () => {
    return (
        <div className="my-5 w-full bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-10 rounded-3xl flex flex-col md:flex-row items-center justify-between shadow-2xl overflow-hidden relative">

            {/* Decorative Background */}
            <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-cover opacity-10 pointer-events-none"></div>

            {/* Left: Content */}
            <div className="flex-1 text-center md:text-left relative z-10">
                <h2 className="text-white text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg">
                    Discover Your Style
                </h2>
                <p className="text-white text-lg md:text-xl mb-8 max-w-lg mx-auto md:mx-0">
                    T-Shirt, Pant, Panjabi, Shoe, Lungi, Shando Genji & More!
                </p>

                {/* Search box */}
                <div className="flex w-full max-w-md mx-auto md:mx-0 bg-white rounded-full shadow-lg overflow-hidden transition focus-within:ring-2 focus-within:ring-orange-300">
                    <input
                        type="text"
                        placeholder="Search for your favorite clothing..."
                        className="flex-1 px-5 py-3 outline-none text-gray-700 text-sm md:text-base"
                    />
                    <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white px-6 flex items-center justify-center">
                        <FaSearch />
                    </button>
                </div>
            </div>

            {/* Right: Image */}
            <div className="flex-1 mt-8 md:mt-0 flex justify-center relative z-10 overflow-hidden">
                <img
                    src="/banner.png"
                    alt="Clothing Collection"
                    className="max-h-72 w-auto transform hover:scale-105 transition duration-500"
                />
            </div>
        </div>
    );
};

export default BannerSection;