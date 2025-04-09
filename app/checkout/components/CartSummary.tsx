"use client"

import {Alert, CircularProgress, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {useCart} from "@/app/hooks/useCart";
import Image from "next/image";
import Badge from "@mui/material/Badge";
import {Stack} from "@mui/system";

export default function CartSummary() {
    const {cartItems, totalPrice, isLoading} = useCart();
    if (isLoading) return <CircularProgress />;
    return (
        <Box className="rounded-sm" sx={{ paddingX: 4, paddingY: 2, backgroundColor: "white", position: "sticky", top: 0 }}>
            <Typography variant="h6" gutterBottom>Tóm tắt giỏ hàng</Typography>
            {cartItems.length === 0 ? (
                <Alert severity="warning">Giỏ hàng của bạn đang trống </Alert>
            ) : (
                <Box>
                    <Stack spacing={2} paddingY={2}>
                        {cartItems.map((item) => (
                            <Box key={item.bookId} className="flex flex-row w-full gap-4 items-center justify-between">
                                <Badge badgeContent={item.quantity} color="primary">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        width={100}
                                        height={100}
                                        className="border border-b-neutral-200"
                                    />
                                </Badge>
                                <Typography variant="subtitle1" fontSize="14px" className="flex-1">{item.title}</Typography>
                                <Typography variant="body1">{item.subtotal.toLocaleString('vi-VN')}đ</Typography>
                            </Box>
                        ))}
                    </Stack>
                    <Divider />
                    <Stack spacing={2} paddingY={2}>
                        <Box className="flex items-center justify-between">
                            <Typography variant="body2">Tạm tính</Typography>
                            <Typography variant="body2">{totalPrice.toLocaleString('vi-VN')}đ</Typography>
                        </Box>
                        <Box className="flex items-center justify-between">
                            <Typography variant="body2">Phí ship</Typography>
                            <Typography variant="body2">Sẽ thông báo sau</Typography>
                        </Box>
                    </Stack>
                    <Divider />
                    <Box className="flex items-center justify-between" paddingY={2}>
                        <Typography variant="h6">Tổng tiền</Typography>
                        <Typography variant="h5">{totalPrice.toLocaleString('vi-VN')}đ</Typography>
                    </Box>
                </Box>
            )}
        </Box>
    )
}