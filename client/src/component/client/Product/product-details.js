'use client';

import React, { useState } from 'react';
import ProductImagesGallery from "@/component/client/common/ProductImageGallery";
// import StarRatings from "react-star-ratings/build/star-ratings";
import {useSelector} from "react-redux";
import {LuShoppingCart} from "react-icons/lu";
import {IoBagOutline} from "react-icons/io5";
import CategorySection from "@/component/client/Home/CategorySection";
import {isUserLoggedIn, Unauthorized} from "@/component/Utility/Helper";
import {useParams, useRouter} from "next/navigation";
import dynamic from "next/dynamic";
import {CreateCartRequest, ReadCartRequest} from "@/component/Request-Api/CartRequest";
import toast from "react-hot-toast";
import {GiSelfLove} from "react-icons/gi";
import {CreateWishRequest, ReadWishRequest} from "@/component/Request-Api/WishRequest";

const StarRatings = dynamic(() => import('react-star-ratings'), { ssr: false })

const ProductDetails = () => {
    const ProductList = useSelector((state) => state.productList.productList);
    const isLoading = useSelector(state => state.loading.isLoading);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const token = isUserLoggedIn()
    const router = useRouter();

    const incrementQuantity = () => {
        setQuantity(quantity => quantity+1)
    }
    const decrementQuantity = () => {
        if(quantity > 1){
            setQuantity(quantity => quantity-1)

        }
    }


    // add to Wish handler
    const handleWishHandler =async (productID) => {
        if(!token){
            router.push('/login')
            alert('Please login first')
        }
        else{
            let res = await CreateWishRequest(productID)
            if(res === true) {
                await ReadWishRequest()
            }
        }
    };
    // add to cart handler
    const handleAddToCart = async (productID) => {
        if(!token){
            router.push('/login')
        }
        else if(selectedColor === '' || selectedSize === ''){
            toast.error('Please select color and size');
            return false;
        }
        else{
            const res = await CreateCartRequest(selectedColor, selectedSize, quantity, productID)
            if(res === true) {
                await ReadCartRequest()
            }
        }
    };


    return (
        <div className="container mx-auto py-5">
            <div className="block md:flex gap-x-5 gap-y-5">
                {/* Left - Gallery */}
                <div className="w-full md:w-[50%]">
                    <ProductImagesGallery />
                </div>

                {/* right - Description */}
                <div className="w-full md:w-[50%]">
                    {
                        ProductList?.map((product, i) => {
                            return (
                                <div key={i} className={'space-y-5'}>
                                    {/* Product Info */}
                                    <div>
                                        <p className="text-2xl text-black">{product?.title}</p>
                                        <div className="flex flex-col gap-2 text-gray-700">
                                            {/* Price */}
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-gray-500 text-sm">Price:</span>
                                                <span className="text-2xl font-semibold text-blue-600">
                                                  ৳{product?.discount ? product?.discountPrice : product?.price }
                                                </span>
                                                {
                                                    product?.discount && (
                                                    <span className="text-sm font-medium text-white bg-red-500 px-2 py-0.5 rounded">
                                                    -{Math.round(((product?.price - product?.discountPrice) / product?.price) * 100)}%
                                                    </span>
                                                    )
                                                }
                                            </div>

                                            {/* Regular Price */}
                                            {product?.discount && (
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-gray-500 text-sm">Regular:</span>
                                                    <del className="text-lg text-gray-400">৳{product?.price}</del>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <p>
                                                <span className="text-gray-500">Status:</span>
                                                <span className="ml-2 text-green-600 font-medium">
                                                    {
                                                        product?.stock === 0 ? 'Out of Stock' : 'In Stock'
                                                    }
                                                </span>
                                            </p>
                                            <p>
                                                <span className="text-gray-500">Product Code:</span>
                                                <span className="ml-2">{product?.productCode}</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Product Description */}
                                    <p className="text-sm text-gray-500 leading-6">
                                        {product?.description}
                                    </p>

                                    {/* Options: Color, Size, Quantity */}
                                    <div className="flex flex-wrap gap-2 sm:gap-5">

                                        {/* Color Selector */}
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 mb-2 block">Color</label>
                                            <select
                                                value={selectedColor}
                                                onChange={(e) => setSelectedColor(e.target.value)}
                                                className="cursor-pointer min-w-[120px] border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                                            >
                                                <option value="" disabled>Select Color</option>
                                                {product?.detail?.color.split(',')?.map((color, i) => (
                                                    <option key={i} value={color}>
                                                        {color.toUpperCase()}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/*Size Selector*/}
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 mb-2 block">Size</label>
                                            <select
                                                value={selectedSize}
                                                onChange={(e) => setSelectedSize(e.target.value)}
                                                className="cursor-pointer min-w-[120px] border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                                            >
                                                <option value="" disabled>Select size</option>
                                                {product?.detail?.size?.split(",")?.map((size, i) => (
                                                    <option key={i} value={size}>
                                                        {size.toUpperCase()}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Quantity Selector */}
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 mb-2 block">Quantity</label>
                                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-max bg-gray-50">
                                                <button
                                                    className={`px-3 py-2 text-lg font-bold transition ${
                                                        quantity === 1
                                                            ? 'cursor-not-allowed text-gray-400'
                                                            : 'cursor-pointer hover:bg-gray-200'
                                                    }`}
                                                    onClick={decrementQuantity}
                                                    aria-label="Decrease quantity"
                                                    disabled={quantity === 1}
                                                >
                                                    −
                                                </button>
                                                <input
                                                    value={quantity}
                                                    type="text"
                                                    className="w-12 text-center text-lg font-semibold bg-transparent focus:outline-none"
                                                    readOnly
                                                />
                                                <button
                                                    className={`px-3 py-2 text-lg font-bold  transition 
                                                        ${product?.stock === quantity ? 'bg-gray-200 text-gray-400' +
                                                        ' cursor-not-allowed' : 'hover:bg-gray-200 cursor-pointer'
                                                    }`}
                                                    onClick={incrementQuantity}
                                                    aria-label="Increase quantity"
                                                    disabled={product?.stock === quantity}
                                                >
                                                    +
                                                </button>

                                            </div>
                                        </div>

                                    </div>

                                    {/* Add to Cart */}
                                    <div>
                                        <p className="text-lg font-semibold text-black mb-2">
                                            Total: ৳{product?.discountPrice * quantity}
                                        </p>
                                        <div className={'flex gap-5'}>
                                            <button
                                                onClick={() =>handleWishHandler(product?._id)}
                                                className="cursor-pointer flex items-center gap-1 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all w-full md:w-auto"
                                            >
                                                <GiSelfLove size={20} /><span>Add Wishes</span>
                                            </button>
                                            <button
                                                onClick={()=>handleAddToCart(product?._id)}
                                                className="flex items-center gap-1 cursor-pointer bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-700 transition-all w-full md:w-auto"
                                            >
                                                <IoBagOutline size={20} /><span>Add to Cart</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {/*---- category section ----*/}
            <div className={'my-10'}>
                <CategorySection />
            </div>


            {/* Product review */}
            <div className="mt-5">
                <p className="text-2xl mb-4">Product Reviews</p>

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
                                        rating={parseFloat('4.5')}
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
