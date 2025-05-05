"use client"

import {fetchOrderById} from "@/app/utils/orders/fetchAllOrders";
import {OrderDocument} from "@/app/types/order";
import {useState, useEffect} from "react";
import CustomerBlock from "@/app/admin/orders/components/CustomerBlock";
import ShippingBlock from "@/app/admin/orders/components/ShippingBlock";
import {Typography, Button, CircularProgress} from "@mui/material";
import {Box} from "@mui/system";
import {useParams, useRouter} from "next/navigation";
import Grid from "@mui/material/Grid2";
import NoteSummary from "@/app/admin/orders/components/NoteSummary";
import CheckoutSummary from "@/app/admin/orders/components/CheckoutSummary";
import {useSnackbar} from "@/app/context/SnackbarContext";
import {updateOrderStatus} from "@/app/utils/orders/fetchAllOrders";
import OrderStatusDialog from "@/app/admin/orders/components/OrderStatusDialog";
import InvoiceDocument from "@/app/admin/orders/order-details/[orderId]/components/InvoiceDocument";
import {PDFDownloadLink} from "@react-pdf/renderer";
import PrintIcon from "@mui/icons-material/Print";


export default function OrderDetails() {
    const params = useParams();
    const orderId = params?.orderId as string;
    const [order, setOrder] = useState<OrderDocument | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [actionType, setActionType] = useState<"confirm" | "cancel">("confirm");
    const [isRefresh, setIsRefresh] = useState<boolean>(false);
    const {showSnackbar} = useSnackbar();
    const router = useRouter();
    useEffect(() => {
        if (!orderId) return;
        const loadOrder = async () => {
            try {
                const orderData = await fetchOrderById(orderId);
                setOrder(orderData);
            } catch (error) {
                console.error("Failed to fetch order", error);
            }
        };
        loadOrder();
    }, [orderId]);

    const handleStatusChange = async (type: "confirm" | "cancel") => {
        try {
            const newStatus = type === "confirm" ? "paid" : "cancelled";
            await updateOrderStatus(orderId, newStatus);
            setOrder(prev => prev ? {...prev, status: newStatus} : null);
            showSnackbar(`Đơn hàng đã được ${type === "confirm" ? "xác nhận" : "hủy"} thành công`, "info");
            router.refresh();
        } catch (error) {
            console.error("Failed to update order", error);
            showSnackbar("Có lỗi xảy ra khi cập nhật trạng thái đơn hàng", "error");
        } finally {
            setIsRefresh(false);
        }
    }

    if (!order) return <Box className="h-screen w-auto flex items-center justify-center">
        <CircularProgress color="primary" />
    </Box>

    return (
        <Box marginX={3} marginY={12}>
            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={3}>
                <Typography variant="h5">Thông tin chi tiết</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                    <Button variant="contained" color="primary" onClick={() => {
                        setActionType("confirm");
                        setDialogOpen(true);
                    }}>
                        Xác nhận đơn hàng
                    </Button>
                    <Button variant="contained" color="error" onClick={() => {
                        setActionType("cancel");
                        setDialogOpen(true);
                    }}>
                        Hủy đơn hàng
                    </Button>
                    <PDFDownloadLink
                        document={<InvoiceDocument order={order} />}
                        fileName={`hoa_don_${orderId}.pdf`}
                        style={{ textDecoration: "none" }}
                    >
                        <Button variant='outlined' color='info' startIcon={<PrintIcon />}>
                            Tạo hóa đơn
                        </Button>
                    </PDFDownloadLink>
                </Box>
            </Box>
            <Box>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <CustomerBlock order={order} />
                    </Grid>
                    <Grid size={6}>
                        <ShippingBlock
                            order={order}
                            paymentMethod={order.paymentMethod}
                            shippingMethod={order.shippingMethod}
                            status={order.status}
                        />
                    </Grid>
                    <Grid size={12}>
                        <NoteSummary orderNote={order} />
                    </Grid>
                    <Grid size={12}>
                        <CheckoutSummary orderItems={order} />
                    </Grid>
                </Grid>

            </Box>
            <OrderStatusDialog
                open={dialogOpen}
                actionType={actionType}
                onClose={() => setDialogOpen(false)}
                onConfirm={() => handleStatusChange(actionType)}
            />
            {isRefresh && (
                <Box className="fixed inset-0 flex items-center justify-center z-50">
                    <CircularProgress color="primary" />
                </Box>
            )}
        </Box>
    )
}