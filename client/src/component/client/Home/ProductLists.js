'use client'
import React from 'react';
import {useSelector} from "react-redux";
import CommonProductCard from "@/component/client/common/Common-Product-Card";
import {FaArrowRight} from "react-icons/fa";

const ProductLists = () => {
    const allProducts = useSelector((state) => state.DataList.data);

    return (
        <div>
            <div className={"bg-gray-50 py-10 px-5 my-5"}>
                <div className={'text-center  mb-10 '}>
                    <h2 className="text-xl font-semibold capitalize">Our Products</h2>
                    <p className={'text-gray-500'}>Explore a World of Choices Across Our Most Popular</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-5">
                    {allProducts.map((product, index) => (
                        <div key={index}>
                            <CommonProductCard  product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductLists;