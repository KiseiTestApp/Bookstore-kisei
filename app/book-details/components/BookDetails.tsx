"use client";

import React from "react";

import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/system";
import {addtoCart} from "@/app/utils/cart/addtoCart";
import {useAuth} from "@/app/context/AuthProviderContext";
import {useSnackbar} from "@/app/context/SnackbarContext";
import Breadcrumb from "@/app/components/Breadcrumb";
import {Book} from '@/app/types/book';
import BookImage from "@/app/book-details/components/BookImage";
import BookPriceDisplay from "@/app/book-details/components/BookPriceDisplay";
import BookMetadata from "@/app/book-details/components/BookMetadata";
import PurchaseBox from "@/app/book-details/components/PurchaseBox";


export default function BookDetails({book}: { book: Book }) {

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
        } else if (!user) {
            showSnackbar('Vui lòng đăng nhập trước khi sử dụng tính năng này', 'warning')
        }
    }

    return (
        <Box marginX={12} marginY={6}>
            <Box marginBottom={2}>
                <Breadcrumb lastLabel={book.title || 'Không tìm thấy được sách'}/>
            </Box>
            <Grid container spacing={2} className=" items-start">
                <Grid container size={4} className="bg-white rounded-md px-4 py-4 "
                      sx={{position: 'sticky', top: '0', height: 'fit-content'}}>
                    <BookImage imageUrl={book.imageUrl || ''} title={book.title || ''}/>
                </Grid>
                <Grid size={5}>
                    <Stack spacing={2}>
                        <BookPriceDisplay title={book.title || ''} normalPrice={normalPrice}
                                          discountedPrice={discountedPrice}/>
                        <BookMetadata book={book}/>
                        <Box className="bg-white" padding={2} borderRadius='md'>
                            <Typography variant="body1" color="textPrimary" fontWeight={600}>Mô tả sản phẩm</Typography>
                            <Typography variant="body2" className="pt-4"
                                        fontSize={"medium"}>{book.description}</Typography>
                        </Box>
                    </Stack>
                </Grid>
                <Grid size={3} className="bg-white rounded-md px-2 py-4"
                      sx={{position: 'sticky', top: '0', height: 'fit-content'}}>
                    <PurchaseBox book={book} quantity={quantity} onQuantityChangeAction={setQuantity}
                                 onAddtoCartAction={handleAddtoCart}
                                 userId={user?.uid}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}