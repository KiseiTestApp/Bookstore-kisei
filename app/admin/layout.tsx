"use client"

import Sidebar from "./components/Sidebar";
import {usePathname} from "next/navigation";
import React from "react";

export default function Layout({ children } : {children: React.ReactNode}) {
    const pathname = usePathname();
    const isSignInPage = pathname === "/admin/sign-in";

    return (

            <main className="flex bg-gray-100">
                <aside className="sm:hidden lg:flex lg:visible">
                    {!isSignInPage && <Sidebar />}
                </aside>
                <section className="flex-1 bg-gray-100">
                    {children}
                </section>
            </main>
    );
}