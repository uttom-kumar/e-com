'use client'
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductCardSkeleton = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {Array.from({ length: 12 }).map((_, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl shadow-md p-4 flex flex-col space-y-3"
                >
                    <Skeleton height={160} borderRadius={8} /> {/* Image */}
                    <Skeleton height={18} width="80%" /> {/* Title */}
                    <Skeleton height={16} width="60%" /> {/* Price */}
                    <div className="mt-auto">
                        <Skeleton height={36} borderRadius={8} /> {/* Button */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductCardSkeleton;
