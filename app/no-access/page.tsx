"use client"

import * as React from 'react';
import {Button, Typography} from "@mui/material";
import Image from "next/image";
import {useEffect} from "react";


export default function NoAccess() {
    useEffect(() => {
        document.body.classList.add("no-scroll");
        return () => {
            document.body.classList.remove("no-scroll");
        }
    }, []);

    return (
        <div className="flex h-screen w-full">
            <div className="md:flex md:bg-black brightness-50 h-full w-full items-center justify-center">
                <Image src='/matthew-henry-kX9lb7LUDWc-unsplash.jpg'
                     alt="random image"
                     className="w-full h-full object-cover"
                       fill={true}
                />
            </div>
            <div className='absolute inset-0 flex flex-col justify-center items-end px-64'>
                <div className="flex flex-col font-semibold bg-black p-10 text-start text-white text-wrap gap-2.5">
                    <Typography variant="h3" gutterBottom>Oops</Typography>
                    <Typography variant="h5" gutterBottom className="text-gray-200">Bạn không có quyền truy cập vào trang này</Typography>
                    <Button variant="contained" href="/" sx = {{ borderRadius: 28 }}>Trở về Trang chủ</Button>
                </div>
            </div>
        </div>
    );
}