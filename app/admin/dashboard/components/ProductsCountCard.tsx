"use client"

import {pink} from '@mui/material/colors';
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import {CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import InventoryIcon from "@mui/icons-material/Inventory";
import React, {useEffect} from "react";
import {db} from '@/lib/firebase/config';
import {getCountFromServer, collection} from "@firebase/firestore";


export default function ProductsCountCard() {
    const pinkColorIcon = pink[500];
    const pinkColorBackground = pink[50];
    const [bookCount, setBookCount] = React.useState<number>(0);
    const [loading, setLoading] = React.useState(true);
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksCollection = collection(db, "books");
                const booksSnapshot = await getCountFromServer(booksCollection);
                const count = booksSnapshot.data().count
                setBookCount(count);
            } catch (error) {
                console.log("Error fetching books count", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBooks();
    }, []);

    return (
        <Card>
            <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                    {loading ? (
                        <>
                            <Skeleton variant="text" width={150} height={24} />
                            <Skeleton variant="text" width={50} height={32} />
                        </>
                    ) : bookCount === 0? (
                        <Typography variant="body1">
                            Không có sách trong cơ sở dữ liệu
                        </Typography>
                    ) : (
                        <>
                            <Typography variant="body1" color="textSecondary">
                                Tổng số sản phẩm
                            </Typography>
                            <Typography variant="h6" color="textPrimary">{bookCount}</Typography>
                        </>
                    )}
                </Box>
                {loading ? (
                    <Skeleton variant="circular" width={40} height={40} />
                ) : (
                    <Avatar sx={{ bgcolor: pinkColorBackground }}>
                        <InventoryIcon sx={{ color: pinkColorIcon }}  />
                    </Avatar>
                )}
            </CardContent>
        </Card>
    )
}