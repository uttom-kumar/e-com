'use client';
import React from 'react';
import TShirtCollection from "@/component/client/Home/T-Shirt-Collection";
import BannerSection from "@/component/client/Home/BannerSection";
import Features from "@/component/client/Home/Features";
import CategorySection from "@/component/client/Home/CategorySection";
import ProductLists from "@/component/client/Home/ProductLists";


const AllProductList = () => {

    return (
        <div className="container mx-auto space-y-8 ">
            <BannerSection />
            <Features />
            <CategorySection />
            <TShirtCollection />
            <ProductLists />
        </div>
    );
};

export default AllProductList;
