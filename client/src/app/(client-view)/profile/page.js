'use client'
import React, {useEffect} from 'react';
import ProfilePage from "@/component/client/profile/Profile-page";
import {ReadCartRequest} from "@/component/Request-Api/CartRequest";
import {ReadWishRequest} from "@/component/Request-Api/WishRequest";
import {UserReadProfileRequest} from "@/component/Request-Api/UserProfileRequest";

const Page = () => {
    useEffect(() => {
        (async () => {
            await UserReadProfileRequest();
            await ReadCartRequest()
            await ReadWishRequest()
        })()
    }, []);
    return (
        <div>
            <ProfilePage />
        </div>
    );
};

export default Page;