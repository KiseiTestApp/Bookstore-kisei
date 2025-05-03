"use client"

import {Button, TextField, Typography, InputAdornment, IconButton} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {Link} from "@mui/material";
import { useRouter } from "next/navigation";
import {useAuth} from "@/app/context/AuthProviderContext";
import {useSnackbar} from "@/app/context/SnackbarContext";
import Image from "next/image";
import {signInSchema, SignInFormData} from "@/lib/validation/signInSchema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useState} from "react";


export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        mode: 'onBlur',
    });
    const {signIn, loading, error} = useAuth();
    const {showSnackbar} = useSnackbar();
    const router = useRouter();
    const onSubmit = async (data: SignInFormData) => {
        try {
            await signIn(data.email, data.password);
            showSnackbar('Đăng nhập thành công', 'success', {
                vertical: 'top', horizontal: 'center'
            })
            setTimeout(() => router.push('/'), 500);
        } catch (error) {
            console.log(error);
        }
    }
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    return (
        <div className="flex h-screen w-full">
            <div className="hidden relative md:flex md:w-1/2 bg-gray-200 items-center justify-center">
                <Image
                    src="/books_wallpaper.jpg"
                    alt="Bookstore"
                    className="w-full h-full object-cover"
                    fill={true}
                    loading='eager'
                />
            </div>


            <div className="w-full md:w-1/2 flex flex-col justify-center p-28">
                <Typography variant="h5" gutterBottom>
                    Đăng nhập
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register('email')}
                        label="Đăng nhập bằng email"
                        type="email"
                        fullWidth
                        variant="standard"
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        label="Mật khẩu"
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        variant="standard"
                        margin="normal"
                        required
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position='end' sx={{ marginRight: 2 }}>
                                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge={'end'}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        }}
                    />
                    <div className="mt-4">
                        <Button
                            variant="contained"
                            fullWidth type="submit"
                            disabled={loading}
                            loading={loading}
                            loadingPosition="start"
                        >
                            { loading ? "Đang xử lý..." : "Đăng nhập"}
                        </Button>
                    </div>
                </form>
                <div className="flex justify-between mt-6">
                    <Link href="/account/sign-up" underline="hover">
                        Đăng ký mới
                    </Link>
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
            </div>
        </div>
    );
};