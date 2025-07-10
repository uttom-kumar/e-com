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
            <div className={'bg-white p-5 rounded'}>
                <div className={'flex items-center justify-between  mb-5  '}>
                    <h2 className="text-xl font-semibold capitalize">T-Shirt Collection</h2>
                    <button className={'cursor-pointer flex items-center gap-2'}>
                        View More <FaArrowRight />
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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