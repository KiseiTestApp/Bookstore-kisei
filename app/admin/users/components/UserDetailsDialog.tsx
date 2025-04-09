"use client"

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";
import {fetchUserOrders} from "@/app/utils/orders/fetchAllOrders";
import {OrderDocument} from "@/app/types/order";
import { useState, useEffect } from "react";
import OrderTable from "@/app/admin/users/components/OrderTable";

interface UserDetailsDialogProps {
    userId: string;
    open: boolean;
    onCloseAction: () => void;
}

export default function UserDetailsDialog({ userId, open, onCloseAction }: UserDetailsDialogProps) {
    const [orders, setOrders] = useState<OrderDocument[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && userId) {
            const loadUserOrders = async () => {
                setLoading(true);
                try {
                    const userOrders = await fetchUserOrders(userId);
                    setOrders(userOrders);
                } catch (error) {
                    console.error("Failed to load user orders", error);
                } finally {
                    setLoading(false);
                }
            };
            loadUserOrders();
        }
    }, [open, userId]);

    return (
        <Dialog open={open} onClose={onCloseAction} maxWidth="md" fullWidth>
            <DialogTitle>Chi tiết đơn hàng của người dùng</DialogTitle>
            <DialogContent>
                {loading ? (
                    <Typography>Đang tải...</Typography>
                ) : orders.length === 0 ? (
                    <Typography>Người dùng chưa có đơn hàng nào</Typography>
                ) : (
                    <OrderTable orders={orders} />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseAction}>Đóng</Button>
            </DialogActions>
        </Dialog>
    );
}