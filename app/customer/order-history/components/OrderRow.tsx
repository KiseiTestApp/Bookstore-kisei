import { TableRow, TableCell } from '@mui/material';
import {OrderDocument} from "@/app/types/order";
import { format } from 'date-fns';
import { OrderStatusChip } from './OrderStatusChip';

interface OrderRowProps {
    order: OrderDocument;
}

export const OrderRow = ({ order }: OrderRowProps) => (
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
            <OrderStatusChip status={order.status} />
        </TableCell>
    </TableRow>
);