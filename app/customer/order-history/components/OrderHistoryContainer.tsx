"use client"

import { useState, useEffect } from 'react';

import {Box, Typography} from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import {fetchUserOrders} from "@/app/utils/orders/fetchAllOrders";
import {OrderDocument} from "@/app/types/order";
import { OrderStatusTabs } from './OrderStatusTabs';
import { OrderTable } from './OrderTable';
import {useAuth} from "@/app/context/AuthProviderContext";

export const OrderHistoryContainer = () => {
    const {user} = useAuth();
    const [activeTab, setActiveTab] = useState(0);
    const [orders, setOrders] = useState<OrderDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Kiểm tra xem có người dùng trong hệ thống không
    useEffect(() => {
        const loadOrders = async () => {
            try {
                setLoading(true);
                if (!user) return;
                const userOrders = await fetchUserOrders(user.uid);
                setOrders(userOrders);
            } catch (err) {
                setError('Failed to load order history');
            } finally {
                setLoading(false);
            }
        };
        if (user) {
            loadOrders();
        }
    }, [user]);

    // Lọc các đơn của người dùng ứng với các trạng thái tương ứng
    const filteredOrders = (status?: OrderDocument['status']) =>
        status ? orders.filter(order => order.status === status) : orders;

    if (loading) {
        return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <CircularProgress size={24} color="secondary" />
            </Box>
        )
    }

    if (error) {
        return (
           <Box>
               <Typography variant="body1" color="error">
                   {error}
               </Typography>
               <Button variant="contained" onClick={() => window.location.reload()}>
                   Thử lại
               </Button>
           </Box>
        )
    }

    // Container cho lịch sử đơn hàng
    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h4" gutterBottom>Lịch sử đơn hàng</Typography>
            <OrderStatusTabs value={activeTab} onChangeAction={(_, v) => setActiveTab(v)} />
            {activeTab === 0 && <OrderTable orders={filteredOrders()} />}
            {activeTab === 1 && <OrderTable orders={filteredOrders('pending')} />}
            {activeTab === 2 && <OrderTable orders={filteredOrders('paid')} />}
            {activeTab === 3 && <OrderTable orders={filteredOrders('cancelled')} />}
        </Box>
    );
};