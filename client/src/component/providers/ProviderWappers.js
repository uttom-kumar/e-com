'use client';

import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/store/store";
import AppLayout from "@/component/Nav/AppLayout";

export default function ProvidersWrapper({ children }) {
    return (
        <Provider store={store}>
            <AppLayout>
                {children}
            </AppLayout>
        </Provider>
    );
}
