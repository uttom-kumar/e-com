'use client'
import React from 'react';
import Link from "next/link";
import dynamic from "next/dynamic";
const StarRatings = dynamic(() => import('react-star-ratings'), { ssr: false })


const CommonProductCard = ({product}) => {
    return (
        <div>
            <div
                className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl group"
            >
                <div className="relative overflow-hidden h-48">
                    <Link href={`/product-details/${product?._id}`}>
                        <img
                            src= {product?.detail?.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-300 text-gray-400 group-hover:scale-105"
                        />
                    </Link>
                    <span className="absolute top-2 right-2 text-xs px-2 py-1 rounded shadow">
                        {product?.discount && (
                            <span className="text-sm font-medium text-white bg-red-500 px-2 py-0.5 rounded">
                                -{Math.round(((product?.price - product?.discountPrice) / product?.price) * 100)}%
                            </span>
                        )}
                    </span>
                </div>

                <div className="p-4 flex flex-col flex-grow space-y-2">
                    <Link href={`/product-details/${product?._id}`}>
                        <p className="truncate text-gray-700 text-sm hover:text-blue-400">{product?.title}</p>
                    </Link>

                    <div className="flex items-center gap-2">
                        <p className="text-red-400 text-md">
                            ৳{product?.discount === true ?  (<>{product?.discountPrice}</>) : (<> {product?.price}</>)}
                        </p>
                        {product?.discountPrice && (
                            <p className="line-through text-sm text-gray-400">৳{product?.price}</p>
                        )}
                    </div>

                    <div className="flex items-center ">
                        <StarRatings
                            // rating={parseFloat(product.rating)}
                            rating={parseFloat('4.5')}
                            starRatedColor="orange"
                            starDimension="12px"
                            starSpacing="1px"
                        />
                        <span className="text-xs text-gray-400">({4.5})</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommonProductCard;