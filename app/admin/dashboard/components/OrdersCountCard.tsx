"use client"

import {indigo} from "@mui/material/colors";
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import {CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Icon from "@mdi/react"
import {mdiInvoiceList} from "@mdi/js";
import React, {useEffect} from "react";
import {db} from '@/lib/firebase/config';
import {getCountFromServer, collection} from "@firebase/firestore";
import Skeleton from "@mui/material/Skeleton";


export default function ProductsCountCard() {
    const indigoColorBackground = indigo[50];
    const indigoColorIcon = indigo[500];
    const [ordersCount, setOrdersCount] = React.useState<number>(0);
    const [loading, setLoading] = React.useState(true);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersRef = collection(db, "orders");
                const ordersSnapshot = await getCountFromServer(ordersRef);
                const count = ordersSnapshot.data().count;
                setOrdersCount(count);
            } catch (error) {
                console.log("Error fetching books count", error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
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
                    ) : ordersCount === 0? (
                        <Typography variant="body1">
                            Không có đơn hàng trên hệ thống
                        </Typography>
                    ) : (
                        <>
                            <Typography variant="body1" color="textSecondary">
                                Tổng số đơn hàng
                            </Typography>
                            <Typography variant="h6" color="textPrimary">{ordersCount}</Typography>
                        </>
                    )}
                </Box>
                {loading ? (
                    <Skeleton variant="circular" width={40} height={40} />
                ) : (
                    <Avatar sx={{ bgcolor:indigoColorBackground  }}>
                        <Icon path={mdiInvoiceList} color={indigoColorIcon} size={1} />
                    </Avatar>
                )}
            </CardContent>
        </Card>
    )
}