'use client';
import React from 'react';
import TradingProduct from "@/component/client/Home/TradingProduct";
import BannerSection from "@/component/client/Home/BannerSection";
import Features from "@/component/client/Home/Features";
import CategorySection from "@/component/client/Home/CategorySection";
import ProductLists from "@/component/client/Home/ProductLists";
import TopSellProduct from "@/component/client/Home/TopSellProduct";


const AllProductList = () => {

    return (
        <div className="container mx-auto space-y-8 ">
            <BannerSection />
            <Features />
            <CategorySection />
            <TradingProduct />
            <TopSellProduct />
            <ProductLists />
        </div>
    );
};

export default AllProductList;
