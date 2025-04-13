"use client"

import Sidebar from "./components/Sidebar";
import {useAuth} from "@/app/context/AuthProviderContext";
import {usePathname} from "next/navigation";
import React from "react";
import Box from '@mui/material/Box';
import CircularProgress from "@mui/material/CircularProgress";
import ProtectedRoute from "@/app/components/ProtectedRoute";


export default function Layout({ children } : {children: React.ReactNode}) {
    const pathname = usePathname();
    const {loading} = useAuth();
    const isSignInPage = pathname === "/admin/sign-in/";


    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" className="w-full h-screen">
                <CircularProgress color="primary" size={48} />
            </Box>
        )
    }

    return (
            <main className="flex bg-gray-100">
                <ProtectedRoute>
                        <aside className="sm:hidden lg:flex lg:visible">
                            {!isSignInPage && <Sidebar />}
                        </aside>
                        <section className="flex-1 bg-gray-100">{children}</section>
                </ProtectedRoute>
            </main>
    );
}