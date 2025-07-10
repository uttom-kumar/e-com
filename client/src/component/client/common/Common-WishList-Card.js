'use client'
import React from 'react';
import Link from "next/link";
import StarRatings from "react-star-ratings/build/star-ratings";

const CommonWishListCard = ({ product }) => {
    return (
        <div className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl group">
            {/* Product Image */}
            <div className="relative overflow-hidden h-48">
                <Link href={`/product-details/${product.id}`}>
                    <img
                        src={product.image || 'https://via.placeholder.com/300x200'}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
                <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded shadow">
                    ৳{product.price}
                </span>
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-grow space-y-2">
                <Link href={`/product-details/${product.id}`}>
                    <p className="truncate text-gray-800 font-medium text-sm hover:text-blue-500 transition">
                        {product.title}
                    </p>
                </Link>

                <div className="flex items-center gap-1">
                    <StarRatings
                        rating={parseFloat(product.rating)}
                        starRatedColor="orange"
                        starDimension="16px"
                        starSpacing="2px"
                    />
                    <span className="text-xs text-gray-500">({product.rating})</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between px-4 pb-4 mt-auto gap-2">
                <Link
                    href={`/product-details/${product.id}`}
                    className="w-full text-center py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Details
                </Link>
                <button
                    className="w-full py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => alert('Remove from wishlist')}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CommonWishListCard;
