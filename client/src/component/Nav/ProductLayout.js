'use client'
import React, { useState } from 'react';
import ProductNav from "@/component/Nav/product-nav";
import ProductList from "@/component/client/Product/Product-List";
import {useSelector} from "react-redux";

const ProductLayout = () => {
    const Data = useSelector((state) => state.DataList.data);
    const [selectedCategory, setSelectedCategory] = useState('');


    const categories = [...new Set(Data.map(item => item.category))];


    return (
        <div className=" min-h-screen">
            <ProductNav />

            <div className="container mx-auto py-5">
                <div className="flex flex-col md:flex-row gap-6">

                    {/* Filter Sidebar */}
                    <aside className="w-full md:max-w-xs h-[100%] bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-6">Filters</h2>

                        {/* Category Select */}
                        <div className="mb-6">
                            <label
                                htmlFor="category"
                                className="block mb-2 text-sm font-medium text-gray-700"
                            >
                                Category
                            </label>
                            <div className="relative">
                                <select
                                    id="category"
                                    className="cursor-pointer block w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option disabled value="">Choose Category</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </option>
                                    ))}
                                </select>

                                {/* Down Arrow Icon */}
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>


                        {/* Price Range */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Price (Max)</label>
                            <input
                                type="number"
                                min={1}
                                placeholder="Enter max price"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>
                    </aside>

                    {/* Product List */}
                    <main className="flex-1">
                        <ProductList />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProductLayout;
