'use client'
import React, {useEffect} from 'react';
import ProductLayout from "@/component/Nav/ProductLayout";
import {ProductListRead} from "@/component/Request-Api/AllRequest";

const Page = () => {
    useEffect(() => {
        (async () => {
           await ProductListRead()
        })()
    }, []);
    return (
        <div>
            <ProductLayout />
        </div>
    );
};

export default Page;