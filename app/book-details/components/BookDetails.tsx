"use client";

import Icon from '@mdi/react';
import {mdiPackageCheck, mdiHandCoin, mdiTruckFast} from "@mdi/js";
import React from "react";

import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import {ClimbingBoxLoader} from "react-spinners";
import theme from "@/app/theme";
import Divider from "@mui/material/Divider";
import {Stack} from "@mui/system";
import {addtoCart} from "@/app/utils/cart/addtoCart";
import {useAuth} from "@/app/context/AuthProviderContext";
import QuantitySelector from "@/app/book-details/components/quantitySelector";
import {Button} from "@mui/material";
import {useSnackbar} from "@/app/context/SnackbarContext";
import Breadcrumb from "@/app/components/Breadcrumb";
import { Book } from '@/app/types/book';


export default function BookDetails({book} : {book: Book}) {
    
    const [quantity, setQuantity] = React.useState(1);
    const {user} = useAuth();
    const {showSnackbar} = useSnackbar();
    const discountedPrice = book?.discounted || 0;
    const normalPrice = book?.price || 0;

    const handleAddtoCart = async () => {
        if (book && user) {
            try {
                await addtoCart(user.uid, book.id, quantity);
                showSnackbar("Thêm sản phẩm vào giỏ thành công", "success");
            } catch (error) {
                console.log('Error adding item to cart: ', error);
                showSnackbar("Đã có lỗi đã xảy ra khi thêm hàng vào giỏ", "error")
            }
        } else {
            showSnackbar('Vui lòng đăng nhập trước khi sử dụng tính năng này', 'warning')
        }
    }

    return (
        <Box marginX={12} marginY={6} >
            <Box marginBottom={2}>
                <Breadcrumb lastLabel={book.title} />
            </Box>
            <Grid container spacing={2} className=" items-start">
                <Grid container size={4} className="bg-white rounded-md px-4 py-4 " sx={{ position: 'sticky', top: '0', height: 'fit-content' }}>
                    <Image
                        src={book.imageUrl || "No image found"}
                        alt={book.title}
                        width={600}
                        height={600}
                        priority={true}
                    />

                    <Box className="mt-2.5">
                        <Typography variant="body1" color="textPrimary" className="font-bold">An tâm mua sắm với những đặc quyền sau:</Typography>
                        <Box className="mt-1">
                            <Typography variant="body2" color="textSecondary" className="flex justify-start items-center gap-3 py-2">
                                <Icon path={mdiPackageCheck} size={1} /> Được mở hộp kiểm tra khi nhận hàng
                            </Typography>
                            <Divider />
                            <Typography variant="body2" color="textSecondary" className="flex justify-start items-center gap-3 py-2">
                                <Icon path={mdiHandCoin} size={1} /> Hoàn tiền 100% giá nếu sách bị hư hỏng
                            </Typography>
                            <Divider />
                            <Typography variant="body2" color="textSecondary" className="flex justify-start items-center gap-3 py-2">
                                <Icon path={mdiTruckFast} size={1} /> Thời gian giao nhanh và uy tín
                            </Typography>
                            <Divider />
                        </Box>
                    </Box>
                </Grid>
                <Grid size={5}>
                    <Stack spacing={2}>
                        <Box className="bg-white rounded-md px-4 py-4">
                            <Typography variant="h6" fontWeight={500}>{book.title}</Typography>
                            <Box className="flex flex-row items-center gap-3 my-2">
                                <Typography variant="h4" color={theme.palette.primary.main}>{discountedPrice.toLocaleString('vi-VN')}đ</Typography>
                                <span className="p-0.5 rounded-sm bg-emerald-500 text-gray-50 text-sm">
                                {Math.round((normalPrice/discountedPrice) * 100) - 100}%
                            </span>
                                <Typography variant="body1" color="textSecondary">{normalPrice.toLocaleString('vi-VN')}đ</Typography>
                            </Box>
                        </Box>
                        <Box className="bg-white rounded-md px-4 py-4">
                            <Typography variant="body1" color="textPrimary" fontWeight={600}>Thông tin chi tiết</Typography>
                            <Box className="flex flex-col mt-4 gap-2">
                                <Grid container spacing={6}>
                                    <Grid size={5}>
                                        <Typography variant="body2" color="textSecondary">Tác giả</Typography>
                                    </Grid>
                                    <Grid size={6}>
                                        <Typography variant="body2" color="textPrimary">{book.author}</Typography>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Grid container spacing={6}>
                                    <Grid size={5}>
                                        <Typography variant="body2" color="textSecondary">Nhà xuất bản</Typography>
                                    </Grid>
                                    <Grid size={6}>
                                        <Typography variant="body2" color="textPrimary">{book.publisher}</Typography>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Grid container spacing={6}>
                                    <Grid size={5}>
                                        <Typography variant="body2" color="textSecondary">Năm xuất bản</Typography>
                                    </Grid>
                                    <Grid size={6}>
                                        <Typography variant="body2" color="textPrimary">{book.publishYear}</Typography>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Grid container spacing={6}>
                                    <Grid size={5}>
                                        <Typography variant="body2" color="textSecondary">Thể loại</Typography>
                                    </Grid>
                                    <Grid size={6}>
                                        <Typography variant="body2" color="textPrimary">{book.genre}</Typography>
                                    </Grid>
                                </Grid>
                                <Divider />
                            </Box>
                        </Box>
                        <Box className="bg-white rounded-md px-4 py-4">
                            <Typography variant="body1" color="textPrimary" fontWeight={600}>Mô tả sản phẩm</Typography>
                            <Typography variant="body2" className="pt-4" fontSize={"medium"}>{book.description}</Typography>
                        </Box>
                    </Stack>
                </Grid>
                <Grid size={3} className="bg-white rounded-md px-2 py-4" sx={{ position: 'sticky', top: '0', height: 'fit-content' }}>
                    <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
                    <Box className="mt-3">
                        <Typography variant="h6" fontWeight={400}>Tạm tính</Typography>
                        <Typography variant="h5" fontWeight={600}>
                            {Math.round(quantity * discountedPrice).toLocaleString('vi-VN')}đ
                        </Typography>
                    </Box>
                    <Stack spacing={1.5} className="mt-4">
                        <Button variant="contained" color="primary" fullWidth>Mua ngay</Button>
                        <Button variant="outlined" color="primary" fullWidth onClick={handleAddtoCart}>
                            Thêm vào giỏ hàng
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}