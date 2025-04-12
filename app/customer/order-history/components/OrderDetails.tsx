import {OrderDocument} from "@/app/types/order";
import {Box, DialogContent, Divider, Typography} from "@mui/material";
import {OrderStatusChip} from "@/app/customer/order-history/components/OrderStatusChip";
import Image from "next/image";

interface OrderDetailsProps {
    order: OrderDocument;
}

export const OrderDetails = ({order}: OrderDetailsProps) => {
    return (
        <DialogContent>
            <Typography variant='h5' gutterBottom>
                Mã đơn hàng #{order.orderId}
            </Typography>
            <Typography variant='body1' gutterBottom>
                Thời gian đặt hàng: {order.createdAt.toDate().toLocaleString('vi-VN')}
            </Typography>
            <Typography variant='body1' gutterBottom component='div'>
                Trạng thái đơn: <OrderStatusChip status={order.status}/>
            </Typography>
            <Typography variant='h6' gutterBottom>
                Sách
            </Typography>
            {order.items.map((item) => (
                <Box key={item.bookId} display='flex' marginY={2} gap={2} padding={1} borderRadius={0.2} boxShadow={1}>
                    <Image
                        src={item.imageUrl} alt={item.title}
                        width={120}
                        height={120}
                        objectFit='cover'
                    />
                    <Box>
                        <Typography variant='h6' fontWeight={400} marginBottom={0.5}>{item.title}</Typography>
                        <Typography variant='body2' color='textSecondary' marginBottom={0.5}>
                            Số lượng: {item.quantity}</Typography>
                        <Typography variant='body2' color='textSecondary' marginBottom={0.5}>
                            Đơn giá: {item.discounted.toLocaleString('vi-VN')}VNĐ</Typography>
                        <Typography variant='body1'>Tạm tính: {item.subtotal.toLocaleString('vi-VN')}VNĐ</Typography>
                    </Box>
                </Box>
            ))}
            <Divider sx={{marginY: 2}}/>
            <Typography variant='h6' align='right'>
                Tổng đơn: {order.totalPrice.toLocaleString('vi-VN')} VNĐ
            </Typography>
        </DialogContent>
    )
}