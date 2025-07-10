'use client'
import React from 'react';
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"

const ProductImageGallery = () => {
    let images = [
        {
            original : "https://static.vecteezy.com/system/resources/thumbnails/028/244/679/small/white-t-shirt-mockup-male-t-shirt-with-short-sleeves-front-back-view-realistic-3d-mock-up-ai-generated-photo.jpg",
            thumbnail : "https://static.vecteezy.com/system/resources/thumbnails/028/244/679/small/white-t-shirt-mockup-male-t-shirt-with-short-sleeves-front-back-view-realistic-3d-mock-up-ai-generated-photo.jpg",
        },
        {
            original :"https://static.vecteezy.com/system/resources/thumbnails/025/289/353/small/commercial-white-t-shirt-mockup-photo.jpg" ,
            thumbnail : "https://static.vecteezy.com/system/resources/thumbnails/025/289/353/small/commercial-white-t-shirt-mockup-photo.jpg",
        },
        {
            original : "https://static.vecteezy.com/system/resources/thumbnails/002/901/723/small/kid-s-t-shirt-isolated-on-white-background-with-clipping-path-free-photo.jpg",
            thumbnail :"https://static.vecteezy.com/system/resources/thumbnails/002/901/723/small/kid-s-t-shirt-isolated-on-white-background-with-clipping-path-free-photo.jpg",
        },
        {
            original : "https://static.vecteezy.com/system/resources/thumbnails/028/252/048/small/men-s-t-shirt-realistic-mockup-in-different-colors-ai-generated-photo.jpg",
            thumbnail : "https://static.vecteezy.com/system/resources/thumbnails/028/252/048/small/men-s-t-shirt-realistic-mockup-in-different-colors-ai-generated-photo.jpg",
        }
    ]
    return (
        <div>
            <ImageGallery autoPlay={false} items={images}/>
        </div>
    );
};

export default ProductImageGallery;