'use client';

import React, { useEffect } from 'react';
import { isUserLoggedIn } from "@/component/Utility/Helper";
import { useRouter } from "next/navigation";
import OrderList from "@/component/client/Order/Order-List";

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

    return <OrderList />;
};

export default Page;
