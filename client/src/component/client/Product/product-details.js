'use client';

import React, { useState } from 'react';
import ProductImagesGallery from "@/component/client/common/ProductImageGallery";
import StarRatings from "react-star-ratings/build/star-ratings";

const ProductDetails = () => {
    // Simulated product data (replace with real props or fetch later)
    const product = {
        title: 'Carolina T-shirt',
        price: 150,
        discountPrice: 50,
        colors: ['red', 'green', 'blue'],
        sizes: ['sm', 'm', 'lg', 'xl', 'xxl'],
        rating: '4'
    };

    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        setQuantity(quantity => quantity+1)
    }
    const decrementQuantity = () => {
        if(quantity > 1){
            setQuantity(quantity => quantity-1)

        }
    }

    const handleAddToCart = () => {
        const cartItem = {
            ...product,
            selectedColor,
            selectedSize,
            quantity,
        };
       alert('successfully added to add-cart', cartItem);
    };

    return (
        <div className="container mx-auto py-5">
            <div className="block md:flex gap-x-5 gap-y-5">
                {/* Left - Gallery */}
                <div className="w-full md:w-[50%]">
                    <ProductImagesGallery />
                </div>

                {/* right - Description */}
                <div className="w-full md:w-[50%] space-y-6">
                    {/* Product Info */}
                    <div>
                        <h2 className="text-3xl font-semibold text-black mb-3">{product.title}</h2>
                        <div className="space-y-2 text-gray-700">
                            <p>
                                <span className="text-gray-500">Price:</span>
                                <span className="text-xl text-black font-medium ml-2">৳{product.price}</span>
                            </p>
                            <p>
                                <span className="text-gray-500">Regular Price:</span>
                                <del className="ml-2 text-gray-400">৳{product.price + product.discountPrice}</del>
                            </p>
                            <p>
                                <span className="text-gray-500">Status:</span>
                                <span className="ml-2 text-green-600 font-medium">In Stock</span>
                            </p>
                            <p>
                                <span className="text-gray-500">Product Code:</span>
                                <span className="ml-2">20253</span>
                            </p>
                        </div>
                    </div>

                    {/* Product Description */}
                    <p className="text-sm text-gray-500 leading-6">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias aliquam aliquid autem blanditiis consectetur dignissimos, eaque esse fugiat hic impedit inventore molestias nihil...
                    </p>

                    {/* Options: Color, Size, Quantity */}
                    <div className="space-y-4">
                        {/* Color Selector */}
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1 block">Select Color</label>
                            <div className="flex gap-2">
                                {product.colors.map((color, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedColor(color)}
                                        className={`cursor-pointer w-6 h-6 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div className="mb-4">
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Select Size
                            </label>
                            <select
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                                className="cursor-pointer w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out shadow-sm"
                            >
                                <option value="" disabled>Select a size</option>
                                {product.sizes.map((size, i) => (
                                    <option key={i} value={size}>
                                        {size.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                        </div>


                        {/* Quantity */}
                        <div className="p-2">
                            <label className="text-lg font-medium text-gray-700">Quantity</label>
                            <div className="flex items-center mt-2 border border-gray-300 rounded-lg overflow-hidden w-max">
                                <button
                                    className={`${quantity===1 ? 'cursor-not-allowed' : 'cursor-pointer bg-gray-100'} hover:bg-gray-200 text-xl font-bold  transition px-4 py-2`}
                                    onClick={decrementQuantity}
                                    aria-label="Decrease quantity"
                                    disabled={quantity === 1}
                                >
                                    −
                                </button>
                                <input
                                    value={quantity}
                                    type="text"
                                    className="w-10 text-center text-lg font-semibold focus:outline-none"
                                    readOnly
                                />
                                <button
                                    className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-xl font-bold px-4 py-2 transition"
                                    onClick={incrementQuantity}
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Add to Cart */}
                    <div>
                        <p className="text-lg font-semibold text-black mb-2">
                            Total: ৳{product.price * quantity}
                        </p>
                       <div className={'flex gap-5'}>
                           <button
                               onClick={handleAddToCart}
                               className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700 transition-all w-full md:w-auto"
                           >
                                Buy Now
                           </button>
                           <button
                               onClick={handleAddToCart}
                               className="cursor-pointer bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-700 transition-all w-full md:w-auto"
                           >
                               Add to Cart
                           </button>
                       </div>
                    </div>
                </div>

            </div>
            {/* Product review */}
            <div className="mt-5">
                <p className="text-3xl font-bold mb-4">Product Reviews</p>

                {/* Single Review */}
                {
                    Array.from(Array(10).keys()).map((_, i) => (
                        <div key={i} className=" my-5 bg-gray-50 p-4 rounded-lg shadow-sm">
                            {/* User Icon */}
                            <div className="flex  items-center gap-2">
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
                                    {/* Initials or Icon */}
                                    <span>U</span>
                                </div>
                                <div>
                                    <p className="text-sm m-0 p-0 font-semibold text-gray-800">Uttom Kumar</p>
                                    <StarRatings
                                        rating={parseFloat(product.rating)}
                                        starRatedColor="orange"
                                        starDimension="15px"
                                        starSpacing="2px"
                                    />
                                </div>
                            </div>

                            {/* Review Content */}
                            <div>
                                <p className="text-gray-400 mt-1">
                                    Great product! The quality is top-notch and the delivery was fast. Would definitely recommend it to others.
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default ProductDetails;
