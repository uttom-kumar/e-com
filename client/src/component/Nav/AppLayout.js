'use client'
import React from 'react';
import AppNavbar from "@/component/Nav/AppNavbar";
import NextTopLoader from "nextjs-toploader";

const AppLayout = ({children}) => {
    return (
        <div>
            <NextTopLoader
                color="#2299DD"
                height={3}
                showSpinner={false}
                zIndex={999999}
            />
           <div className={'fixed top-0 left-0 right-0 bg-white z-[99999]'}>
               <AppNavbar />
           </div>
            <div className={'relative top-10 md:top-15 left-0 right-0 py-6 px-6'}>
                {children}
            </div>
        </div>
    );
};

export default AppLayout;