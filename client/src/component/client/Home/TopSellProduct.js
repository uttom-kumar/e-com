'use client'
import React from 'react';
import CommonProductCard from "@/component/client/common/Common-Product-Card";
import {useSelector} from "react-redux";
import {FaArrowRight} from "react-icons/fa";
import Link from "next/link";

const TopSellProduct = () => {
    const ProductList = useSelector((state) => state.productList.productList);

    const categoryProducts = ProductList?.filter(item => item.category === 't-shirt');

    if(categoryProducts.length === 0){
        return null;
    }

    return (
        <div>
            <div className="text-left">
                <p className="text-2xl capitalize">Top Sell Products</p>
            </div>
            <div className={"bg-gray-50 py-10 mb-10"}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-5">
                    {categoryProducts?.slice(0,12)?.map((product, index) => (
                        <div key={index}>
                            <CommonProductCard  product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopSellProduct;