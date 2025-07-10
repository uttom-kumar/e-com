'use client'
import React from 'react';
import CommonWishListCard from "@/component/client/common/Common-WishList-Card";

const DataList = [
    {
        id: 1,
        title: 'Carolina',
        description: 'Classic Carolina style t-shirt',
        price: 150,
        discountPrice: 50,
        size: ['sm', 'md', 'lg', 'xl'],
        colors: ['red', 'green', 'yellow', 'blue'],
        qty: '4',
        season: 'summer',
        category: 't-shirt',
        image: ['Carolina1.jpg', 'Carolina2.jpg', 'Carolina3.jpg'],
        rating: '4'
    },
    {
        id: 2,
        title: 'Urban Vibe',
        description: 'Trendy urban streetwear t-shirt',
        price: 170,
        discountPrice: 50,
        size: ['sm', 'md', 'lg'],
        colors: ['black', 'white'],
        qty: '10',
        season: 'summer',
        category: 't-shirt',
        image: ['Urban1.jpg', 'Urban2.jpg', 'Urban3.jpg'],
        rating: '4.5'
    },
    {
        id: 3,
        title: 'Classic Fit',
        description: 'Comfortable everyday wear shirt',
        price: 120,
        discountPrice: 30,
        size: ['md', 'lg', 'xl'],
        colors: ['navy', 'gray'],
        qty: '6',
        season: 'spring',
        category: 'shirt',
        image: ['Classic1.jpg', 'Classic2.jpg', 'Classic3.jpg'],
        rating: '4'
    }
];

const WishesList = () => {
    return (
        <div>
            <div className={'container mx-auto py-6'}>
                <div className={'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 gap-y-[50px]'}>
                    {
                        DataList.map((product, index) => {
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