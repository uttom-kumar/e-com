'use client';
import React, {useEffect, useState} from 'react';
import {AiOutlineDelete} from "react-icons/ai";
import {useSelector} from "react-redux";
import {DeleteCartRequest, ReadCartRequest} from "@/component/Request-Api/CartRequest";
import Link from "next/link";

const CartPage = () => {
    const CartList = useSelector((state) => state.cartList.cartList);
    const totalQty = useSelector((state) => state.cartList.cartQuantity);
    const totalPrice = useSelector((state) => state.cartList.TotalPrice);


    const DeleteCartHandler =async (id) => {
        let res = await DeleteCartRequest(id)
        if(res === true){
            await ReadCartRequest()
        }
    }


    return (
        <div className="container mx-auto py-6">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left: Cart Table */}
                <div className="flex-1 bg-white  rounded-lg shadow ">
                    <h2 className="text-xl font-semibold mb-4 px-5 pt-5">Capital Express</h2>

                    <div className="w-full overflow-x-auto whitespace-nowrap rounded shadow">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="p-3 text-left">Product</th>
                                <th className="p-3 text-left">Details</th>
                                <th className="p-3 text-center">Price</th>
                                <th className="p-3 text-center">Quantity</th>
                                <th className={"p-3 text-center"}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                CartList.map((data, i) => {
                                    return (
                                        <tr key={i} className=" hover:bg-gray-50">
                                            {/* Image */}
                                            <td className="p-3">
                                               <Link href={`/product-details/${data?.product?._id}`}>
                                                   <img
                                                       src={data?.productDetail?.images[0]}
                                                       alt={data?.product?.title}
                                                       className="w-16 h-16 object-cover rounded"
                                                   />
                                               </Link>
                                            </td>

                                            {/* Details */}
                                            <td className="p-3">
                                                <Link href={`/product-details/${data?.product?._id}`}>
                                                    <p className="font-semibold">{data?.product?.title}</p>
                                                </Link>
                                                <p className="text-gray-500 text-xs">Color Family: {data?.color}</p>
                                            </td>

                                            {/* Price */}
                                            <td className="p-3 text-center">
                                                {totalPrice}
                                            </td>

                                            {/* Quantity */}
                                            <td className="p-3 text-center">
                                                <div className="flex justify-center items-center gap-2">
                                                    <p>{totalQty}</p>
                                                </div>
                                            </td>
                                            <td className="p-3 text-center">
                                                <button onClick={()=>DeleteCartHandler(data?._id)} className={'cursor-pointer' +
                                                    ' text-red-500'}>
                                                    <AiOutlineDelete size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right: Order Summary */}
                <div className="w-full lg:w-80 bg-white rounded-xl shadow p-6 h-fit">
                    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                    <div className="flex justify-between text-sm mb-2">
                        <span>Subtotal ({totalQty} items)</span>
                        <span>৳ {totalPrice}</span>
                    </div>

                    <div className="flex justify-between text-sm mb-2">
                        <span>Shipping Fee</span>
                        <span>৳ 50</span>
                    </div>

                    <hr className="my-3" />

                    <div className="flex justify-between text-base font-semibold mb-4">
                        <span>Total</span>
                        <span>৳ {totalPrice + 50}</span>
                    </div>

                    <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 font-semibold transition">
                        PROCEED TO CHECKOUT (3)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
