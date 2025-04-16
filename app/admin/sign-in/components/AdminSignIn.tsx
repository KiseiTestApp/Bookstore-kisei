"use client"

import {Box, Button, TextField, Typography} from "@mui/material";
import Image from "next/image";
import {useAuth} from "@/app/context/AuthProviderContext";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useSnackbar} from "@/app/context/SnackbarContext";

type FormValues = {
    email: string;
    password: string;
}

export default function AdminSignIn() {
    const {adminSignIn} = useAuth();
    const {showSnackbar} = useSnackbar();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
    const onSubmit = async (data: FormValues) => {
        try {
            await adminSignIn(data.email, data.password);
            showSnackbar('Đăng nhập thành công', 'success');
            setTimeout(() => {
                window.location.href = '/admin/dashboard';
            }, 500);
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log('Admin sign-in failed with error message: ', err.message);
            } else {
                console.error('An unknown error has occurred.', err);
            }
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
                    className="object-cover"
                    fill
                    loading='eager'
                />
            </div>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} className="w-full md:w-1/2 flex flex-col justify-center p-28">
                <Typography variant="h5" gutterBottom  >
                    Đăng nhập
                </Typography>
                <Box>
                    <TextField
                        {...register('email', {
                            required: 'Trường này không thể để trống'
                        })}
                        label="Đăng nhập bằng email"
                        type="email"
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...register("password", {
                            required: "Trường này không thể để trống",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                        label="Mật khẩu"
                        type="password"
                        fullWidth
                        margin="normal"
                    />
                    <div className="mt-4">
                        <Button variant="contained" className="w-full" type="submit">Đăng nhập</Button>
                    </div>
                </Box>
            </Box>
        </div>
    );
};