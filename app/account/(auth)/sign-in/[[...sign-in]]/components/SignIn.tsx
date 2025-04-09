"use client"

import {Button, TextField, Typography} from "@mui/material";
import {Link} from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {useAuth} from "@/app/context/AuthProviderContext";
import {useSnackbar} from "@/app/context/SnackbarContext";
import Image from "next/image";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const {signIn, loading, error} = useAuth();
    const {showSnackbar} = useSnackbar();
    const router = useRouter();

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            await signIn(email, password);
            showSnackbar("Đăng nhập thành công", "success", {vertical: "top", horizontal: "center"});
            setTimeout(() => router.push("/"), 2000);
        } catch (err) {
            showSnackbar(
                err instanceof Error ? err.message : "Đăng nhập thất bại", "error"
            );
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex h-screen w-full">
            <div className="hidden relative md:flex md:w-1/2 bg-gray-200 items-center justify-center">
                <Image
                    src="/books_wallpaper.jpg"
                    alt="Bookstore"
                    className="w-full h-full object-cover"
                    fill={true}
                />
            </div>


            <div className="w-full md:w-1/2 flex flex-col justify-center p-28">
                <Typography variant="h5" gutterBottom>
                    Đăng nhập
                </Typography>
                <form onSubmit={handleSignIn}>
                    <TextField
                        label="Đăng nhập bằng email"
                        type="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        fullWidth
                        variant="standard"
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Mật khẩu"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        margin="normal"
                        required
                    />
                    <div className="mt-4">
                        <Button
                            variant="contained"
                            fullWidth type="submit"
                            disabled={loading || isProcessing}
                            loading={loading}
                            loadingPosition="start"
                        >
                            { loading ? "Đang xử lý..." : "Đăng nhập"}
                        </Button>
                    </div>
                </form>
                <div className="flex justify-between mt-6">
                    <Link underline="hover" color="textPrimary">
                        Quên mật khẩu?
                    </Link>
                    <Link href="/account/(auth)/sign-up" underline="hover">
                        Đăng ký mới
                    </Link>
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
            </div>
        </div>
    );
};