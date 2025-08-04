'use client';

import React, { useEffect } from 'react';
import { isUserLoggedIn } from "@/component/Utility/Helper";
import { useRouter } from "next/navigation";
import WishesList from "@/component/client/wishList/WishesList";

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

    return <WishesList />;
};

export default Page;
