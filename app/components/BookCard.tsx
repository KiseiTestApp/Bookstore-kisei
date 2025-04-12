"use client"

import React from "react";
import Image from "next/image";
import {IconButton, Tooltip, Typography} from "@mui/material";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import Visibility from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import {useRouter} from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

interface Book {
    id: string;
    title: string;
    author: string;
    price: number;
    discounted: number;
    imageUrl: string;
}
interface BookCardProps {
    book: Book;
    onAddtoCart: (bookId: string, quantity: number) => void;
}
const BookCard = ({ book, onAddtoCart }: BookCardProps) => {
    const [isAdding, setIsAdding] = React.useState(false);
    const [isNavigating, setIsNavigating] = React.useState(false);
    const handleAddtoCartClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsAdding(true);
        try {
            onAddtoCart(book.id, 1);
        } finally {
            setIsAdding(false);
        }
    }
    const handleViewDetailClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsNavigating(true);
        window.open(`/book-details/${book.id}`, "_blank");
        setTimeout(() => setIsNavigating(false), 500);
    }
    const [isHovered, setHovered] = React.useState(false);
    return (
        <Box
            className="px-4 pb-6 border border-neutral-100 rounded-xs hover:shadow-md cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Box className="relative transition-all duration-300 items-center justify-center">
                <Image
                    src={book.imageUrl}
                    alt={book.title}
                    width={300}
                    height={300}
                    className={`transition-all duration-300 items-center justify-center ${isHovered ? "brightness-70" : "brightness-100"}`}
                />
                <div className={`absolute inset-0 flex items-center justify-center gap-4 
                    transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                    <Tooltip title="Thêm vào giỏ">
                        <IconButton color="neutral" onClick={handleAddtoCartClick} className="transform transition-transform hover:scale-105"
                                    sx={{
                                        backgroundColor:'#f0f0f0',
                                        ":hover": {
                                            backgroundColor:'#f0f0f0',
                                        }
                                    }}>
                            {isAdding ? <CircularProgress size={24} /> : <ShoppingCartOutlined />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xem chi tiết">
                        <IconButton color="neutral" className="transform transition-transform hover:scale-105"
                                    sx={{
                                        backgroundColor:'#f0f0f0',
                                        ":hover": {
                                            backgroundColor:'#f0f0f0',
                                        }
                                    }}
                                    onClick={handleViewDetailClick}
                        >
                            {isNavigating ? <CircularProgress size={24} /> : <Visibility />}
                        </IconButton>
                    </Tooltip>
                </div>
            </Box>
            <Box className="py-6">
                <Box>
                    <Typography variant="body1" color="textSecondary">
                        {book.author}
                    </Typography>
                    <Tooltip title={book.title} placement="top">
                        <Typography
                            variant="h6"
                            component="a"
                            className="sm:line-clamp-none md:line-clamp-1"
                            href={`/book-details/${book.id}`}
                            aria-label={book.title}
                            sx={{
                                fontWeight: "medium",
                                fontSize: "large",
                            }}
                        >
                            {book.title}
                        </Typography>
                    </Tooltip>
                </Box>
                <Box className="mt-3">
                    <Typography variant="body1" fontSize="1.2rem" >
                        {book.discounted.toLocaleString('vi-VN')} VND
                        <span className="mx-3 p-1 rounded-sm bg-emerald-500 text-gray-50 text-sm">
                            {Math.round((book.price/book.discounted) * 100) - 100}%
                        </span>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{textDecoration: 'line-through'}}>
                        {book.price.toLocaleString('vi-VN')} VND
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
export default BookCard;