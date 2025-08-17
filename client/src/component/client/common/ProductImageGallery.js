'use client'
import React from 'react';
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import {useSelector} from "react-redux";

const ProductImageGallery = () => {
    const ProductList = useSelector((state) => state.productList.productList);

    const productImages = ProductList[0]?.detail?.images || [];

    const images = productImages.map(img => ({
        original: img,
        thumbnail: img
    }));
    return (
        <div>
            <ImageGallery autoPlay={false} items={images}/>
        </div>
    );
};

export default ProductImageGallery;