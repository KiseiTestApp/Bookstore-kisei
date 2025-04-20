"use client"

import React from "react";
import Image from "next/image";
import {IconButton, Link, Tooltip, Typography} from "@mui/material";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import Visibility from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {Book} from '@/app/types/book';
import theme from "@/app/theme";
import {grey, teal} from "@mui/material/colors";

interface BookCardProps {
    book: Book;
    onAddToCart: (bookId: string, quantity: number) => void;
}

const BookCard = ({book, onAddToCart}: BookCardProps) => {
    const [isAdding, setIsAdding] = React.useState(false);
    const handleAddToCartClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsAdding(true);
        try {
            onAddToCart(book.id, 1);
        } finally {
            setIsAdding(false);
        }
    }
    const [isHovered, setHovered] = React.useState(false);
    const discountPercent = Math.round((1 - book.discounted/book.price) * 100)
    return (
        <Link href={`/book-details/${book.id}`} underline='none'>
            <Box className="px-4 pb-6 border border-neutral-100 rounded-xs hover:shadow-md cursor-pointer"
                 onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                <Box className="relative transition-all duration-300 items-center justify-center">
                    <Image
                        src={book.imageUrl || 'Unknown'}
                        alt={book.title || 'Book title'}
                        width={300}
                        height={300}
                        className={`transition-all duration-300 items-center justify-center ${isHovered ? "brightness-70" : "brightness-100"}`}
                    />
                    <div className={`absolute inset-0 flex items-center justify-center gap-4 
                    transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                        <Tooltip title="Thêm vào giỏ">
                            <IconButton color="neutral" onClick={handleAddToCartClick}
                                        className="transform transition-transform hover:scale-105"
                                        sx={{
                                            backgroundColor: '#f0f0f0',
                                            ":hover": {
                                                backgroundColor: '#f0f0f0',
                                            }
                                        }}>
                                {isAdding ? <CircularProgress size={24}/> : <ShoppingCartOutlined/>}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Xem chi tiết">
                            <IconButton color="neutral" className="transform transition-transform hover:scale-105"
                                        sx={{
                                            backgroundColor: '#f0f0f0',
                                            ":hover": {
                                                backgroundColor: '#f0f0f0',
                                            }
                                        }}
                            >
                                <Visibility/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </Box>
                <Box className="py-6">
                    <Box>
                        <Typography variant="body2" color="textSecondary">
                            {book.author}
                        </Typography>
                        <Tooltip title={book.title} placement="top">
                            <Typography
                                variant="body1"
                                className="sm:line-clamp-none md:line-clamp-1"
                                color={theme.palette.primary.dark}
                                sx={{
                                    fontWeight: 'medium',
                                }}
                            >
                                {book.title}
                            </Typography>
                        </Tooltip>
                    </Box>
                    <Box className="mt-3">
                        {book.discounted > 0 ? (
                            <>
                                <Typography variant="h6" color='textPrimary' fontWeight={500} alignItems='center' display='flex' gap={2}>
                                    {book.discounted.toLocaleString('vi-VN')} VND
                                    <Typography variant='body1' color={grey[200]} bgcolor={teal[700]} padding={0.3} borderRadius='15%' >
                                        -{discountPercent}%
                                    </Typography>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{textDecoration: 'line-through'}}>
                                    {book.price.toLocaleString('vi-VN')} VND
                                </Typography>
                            </>
                        ) : (
                            <Typography variant="h6" color='textPrimary' fontWeight={500}>
                                {book.price.toLocaleString('vi-VN')} VND
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </Link>
    )
}
export default BookCard;