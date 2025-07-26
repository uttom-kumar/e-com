'use client';
import React from "react";
import { FaHeadset, FaCreditCard, FaTruck } from "react-icons/fa";

const Features = () => {
    const features = [
        {
            icon: <FaHeadset className="text-blue-600 text-4xl mb-3" />,
            title: "24/7 Support",
            description: "Dedicated and friendly support anytime.",
        },
        {
            icon: <FaCreditCard className="text-green-600 text-4xl mb-3" />,
            title: "Secure Payment",
            description: "100% secure payment processing.",
        },
        {
            icon: <FaTruck className="text-red-600 text-4xl mb-3" />,
            title: "Free Delivery",
            description: "Free delivery on orders over $99.",
        },
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="block lg:flex items-center gap-6 bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:scale-[1.03] transition-transform duration-300"
                    >
                        {feature.icon}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{feature.title}</h3>
                            <p className="text-gray-600 text-base">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
