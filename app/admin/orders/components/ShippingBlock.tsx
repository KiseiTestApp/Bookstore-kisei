import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Box,
    Chip,
} from "@mui/material";
import Icon from "@mdi/react"
import {mdiPackageVariantClosed} from "@mdi/js";
import {OrderDocument} from "@/app/types/order";
import {Timestamp} from "firebase/firestore";
import {format} from "date-fns";
import {
    PaymentMethod,
    OrderStatus,
    paymentMethodMap,
    ShippingMethod,
    shippingMethodMap, orderStatusMap
} from "@/app/utils/orders/orderDisplayMapping";
import theme from "@/app/theme";

interface OrderInformationProps {
    order: OrderDocument;
    paymentMethod: PaymentMethod;
    shippingMethod: ShippingMethod;
    status: OrderStatus;
}
export default function ShippingBlock({order}: OrderInformationProps) {
    const formatDate = (timestamp: Timestamp) => {
        return format(timestamp.toDate(), 'dd/MM/yyyy HH:mm');
    };
    return (
        <Card sx={{ p: 2, borderRadius: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
                    <Icon path={mdiPackageVariantClosed} size={1} />
                </Avatar>
                <Typography variant="h6">Thông tin giao hàng</Typography>
            </Box>
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body2" color="textSecondary">Trạng thái đơn hàng</Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={orderStatusMap[order.status].display}
                                    color={orderStatusMap[order.status].color}
                                    size="small"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body2" color="textSecondary">Ngày đặt</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1" fontWeight={400}>{formatDate(order.createdAt)}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body2" color="textSecondary">Phương thức thanh toán</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1" fontWeight={400}>{paymentMethodMap[order.paymentMethod].display}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body2" color="textSecondary">Hình thức giao hàng</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1" fontWeight={400}>{shippingMethodMap[order.shippingMethod].display}</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}