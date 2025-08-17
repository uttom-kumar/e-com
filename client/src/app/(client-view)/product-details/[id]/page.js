'use client'
import React, {useEffect} from 'react';
import ProductDetails from "@/component/client/Product/product-details";
import {useParams} from "next/navigation";
import {CategoryReadRequest, ProductDetailsRead} from "@/component/Request-Api/AllRequest";

const Page = () => {
    const {id} = useParams();

    useEffect(() => {
        (async () => {
            await ProductDetailsRead(id)
            await CategoryReadRequest()
        })()
    }, []);

    return (
        <div>
            <ProductDetails />
        </div>
    );
};

export default Page;