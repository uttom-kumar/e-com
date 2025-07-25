'use client'
import React from 'react';
import CommonProductCard from "@/component/client/common/Common-Product-Card";
import {useSelector} from "react-redux";
import {FaArrowRight} from "react-icons/fa";

const TShirtCollection = () => {
    const allProducts = useSelector((state) => state.DataList.data);

    const categoryProducts = allProducts.filter(item => item.category === 't-shirt');



    return (
        <div>
            <div className={"bg-gray-50 py-10 px-5 my-5"}>
                <div className="text-center mb-10">
                    <h2 className="text-xl font-semibold capitalize">Trending Features</h2>
                    <p className="text-gray-500 mt-1">
                        Check out our most loved styles and collections.
                    </p>
                </div>


                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-5">
                    {categoryProducts.slice(0,6).map((product, index) => (
                        <div key={index}>
                            <CommonProductCard  product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TShirtCollection;