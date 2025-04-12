import {TableRow, TableCell, Button} from '@mui/material';
import {OrderDocument} from "@/app/types/order";
import { format } from 'date-fns';
import { OrderStatusChip } from './OrderStatusChip';
import {OrderDetails} from './OrderDetails';
import {useDialog} from "@/app/context/DialogContext";

interface OrderRowProps {
    order: OrderDocument;
}

export const OrderRow = ({ order }: OrderRowProps) => {
    const {confirmDialog} = useDialog();
    const handleViewDetails = () => {
        confirmDialog({
            title: 'Chi tiết đơn',
            content: <OrderDetails order={order} />,
            confirmText: 'Đóng',
            showCancelButton: false,
            showConfirmButton: true,
        })
    }
    return (
        <TableRow>
            <TableCell>
                {/* Ngày/tháng/năm*/}
                {order.createdAt ? format(order.createdAt.toDate(), 'dd/M/yyyy') : 'N/A'}
            </TableCell>
            <TableCell>
                {/*Số lượng sản phẩm trong đơn*/}
                x{order.items.length}
            </TableCell>
            <TableCell>{order.totalPrice.toLocaleString('vi-VN')} VNĐ</TableCell>
            <TableCell>
                {/*Hiển thị trạng thái đơn hàng*/}
                <OrderStatusChip status={order.status}/>
            </TableCell>
            <TableCell>
                {/*Hiển thị chi tiết đơn hàng*/}
                <Button variant='text' size='small' onClick={() => handleViewDetails()}>
                    Xem chi tiết
                </Button>
            </TableCell>
        </TableRow>
    )
};