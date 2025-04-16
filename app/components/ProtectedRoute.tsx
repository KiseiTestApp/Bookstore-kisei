import { useAuth } from "@/app/context/AuthProviderContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, role, loading } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!loading) {

            if (!user) {
                router.replace("/admin/sign-in");
                return;
            } else if (role !== 'admin') {
                router.replace("/no-access");
                return;
            }
        }
    }, [user, loading, role, router]);


    return <>{children}</>;
}
