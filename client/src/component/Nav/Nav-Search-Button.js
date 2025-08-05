'use client'
import React from 'react';
import { CiSearch } from "react-icons/ci";

const NavSearchButton = () => {

    const SubmitHandler = (e) => {
        e.preventDefault();
    }


    return (
        <div className="w-full">
            <div className="max-w-xl ms-auto">
                <form onSubmit={SubmitHandler}>
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-gray-500 text-xs">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="bg-transparent w-full outline-none placeholder-gray-400"
                            aria-label="Search input"
                        />
                        <button
                            className="cursor-pointer"
                            aria-label="Search"
                            type="submit"
                        >
                            <CiSearch size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NavSearchButton;
