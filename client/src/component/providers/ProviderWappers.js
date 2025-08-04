'use client';

import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/store/store";
import AppLayout from "@/component/Nav/AppLayout";
import {Toaster} from "react-hot-toast";

export default function ProvidersWrapper({ children }) {
    return (
        <Provider store={store}>
            <Toaster position="top-center" toastOptions={{ style: { zIndex: 99999 } }}/>
            <AppLayout>
                {children}
            </AppLayout>
        </Provider>
    );
}
