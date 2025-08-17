'use client'
import React from 'react';
import Link from "next/link";
import dynamic from "next/dynamic";
import {DeleteWishRequest, ReadWishRequest} from "@/component/Request-Api/WishRequest";
const StarRatings = dynamic(() => import('react-star-ratings'), { ssr: false })

const CommonWishListCard = ({ product }) => {
    console.log(product?.productID)

    const DeleteWishList = async (productID) => {
        let res = await DeleteWishRequest(productID)
        if(res===true){
            await ReadWishRequest()
        }
    }

    return (
        <div className=" rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl group">
            {/* Product Image */}
            <div className="relative overflow-hidden h-48">
                <Link href={`/product-details/${product?.productID}`}>
                    <img
                        src={product?.productDetail?.images[0] || 'https://via.placeholder.com/300x200'}
                        alt={product?.product?.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
                <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded shadow">
                    ৳{product.product?.discount === true ?  (<>{product.product?.discountPrice}</>) : (<> {product.product?.price}</>)}
                </span>
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-grow space-y-2">
                <Link href={`/product-details/${product?.productID}`}>
                    <p className="truncate text-gray-800 font-medium text-sm hover:text-blue-500 transition">
                        {product?.product?.title}
                    </p>
                </Link>

                <div className="flex items-center gap-1">
                    <StarRatings
                        rating={parseFloat(2.5)}
                        starRatedColor="orange"
                        starDimension="16px"
                        starSpacing="2px"
                    />
                    <span className="text-xs text-gray-500">({'25'})</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between px-4 pb-4 mt-auto gap-2">
                <Link
                    href={`/product-details/${product?.productID}`}
                    className="w-full text-center py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Details
                </Link>
                <button
                    className="w-full cursor-pointer py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => DeleteWishList(product?.productID)}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CommonWishListCard;
