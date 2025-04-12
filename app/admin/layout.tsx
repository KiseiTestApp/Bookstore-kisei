"use client"

import Sidebar from "@/app/admin/components/sidebar";
import {useAuth} from "@/app/context/AuthProviderContext";
import {useRouter, usePathname} from "next/navigation";
import React, {useEffect} from "react";
import Box from '@mui/material/Box';
import CircularProgress from "@mui/material/CircularProgress";
import {DialogProvider} from "@/app/context/DialogContext";
import ProtectedRoute from "@/app/components/ProtectedRoute";


export default function Layout({ children } : {children: React.ReactNode}) {
    const pathname = usePathname();
    const router = useRouter();
    const {user, role, loading} = useAuth();
    const isSignInPage = pathname === "/admin/sign-in/";
    const isNoAccessPage = pathname === "/no-access/";
    useEffect(() => {
        if (!loading) {
            if (!user && !isSignInPage && !isNoAccessPage) {
                router.push("/admin/sign-in");
            } else if (user && role !== "admin" && !isNoAccessPage) {
                router.push("/auth/no-access")
            }
        }
    }, [user, role, loading, router, isSignInPage, isNoAccessPage]);

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
                    <DialogProvider>
                        <aside className="sm:hidden lg:flex lg:visible">
                            {!isSignInPage && <Sidebar />}
                        </aside>
                        <section className="flex-1 bg-gray-100">{children}</section>
                    </DialogProvider>
                </ProtectedRoute>
            </main>
    );
}