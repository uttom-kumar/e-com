'use client';
import React, { useState } from 'react';
import {AiOutlineDelete} from "react-icons/ai";

const CartPage = () => {
    const [quantity, setQuantity] = useState(1);

    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

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
                            {Array.from(Array(3).keys()).map((_, i) => (
                                <tr key={i} className=" hover:bg-gray-50">
                                    {/* Image */}
                                    <td className="p-3">
                                        <img
                                            src="https://via.placeholder.com/100"
                                            alt="product"
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>

                                    {/* Details */}
                                    <td className="p-3">
                                        <p className="font-semibold">MTB Bike Cassette Flywheel Tool</p>
                                        <p className="text-gray-500 text-xs">No Brand, Color Family: Black</p>
                                    </td>

                                    {/* Price */}
                                    <td className="p-3 text-center">
                                        <div className=" font-bold">৳ 125</div>
                                    </td>

                                    {/* Quantity */}
                                    <td className="p-3 text-center">
                                        <div className="flex justify-center items-center gap-2">
                                            <button
                                                onClick={decrementQuantity}
                                                disabled={quantity === 1}
                                                className={`w-8 h-8 border rounded flex items-center justify-center font-bold transition ${
                                                    quantity === 1
                                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                        : 'cursor-pointer bg-gray-100 hover:bg-gray-200'
                                                }`}
                                            >
                                                −
                                            </button>
                                            <input
                                                readOnly
                                                value={quantity}
                                                className="w-10 text-center rounded outline-none"
                                            />
                                            <button
                                                onClick={incrementQuantity}
                                                className="cursor-pointer w-8 h-8 border rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold transition"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="p-3 text-center">
                                        <button className={'cursor-pointer text-red-500'}>
                                            <AiOutlineDelete size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right: Order Summary */}
                <div className="w-full lg:w-80 bg-white rounded-xl shadow p-6 h-fit">
                    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                    <div className="flex justify-between text-sm mb-2">
                        <span>Subtotal (3 items)</span>
                        <span>৳ 375</span>
                    </div>

                    <div className="flex justify-between text-sm mb-2">
                        <span>Shipping Fee</span>
                        <span>৳ 50</span>
                    </div>

                    <hr className="my-3" />

                    <div className="flex justify-between text-base font-semibold mb-4">
                        <span>Total</span>
                        <span>৳ 425</span>
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
