"use client"

import Sidebar from "@/app/admin/components/sidebar";
import {useAuth} from "@/app/context/AuthProviderContext";
import {useRouter, usePathname} from "next/navigation";
import React, {useEffect} from "react";
import Box from '@mui/material/Box';
import CircularProgress from "@mui/material/CircularProgress";
import {DialogProvider} from "@/app/context/DialogContext";


export default function Layout({ children } : {children: React.ReactNode}) {
    const pathname = usePathname();
    const router = useRouter();
    const {user, role, loading} = useAuth();
    const isSignInPage = pathname === "/admin/sign-in";
    const isNoAccessPage = pathname === "/auth/no-access-page";
    useEffect(() => {
        if (!loading) {
            if (!user && !isNoAccessPage && !isNoAccessPage) {
                router.push("/admin/sign-in");
            } else if (role !== "admin") {
                router.push("/auth/no-access")
            }
        }
    }, [user, role, loading, router, isNoAccessPage, isNoAccessPage]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" className="w-full h-screen">
                <CircularProgress color="primary" size={48} />
            </Box>
        )
    }

    return (
            <main className="flex bg-gray-100">
                <DialogProvider>
                    <aside className="sm:hidden lg:flex lg:visible">
                        {!isSignInPage && <Sidebar />}
                    </aside>
                    <section className="flex-1 bg-gray-100">{children}</section>
                </DialogProvider>
            </main>
    );
}