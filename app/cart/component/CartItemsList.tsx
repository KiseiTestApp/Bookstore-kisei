"use client"

import React from 'react'
import Image from 'next/image';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

import {CartItem} from "@/app/utils/cart/fetchCartItems";
import {deleteFromCart} from "@/app/utils/cart/deleteFromCart";
import {useAuth} from "@/app/context/AuthProviderContext";
import theme from "@/app/theme";
import QuantitySelector from "@/app/cart/component/QuantitySelector";

interface Props {
    items: CartItem[];
    onItemDelete: () => void;
}

const CartItemsList = ({items, onItemDelete = () => {}} : Props) => {
    const {user} = useAuth();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDeleteItem = async (bookId: string) => {
        if (!user) return;

        try {
            await deleteFromCart(user.uid, bookId);
            onItemDelete();
        } catch (error) {
            console.error('Failed to delete item from cart', error);
        }
    }

    const handleQuantityChanged = (newQuantity: number) => {
        console.log("Quantity changed", newQuantity);
    }

    return (
        <Box>
            {items.map((item) => (
                <Box
                    key={item.title}
                    className={`py-5 ${isMobile ? 'flex flex-col gap-4' : 'grid grid-cols-12'} justify-center`}
                >

                    <Box className={`flex flex-row ${isMobile ? 'w-full' : 'col-span-5'}`}>
                        <Image
                            src={item.imageUrl}
                            alt={item.title}
                            width={100}
                            height={100}
                            className="min-w-[100px]"
                        />
                        <Box className="flex flex-col justify-between ml-3">
                            <Typography variant="body2" color="textPrimary" style={{ wordWrap: 'break-word'}}>{item.title}</Typography>
                            {item.discounted > 0 ? (
                                <Box display="flex" flexDirection="row" gap={2} alignItems='center'>
                                    <Typography variant="body1" color={isMobile ? theme.palette.primary.dark : 'textPrimary'} sx={{ fontSize: '18px'}}>{item.discounted.toLocaleString('vi-VN')} VNĐ</Typography>
                                    <Typography variant="subtitle2" color="textSecondary" sx={{ textDecoration: 'line-through'}}>{item.price.toLocaleString('vi-VN')} VNĐ</Typography>
                                </Box>
                            ) : (
                                <Box>
                                    <Typography variant="body1" color={isMobile ? theme.palette.primary.dark : 'textPrimary'} sx={{ fontSize: '18px'}}>{item.price.toLocaleString('vi-VN')} VNĐ</Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>
                    <Box className={`${isMobile ? 'flex justify-between items-center' : 'col-span-7 grid grid-cols-7'} mt-2`}>
                        <Box className={isMobile ? 'flex items-center' : 'col-span-3 place-self-center'}>
                            <QuantitySelector bookId={item.bookId} onQuantityChange={handleQuantityChanged} />
                        </Box>
                        {!isMobile && (
                            <Box className="col-span-3 place-self-center">
                                <Typography variant="body1" color={theme.palette.primary.dark} fontWeight={500}>
                                    {Math.round((item.discounted || item.price) * item.quantity).toLocaleString('vi-VN')} VNĐ
                                </Typography>
                            </Box>
                        )}
                        <Box className={isMobile ? 'flex items-center' : 'col-span-1 place-self-center'}>
                            <Button onClick={() => handleDeleteItem(item.bookId)} variant="text" color="error">
                                Xóa
                            </Button>
                        </Box>
                    </Box>
                    {isMobile && <Box className="border-b border-gray-200 w-full mt-2"></Box>}
                </Box>
            ))}
        </Box>
    )
}

export default CartItemsList;