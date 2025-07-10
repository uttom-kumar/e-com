'use client';
import React from 'react';
import TShirtCollection from "@/component/client/Home/T-Shirt-Collection";
import ProductNav from "@/component/Nav/product-nav";
import ShirtCollection from "@/component/client/Home/Shirt-Collection";
import PantCollection from "@/component/client/Home/Pant-Collection";
import PunjabiCollection from "@/component/client/Home/Punjabi-Collection";
import BlazerCollection from "@/component/client/Home/Blazer-Collection";


const AllProductList = () => {

    return (
        <div className="container mx-auto space-y-8 ">
            {/*---- product navbar ----*/}
            <div>
                <ProductNav />
            </div>

            <TShirtCollection />
            <ShirtCollection />
            <PunjabiCollection />
            <BlazerCollection />
            <PantCollection />

        </div>
    );
};

export default AllProductList;
