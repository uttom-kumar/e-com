'use client';

import React, { useEffect } from 'react';
import CartPage from "@/component/client/Cart/cart-page";
import { isUserLoggedIn } from "@/component/Utility/Helper";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const token = isUserLoggedIn();

    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, [token, router]);

    if (!token) {
        return null; // Don't render anything while redirecting
    }

    return <CartPage />;
};

export default Page;
