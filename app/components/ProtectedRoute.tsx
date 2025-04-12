import {useAuth} from "@/app/context/AuthProviderContext";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";

export default function ProtectedRoute({children}: {children: React.ReactNode}) {
    const {role, loading} = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!loading && role !== "admin") {
            router.replace("/no-access");
        }
    }, [loading, role, router]);

    if (loading && role === "admin") {
        return null;
    }
    return <>{children}</>;
}