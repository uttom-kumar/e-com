'use client';

import CartPage from "@/component/client/Cart/cart-page";
import {useEffect} from "react";
import {ReadCartRequest} from "@/component/Request-Api/CartRequest";


const Page = () => {
    useEffect(() => {
        (async () => {
            await ReadCartRequest()
        })()
    }, []);
    return <CartPage />;
};

export default Page;
