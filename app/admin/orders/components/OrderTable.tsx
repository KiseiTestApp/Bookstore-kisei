"use client"

import {
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { Box, Typography, Avatar, Paper } from "@mui/material";
import { fetchAllOrders } from "@/app/utils/orders/fetchAllOrders";
import { useEffect, useState } from 'react';
import {Timestamp} from "firebase/firestore";
import {OrderDocument} from "@/app/types/order";
import {nameToColor, getLastName} from "@/app/utils/dashboard/changeAvatarColor";

export default function OrderTable() {
    const [orders, setOrders] = useState<OrderDocument[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const fetchedOrders = await fetchAllOrders();
                setOrders(fetchedOrders);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'warning';
            case 'paid':
                return 'success';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    const statusDisplayLanguageMap = {
        pending: {
            label: 'Chờ xác nhận',
        },
        paid: {
            label: 'Đã thanh toán',
        },
        cancelled: {
            label: "Đã hủy",
        }
    };

    const formatDate = (date: Date | Timestamp | string) => {
        let dateObj: Date;
        if (date instanceof Date) {
            dateObj = date;
        } else if (date instanceof Timestamp) {
            dateObj = date.toDate();
        } else {
            dateObj = new Date(date);
        }
        return dateObj.toLocaleDateString('vi-VN');
    };

    if (loading) {
        return <Typography>Đang tải...</Typography>;
    }

    if (orders.length === 0) {
        return <Typography>Không có đơn hàng nào</Typography>;
    }

    return (
        <Box>
            <TableContainer component={Paper}>
                <Typography variant="h6" padding={2}>Đơn hàng gần đây</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Mã đơn</TableCell>
                            <TableCell>Khách hàng</TableCell>
                            <TableCell>Ngày đặt</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Tổng tiền</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order, index) => (
                            <TableRow key={order.orderId}>
                                <TableCell>
                                    <Typography variant="body2">#{index + 1}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Avatar sx={{ bgcolor: nameToColor(order.customer.customer_name) }}>
                                            {getLastName(order.customer.customer_name)}
                                        </Avatar>
                                        <Typography variant="body2">{order.customer.customer_name}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>{formatDate(order.createdAt)}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={statusDisplayLanguageMap[order.status]?.label || order.status}
                                        color={getStatusColor(order.status)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{order.totalPrice.toLocaleString('vi-VN')}đ</TableCell>
                                <TableCell>
                                    <Button color="primary" href={`/admin/orders/order-details/${order.orderId}`}>
                                        Xem chi tiết
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}