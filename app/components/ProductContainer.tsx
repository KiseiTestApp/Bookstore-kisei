"use client"

import React from "react";
import { Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import BookOutlined from "@mui/icons-material/BookOutlined";
import BookCard from "@/app/components/BookCard";
import {addtoCart} from "@/app/utils/cart/addtoCart";
import {useAuth} from "@/app/context/AuthProviderContext";
import {useSnackbar} from "@/app/context/SnackbarContext";
import Divider from "@mui/material/Divider";

interface Book {
    id: string;
    title: string;
    author: string;
    price: number;
    discounted: number;
    imageUrl: string;
}
interface BookProps {
    books: Book[];
}

const ProductContainer = ({ books } : BookProps) => {
    const {user, loading} = useAuth();
    const {showSnackbar} = useSnackbar();
    const handleAddtoCart = async (bookId: string, quantity: number) => {
        if (loading) {
            showSnackbar("Đang kiểm tra hệ thống", "info")
            return;
        }
        if (!user) {
            showSnackbar("Vui lòng đăng nhập trước để sử dụng tính năng này", "info")
            return;
        }
        try {
            await addtoCart(user.uid, bookId, quantity);
            showSnackbar("Thêm hàng vào giỏ thành công", "success")
        } catch (error) {
            console.error("Error adding item", error);
            showSnackbar("Đã có lỗi xảy ra khi thêm hàng vào giỏ", "error");
        }
    };
    return (

            <Box className="rounded-xl bg-white" gap={2}>
                <Box className="py-4 flex flex-row gap-3 p-4">
                    <BookOutlined fontSize="large" color="primary" />
                    <Typography variant="h5" color="textPrimary" fontWeight="500">
                        Gợi ý hôm nay
                    </Typography>
                </Box>
                <Divider />
                <Grid container className="grow" spacing={2} paddingY={2} paddingX={4}>
                    {books.map((book) => (
                        <Grid
                            key={book.id}
                            size={{xs: 12, md: 6, xl: 3}}
                            className="items-start"
                        >
                            <BookCard book={book} onAddtoCart={handleAddtoCart} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

    );
};
export default ProductContainer;