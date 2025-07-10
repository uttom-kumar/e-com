'use client'
import React from 'react';
import Link from "next/link";
import dynamic from "next/dynamic";
const StarRatings = dynamic(() => import('react-star-ratings'), { ssr: false })


const CommonProductCard = ({product}) => {
    return (
        <div>
            <div
                className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl group"
            >
                <div className="relative overflow-hidden h-48">
                    <Link href={`/product-details/${product.id}`}>
                        <img
                            src= 'https://via.placeholder.com/300x200'
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-300 text-gray-400 group-hover:scale-105"
                        />
                    </Link>
                    <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded shadow">
                        ৳{product.price}
                    </span>
                </div>

                <div className="p-4 flex flex-col flex-grow space-y-2">
                    <Link href={`/product-details/${product.id}`}>
                        <p className="truncate text-gray-700 text-sm hover:text-blue-400">{product.title}</p>
                    </Link>

                    <div className="flex items-center gap-2">
                        <p className="text-red-400 text-md">
                            ৳{product.discountPrice ? product.price - product.discountPrice : product.price}
                        </p>
                        {product.discountPrice && (
                            <p className="line-through text-sm text-gray-400">৳{product.price}</p>
                        )}
                    </div>

                    <div className="flex items-center ">
                        <StarRatings
                            rating={parseFloat(product.rating)}
                            starRatedColor="orange"
                            starDimension="15px"
                            starSpacing="2px"
                        />
                        <span className="text-sm text-gray-400">({product.rating})</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommonProductCard;