'use client'
import React, {useEffect} from 'react';
import CommonProductCard from "@/component/client/common/Common-Product-Card";
import {useSelector} from "react-redux";



const ProductList = () => {
    const ProductList = useSelector((state) => state.productList.productList);


    return (
        <div className={'container bg-gray-50 py-5 rounded-2xl mx-auto '}>
            {/*---- products Lists -----*/}
            <div className={'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' +
                ' 2xl:grid-cols-5 gap-2 sm:gap-5 '}>
                {
                    ProductList.map((product, index) => {
                        return (
                            <CommonProductCard product={product} key={index} />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default ProductList;