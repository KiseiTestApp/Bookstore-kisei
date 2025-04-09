"use client"

import React, { useState } from "react";
import {useAuth} from "@/app/context/AuthProviderContext";
import { Button, Link, TextField, Typography} from "@mui/material";
import {Box} from "@mui/system";
import { useRouter } from "next/navigation";
import {useSnackbar} from "@/app/context/SnackbarContext";

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
    })
    const {signUp, loading } = useAuth();
    const {showSnackbar} = useSnackbar();
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            await signUp(
                formData.email,
                formData.password,
                formData.username,
                formData.phoneNumber,
            );
            showSnackbar("Đăng ký thành công", "error", {vertical: "top", horizontal: "center"})
            setTimeout(() => router.push("/"), 2000);
        } catch (err) {
            showSnackbar(
                err instanceof Error ? err.message : "Đăng ký thất bại", "error"
            )
        }
    };


    return (
        <Box className="flex h-screen w-full">
            <Box className="hidden md:w-1/2 md:flex items-center">
                <img
                    src="/books_wallpaper.jpg"
                    alt="Book Wallapaper"
                    className="w-full h-full object-cover"
                />
            </Box>
            <Box className="w-full md:w-1/2 flex flex-col items-center justify-center p-28">
                <Typography variant="h5" gutterBottom fontWeight={500}>Đăng ký</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="username"
                        type="text"
                        placeholder="Họ tên"
                        value={formData.username}
                        variant="standard"
                        onChange={(e)=> setFormData({...formData, [e.target.name]: e.target.value})}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        variant="standard"
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        name="phoneNumber"
                        placeholder="Số điện thoại"
                        value={formData.phoneNumber}
                        variant="standard"
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        name="password"
                        type="password"
                        placeholder="Mật khẩu"
                        value={formData.password}
                        variant="standard"
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Box className="mt-6">
                        <Button
                            variant="contained"
                            fullWidth type="submit"
                            disabled={loading}
                        >
                            { loading ? "Đang xử lý..." : "Tạo tài khoản"}
                        </Button>
                        <Box className="py-4">
                            <Typography variant="body1" gutterBottom>
                                Bạn đã có tài khoản?
                                <Link href="/account/(auth)/sign-in">
                                    Đăng nhập
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}