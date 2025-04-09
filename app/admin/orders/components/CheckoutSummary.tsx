import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableContainer,
    TableCell,
    Paper,
    Typography,
    Avatar,
    Box,
} from '@mui/material';
import {OrderDocument} from "@/app/types/order";
import {Icon} from "@mdi/react";
import {mdiCartOutline} from "@mdi/js";
import {styled} from "@mui/material/styles";
import theme from "@/app/theme";

interface OrderItems {
    orderItems: OrderDocument;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.action.focus
}))

export default function CheckoutSummary({orderItems}: OrderItems) {
    return (
        <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
                <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
                    <Icon path={mdiCartOutline} size={1} />
                </Avatar>
                <Typography variant="h6">Tổng quan đơn hàng</Typography>
            </Box>
            <TableContainer sx={{ p: 2 }}>
                <Table sx={{ borderWidth: 0.5, borderColor: theme.palette.action.focus, borderRadius: 4 }} >
                    <TableHead>
                        <StyledTableRow>
                            <TableCell rowSpan={2}>Tên sản phẩm</TableCell>
                            <TableCell>Số lượng</TableCell>
                            <TableCell>Đơn giá</TableCell>
                            <TableCell>Tạm tính</TableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {orderItems.items.map((item, index) => (
                            <TableRow key={`${item.bookId}-${index}`}>
                                <TableCell align="right">
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Avatar variant="square" sx={{ width: 56, height: 56}} src={item.imageUrl} />
                                        <Typography variant="body1">{item.title}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.discounted.toLocaleString('vi-VN')}</TableCell>
                                <TableCell>{item.subtotal.toLocaleString('vi-VN')}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={2}>Tạm tính</TableCell>
                            <TableCell align="right">{orderItems.totalPrice.toLocaleString('vi-VN')}đ</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Phí vận chuyển</TableCell>
                            <TableCell align="right">0đ</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Giảm giá</TableCell>
                            <TableCell align="right">0đ</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={2}>Tổng cộng</TableCell>
                            <TableCell align="right">
                                <Typography variant="h6" fontWeight={500}>{orderItems.totalPrice.toLocaleString('vi-VN')}đ</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}