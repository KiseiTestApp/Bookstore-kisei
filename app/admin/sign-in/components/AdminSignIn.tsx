"use client"

import {Button, TextField, Typography} from "@mui/material";
import Image from "next/image";
import {useAuth} from "@/app/context/AuthProviderContext";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function AdminSignIn() {
    const {signIn} = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();
    const handleAdminLogin = async () => {
        try {
            await signIn(email, password, 'admin');
            router.replace("/admin/dashboard");
        } catch (err: any) {
            console.error("Admin login failed", err.message);
        }
    }

    useEffect(() => {
        document.body.classList.add("no-scroll");
        return () => {
            document.body.classList.remove("no-scroll");
        }
    }, []);

    return (
        <div className="flex h-screen w-full">
            <div className="hidden md:flex md:w-1/2 bg-gray-200 items-center relative justify-center">
                <Image
                    src="/books_wallpaper.jpg"
                    alt="Bookstore"
                    className="w-full h-full object-cover"
                    fill
                />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center p-28">
                <Typography variant="h5" gutterBottom  >
                    Đăng nhập
                </Typography>
                <form onSubmit={handleAdminLogin}>
                    <TextField
                        label="Đăng nhập bằng email"
                        type="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Mật khẩu"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        margin="normal"
                    />
                    <div className="mt-4">
                        <Button variant="contained" className="w-full" type="submit">Đăng nhập</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};