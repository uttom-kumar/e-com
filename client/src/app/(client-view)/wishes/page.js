'use client';
import WishesList from "@/component/client/wishList/WishesList";
import {useEffect} from "react";
import {ReadWishRequest} from "@/component/Request-Api/WishRequest";

const Page = () => {
    useEffect(() => {
        (async () => {
            await ReadWishRequest()
        })()
    }, []);
    return <WishesList />;
};

export default Page;
