import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
} from "@mui/material";
import {OrderDocument} from "@/app/types/order";
import {OrderRow} from "@/app/customer/order-history/components/OrderRow";

interface OrderTableProps {
    orders: OrderDocument[];
}

export const OrderTable = ({ orders }: OrderTableProps) => {
    if (orders.length === 0) {
        return <Typography variant="body1" color="textPrimary" marginTop={2}>Không có đơn hàng</Typography>
    }
    return (
        <TableContainer component={Paper} sx={{ marginTop: 2}}>
            <Table sx={{ minWidth: 650, maxWidth: 800 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Ngày đặt</TableCell>
                        <TableCell>Số lượng</TableCell>
                        <TableCell>Thanh toán</TableCell>
                        <TableCell>Trạng thái</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <OrderRow key={order.orderId} order={order} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}