"use client"

import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {collection, query, where, getDocs} from "@firebase/firestore";
import {db} from '@/lib/firebase/config'
import BookCard from "@/app/components/BookCard";
import {Box, Typography, Paper, Divider} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useAuth} from "@/app/context/AuthProviderContext";
import {useSnackbar} from "@/app/context/SnackbarContext";
import {addtoCart} from "@/app/utils/cart/addtoCart";


export default function GenreCollection() {
    const params = useParams();
    const [books, setBooks] = useState<any[]>([]);
    const {user, loading} = useAuth();
    const {showSnackbar} = useSnackbar();
    const genre = decodeURIComponent(params.genre as string).replace(/-/g, " ");
    useEffect(() => {
        const fetchBooks = async () => {
            const booksQuery = query(collection(db, "books"), where("genre", "==", genre));
            const querySnapshot = await getDocs(booksQuery);
            const booksData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setBooks(booksData);
        };
        fetchBooks();
    }, [genre]);

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
        <Box padding={2} marginX={4} marginY={8} component={Paper} display="flex" flexDirection="column" sx={{ maxWidth: '100%', width: 'max-content' }}>
            <Typography variant="h6" gutterBottom>{decodeURIComponent(genre)}</Typography>
            <Divider />
            <Grid container spacing={2} marginTop={2} alignItems="flex-start" sx={{ width: "65rem" }}>
                {books.map((book) => (
                    <Grid key={book.id} size={{ sm: 12, md: 6, xl: 3}}>
                        <BookCard book={book} onAddtoCart={handleAddtoCart} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}