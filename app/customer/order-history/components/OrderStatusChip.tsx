import { Chip } from '@mui/material';
import {OrderDocument} from "@/app/types/order";

interface OrderStatusChipProps {
    status: OrderDocument['status'];
}

const statusTextMap = {
    paid: 'Đã thanh toán',
    pending: 'Đang chờ thanh toán',
    cancelled: 'Đã bị hủy'
} as const;

export const OrderStatusChip = ({ status }: OrderStatusChipProps) => {
    const getColor = () => {
        switch (status) {
            case 'paid': return 'success';
            case 'cancelled': return 'error';
            default: return 'warning';
        }
    };

    return <Chip label={statusTextMap[status]} color={getColor()} size="small" />;
};