'use client';

import React from 'react';
import { CiSearch } from 'react-icons/ci';

const OrderList = () => {
    return (
        <div className={'container mx-auto py-6'}>
            <div className="p-4 min-h-screen">
                {/* Search Bar */}
                <div className="mb-4">
                    <div className="w-full border bg-gray-100 p-3 rounded-md flex items-center gap-2">
                        <CiSearch size={20} className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by seller name, order ID or product name"
                            className="w-full bg-transparent  outline-none text-sm"
                        />
                    </div>
                </div>

                {/* Order Section */}
                <div className="bg-white rounded shadow-sm border">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <p className="font-semibold text-sm flex items-center gap-2">
                            🏠 Home Solution
                        </p>
                        <span className="bg-gray-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">
                        Cancelled
                    </span>
                    </div>

                    {/* Order Details */}
                    <div className="flex items-start gap-4 p-4">
                        {/* Product Image */}
                        <img
                            src="https://placehold.co/70x70" // Replace with actual image
                            alt="product"
                            className="w-20 h-20 object-cover rounded"
                        />

                        {/* Product Info */}
                        <div className="flex-1">
                            <p className="text-sm font-medium leading-snug">
                                Game Trigger Button Transparent Metal Control for PUBG Mobile Gamed Controller...
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Color Family: White</p>
                        </div>

                        {/* Price and Qty */}
                        <div className="text-sm text-right whitespace-nowrap">
                            <p className="font-medium">৳ 70</p>
                            <p className="text-gray-600 text-sm mt-1">Qty: <span className="font-medium">1</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderList;
