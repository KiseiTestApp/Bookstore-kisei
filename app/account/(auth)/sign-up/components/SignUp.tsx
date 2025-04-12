"use client"

import {useAuth} from "@/app/context/AuthProviderContext";
import { Button, Link, TextField, Typography} from "@mui/material";
import {Box} from "@mui/system";
import { useRouter } from "next/navigation";
import {useSnackbar} from "@/app/context/SnackbarContext";
import Image from "next/image";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signUpSchema} from "@/lib/validation/signUpSchema";
import {z} from "zod";

type SignUpFormData = z.infer<typeof signUpSchema>

export default function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        mode: 'onBlur',
    });
    const {signUp, loading} = useAuth();
    const {showSnackbar} = useSnackbar();
    const router = useRouter();
    const onSubmit = async (data: SignUpFormData) => {
        try {
            await signUp(data.email, data.password, data.username, data.phoneNumber);
            showSnackbar('Đăng ký thành công', 'success', {vertical: 'top', horizontal: 'center'});
            setTimeout(() => router.push('/'), 2500);
        } catch (error) {
            showSnackbar(error instanceof Error ? error.message : 'Đăng ký thất bại', 'error')
        }
    };


    return (
        <Box className="flex h-screen w-full">
            <Box className="hidden relative md:w-1/2 md:flex items-center">
                <Image
                    src="/books_wallpaper.jpg"
                    alt="Book Wallapaper"
                    className="w-full h-full object-cover"
                    fill={true}
                />
            </Box>
            <Box className="w-full md:w-1/2 flex flex-col items-center justify-center p-28">
                <Typography variant="h5" gutterBottom fontWeight={500}>Đăng ký</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register('username')}
                        name="username"
                        type="text"
                        placeholder="Họ tên"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField
                        {...register('email')}
                        name="email"
                        type="email"
                        placeholder="Email"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        {...register('phoneNumber')}
                        name="phoneNumber"
                        placeholder="Số điện thoại"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                    />
                    <TextField
                        {...register('password')}
                        name="password"
                        type="password"
                        placeholder="Mật khẩu"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Box className="mt-6">
                        <Button
                            variant="contained"
                            fullWidth type="submit"
                            disabled={loading}
                        >
                            { loading ? "Đang xử lý..." : "Tạo tài khoản"}
                        </Button>
                        <Box className="py-4 gap-2 flex items-start">
                            <Typography variant="body1" gutterBottom>
                                Bạn đã có tài khoản?
                            </Typography>
                            <Link href="/account/sign-in" underline="hover">
                                Đăng nhập
                            </Link>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}