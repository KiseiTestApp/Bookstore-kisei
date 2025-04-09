//Chặn scroll dọc + ngang cho một số trang
"use client"

import {useEffect} from "react";

export default function usePreventScroll(active: boolean) {
    useEffect(() => {
        if (active) {
            document.body.classList.add("no-scroll");
            return () => {
                document.body.classList.remove("no-scroll");
            }
        }
    }, [active]);
}

