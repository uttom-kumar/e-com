'use client'
import React from 'react';
import NavSearchButton from "@/component/Nav/Nav-Search-Button";

const ProductNav = () => {
    return (
        <div className="mb-5  ">
            <div className="container mx-auto">
                <div className="bg-white rounded px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Left: Title and view toggle */}
                    <div className="flex items-center gap-4">
                        <button className="text-xl font-semibold text-gray-800">
                            Products
                        </button>
                    </div>

                    {/* Right: Search */}
                    <div className="w-full md:w-1/2">
                        <NavSearchButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductNav;
