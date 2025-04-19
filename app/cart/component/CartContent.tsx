"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthProviderContext";
import { CartDocument, fetchCartItems } from "@/app/utils/cart/fetchCartItems";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


import dynamic from "next/dynamic";
import CartItemsList from "@/app/cart/component/CartItemsList";
import { Stack } from "@mui/system";
import Grid from "@mui/material/Grid2";
import {MoonLoader} from "react-spinners";
import theme from "@/app/theme";
import {useRouter} from "next/navigation";

const LottieAnimation = dynamic(() => import("@/app/components/lottieAnimation"), {
    ssr: false,
});

export default function CartContent() {
    const [cartData, setCartData] = useState<CartDocument>({ items: [], total: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { user } = useAuth();

    const fetchCartData = async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            const unsubscribe = fetchCartItems(user.uid, data => {
                if (data) {
                    setCartData(data);
                }
                setIsLoading(false);
            });
            return () => unsubscribe();
        } catch (error) {
            console.error("Failed to fetch cart items", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchCartData();
    },[user]);

    if (!user) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" padding={4} bgcolor="white">
                <Typography variant="h6" color="textPrimary" marginBottom={2} textAlign="center">
                    Vui lòng đăng nhập để sử dụng giỏ hàng
                </Typography>
                <Button variant="contained" color="primary" onClick={() => router.push("/account/sign-in")}>
                    Đăng nhập
                </Button>
            </Box>
        )
    }

    return (
        <Grid container spacing={2}>
            <Grid size={!isLoading && cartData.items.length > 0 ? 9 : 12}>
                {isLoading ? (
                    <Box className="bg-white flex items-center py-4 justify-center rounded-sm" flexDirection="column">
                        <MoonLoader color={theme.palette.primary.main} />
                    </Box>
                ) : cartData.items.length === 0 ? (
                    <Box className="bg-white flex items-center py-4 justify-center rounded-sm" flexDirection="column">
                        <LottieAnimation />
                        <Typography variant="h6" color="textPrimary">
                            Chưa có sản phẩm nào trong giỏ hàng
                        </Typography>
                    </Box>
                ) : (
                    <Stack spacing={2}>
                        <Box className="bg-white p-6 rounded-sm grid grid-cols-12">
                            <div className="col-span-5">Sản phẩm</div>
                            <div className="col-span-3 place-self-center">Số lượng</div>
                            <div className="col-span-3 place-self-center">Thành tiền</div>
                        </Box>
                        <Box className="bg-white px-6 rounded-sm">
                            <CartItemsList items={cartData.items} onItemDelete={fetchCartData} />
                        </Box>
                    </Stack>
                )}
            </Grid>
            {!isLoading && cartData.items.length > 0 && (
                <Grid size={3}>
                    <Box className="bg-white p-4 rounded-sm">
                        <Box className="flex flex-row justify-between" sx={{ pb: 1}}>
                            <Typography variant="body2" color="textSecondary">Tổng tiền hàng</Typography>
                            <Typography variant="body1" color="textPrimary">
                                {cartData.total.toLocaleString('vi-VN')} VNĐ
                            </Typography>
                        </Box>
                        <Divider />
                        <Box className="flex flex-row justify-between items-center" sx={{ py: 1}}>
                            <Typography variant="body1" color="textSecondary">Tổng thanh toán</Typography>
                            <Typography variant="h6" color={theme.palette.primary.dark}>
                                {cartData.total.toLocaleString('vi-VN')} VNĐ
                            </Typography>
                        </Box>
                        <Button variant="contained" color="primary" fullWidth onClick={() => router.push("/checkout")}>
                            Đặt hàng
                        </Button>
                    </Box>
                </Grid>
            )}
        </Grid>
    );
}