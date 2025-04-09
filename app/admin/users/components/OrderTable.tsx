import {
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    Paper,
    Chip
} from "@mui/material";
import {styled} from "@mui/material/styles";
import {format} from "date-fns";
import {fetchUserOrders} from "@/app/utils/orders/fetchAllOrders";
import {OrderDocument} from "@/app/types/order";
import {useEffect, useState} from "react";
import {getStatusColor, getStatusDisplay} from "@/app/utils/orders/orderDisplayMapping";

interface OrderTableProps {
    userId?: string;
    orders?: OrderDocument[];
}

export default function OrderTable({userId, orders: propOrders}: OrderTableProps) {
    const [orders, setOrders] = useState<OrderDocument[]>(propOrders || []);
    const [loading, setLoading] = useState(false);

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        backgroundColor: theme.palette.action.hover,
        borderColor: theme.palette.action.focus
    }))

    useEffect(() => {
        if (userId && !propOrders) {
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
    }, [userId, propOrders]);

    useEffect(() => {
        if (propOrders) {
            setOrders(propOrders);
        }
    }, [propOrders]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <StyledTableRow>
                        <TableCell>Mã đơn</TableCell>
                        <TableCell>Ngày đặt</TableCell>
                        <TableCell>Số lượng sảm phẩm</TableCell>
                        <TableCell>Tổng tiền thanh toán</TableCell>
                        <TableCell>Trạng thái đơn hàng</TableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={5} align="center">Đang tải...</TableCell>
                        </TableRow>
                    ) : orders.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} align="center">Không có đơn hàng</TableCell>
                        </TableRow>
                    ) : (
                        orders.map((order, index) => (
                            <TableRow key={order.orderId}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    {format(order.createdAt.toDate(), 'dd/MM/yyyy HH:mm')}
                                </TableCell>
                                <TableCell>
                                    {order.items.length}
                                </TableCell>
                                <TableCell>
                                    {order.totalPrice.toLocaleString('vi-VN')}đ
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={getStatusDisplay(order.status)}
                                        color={getStatusColor(order.status)}
                                        size="small"
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}