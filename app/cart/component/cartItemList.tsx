"use client"

import React from 'react'
import Image from 'next/image';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


import {CartItem} from "@/app/utils/cart/fetchCartItems";
import {deleteFromCart} from "@/app/utils/cart/deleteFromCart";
import {useAuth} from "@/app/context/AuthProviderContext";
import theme from "@/app/theme";
import SmallQuantitySelector from "@/app/cart/component/smallQuantitySelector";

interface Props {
    items: CartItem[];
    onItemDelete: () => void;
}

const CartItemList = ({items, onItemDelete = () => {}} : Props) => {

    const {user} = useAuth();

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
                <Box key={item.title} className="py-5 grid grid-cols-12 justify-center">
                    <Box className="flex flex-row col-span-5">
                        <Image
                            src={item.imageUrl}
                            alt={item.title}
                            width={100}
                            height={100}
                        />
                        <Box className="flex flex-col justify-between">
                            <Typography variant="body2" color="textPrimary" style={{ wordWrap: 'break-word'}}>{item.title}</Typography>
                            <Box className="flex flex-row gap-3 items-center">
                                <Typography variant="body1" color="textPrimary" sx={{ fontSize: '18px'}}>{item.discounted.toLocaleString('vi-VN')} VNĐ</Typography>
                                <Typography variant="subtitle2" color="textSecondary" sx={{ textDecoration: 'line-through'}}>{item.price.toLocaleString('vi-VN')} VNĐ</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="col-span-3 place-self-center">
                        <SmallQuantitySelector bookId={item.bookId} onQuantityChange={handleQuantityChanged} />
                    </Box>
                    <Box className="col-span-3 place-self-center">
                        <Typography variant="h6" color={theme.palette.primary.dark}>{Math.round(item.discounted * item.quantity).toLocaleString('vi-VN')} VNĐ</Typography>
                    </Box>
                    <Box className="col-span-1 place-self-center">
                        <Button onClick={() => handleDeleteItem(item.bookId)} variant="text" color="error" className="items-center">Xóa</Button>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default CartItemList;