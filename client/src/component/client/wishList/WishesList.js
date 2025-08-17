'use client'
import React from 'react';
import CommonWishListCard from "@/component/client/common/Common-WishList-Card";
import {useSelector} from "react-redux";



const WishesList = () => {
    const WishList = useSelector((state)=> state.wishList.wishList);


    return (
        <div>
            <div className={'container bg-gray-50 py-5 rounded-2xl mx-auto'}>
                <div className={'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-5'}>
                    {
                        WishList.map((product, index) => {
                            return (
                                <CommonWishListCard product={product} key={index} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default WishesList;