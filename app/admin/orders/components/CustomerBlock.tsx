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
} from "@mui/material";
import Icon from "@mdi/react"
import {mdiAccountCreditCardOutline} from "@mdi/js";
import theme from "@/app/theme";
import {OrderDocument} from "@/app/types/order";

interface OrderInformationProps {
    order: OrderDocument;
}
export default function CustomerBlock({order}: OrderInformationProps) {

    return (
        <Card sx={{ p: 2, borderRadius: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
                    <Icon path={mdiAccountCreditCardOutline} size={1} />
                </Avatar>
                <Typography variant="h6">Thông tin khách hàng</Typography>
            </Box>
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body2" color="textSecondary">Tên khách hàng</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1" fontWeight={400}>{order.customer.customer_name}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body2" color="textSecondary">Số điện thoại</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1" fontWeight={400}>{order.customer.customer_phone}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body2" color="textSecondary">Địa chỉ giao hàng</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1" fontWeight={400}>{order.shippingAddress.fullAddress}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body2" color="textSecondary">Email</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1" fontWeight={400}>{order.customer.customer_email}</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}