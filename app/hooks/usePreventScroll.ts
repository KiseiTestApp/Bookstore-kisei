//Chặn scroll dọc + ngang cho một số trang
"use client"

import {useEffect} from "react";

export function usePreventScroll() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
}

