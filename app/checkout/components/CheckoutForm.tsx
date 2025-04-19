"use client"

import { Stack, Box } from "@mui/system";
import ShippingInfoBlock from "@/app/checkout/components/ShippingInfoBlock";
import ShippingMethodBlock from "@/app/checkout/components/ShippingMethodBlock";
import Payment from "@/app/checkout/components/PaymentBlock";
import CustomerNoteBlock from "@/app/checkout/components/CustomerNoteBlock";
import Grid from "@mui/material/Grid2";
import CartSummary from "@/app/checkout/components/CartSummary";
import {submitOrder} from "@/app/utils/orders/submitOrder";
import { useState } from "react";
import {useCart} from "@/app/hooks/useCart";
import {useAuth} from "@/app/context/AuthProviderContext";
import {useMemo} from "react";
import Button from "@mui/material/Button";
import {useSnackbar} from "@/app/context/SnackbarContext";
import Breadcrumb from "@/app/components/Breadcrumb";
import {CheckoutFormValues, useCheckoutForm} from "@/app/hooks/useCheckoutForm";
import {FormProvider} from "react-hook-form";
import {CircularProgress} from "@mui/material";

export default function CheckoutForm() {
    const {user} = useAuth();
    const {cartItems, totalPrice, clearCart} = useCart();
    const {showSnackbar} = useSnackbar();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const checkoutForm = useCheckoutForm();
    const {
        handleSubmit,
        prepareOrderData,
    } = checkoutForm;

    const onSubmit = async (data: CheckoutFormValues) => {
        setIsSubmitting(true);
        let orderId: string | undefined;
        try {
            const orderData = prepareOrderData(data, cartItems, totalPrice);
            const orderResult = await submitOrder(
                orderData,
                cartItems,
                totalPrice,
                user?.uid,
                clearCart,
            );
            if (!orderResult.success || !orderResult.orderId) {
                showSnackbar(orderResult.error || 'Đặt hàng thất bại', 'error');
            }
            if (data.paymentMethod === 'QR Pay') {
                const vnpayResponse = await fetch('/api/create-vnpay', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        order_id: orderResult.orderId,
                        amount: totalPrice,
                        return_url: `${window.location.origin}/payment/return?order_id=${orderId}`,
                    }),
                })
                const vnpayData = await vnpayResponse.json();
                if (vnpayData.code === '00') {
                    window.location.href = vnpayData.data;
                    return;
                }
                throw new Error('Thanh toán mã VNPay QR thất bại');
            }
            if (orderResult.success) {
                showSnackbar('Đặt hàng thành công', 'success');
            }
        } catch (error) {
            console.error('Error submitting order', error);
            showSnackbar('Đã có lỗi xảy ra khi gửi đơn hàng', 'error');
        } finally {
            setIsSubmitting(false);
        }
    }
    const memoizedCartSummary = useMemo(() => <CartSummary />, []);

    return (
        <Box margin={6} padding={6}>
            <Breadcrumb />
            <Grid container spacing={3}>
                <Grid size={{md: 12, lg: 7}}>
                    <FormProvider {...checkoutForm}>
                        <Stack component={"form"} onSubmit={handleSubmit(onSubmit)} direction="column" spacing={2}>
                            <ShippingInfoBlock />
                            <Payment />
                            <ShippingMethodBlock />
                            <CustomerNoteBlock />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!cartItems || cartItems.length === 0 || isSubmitting}
                                startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                            >
                                {isSubmitting ? "Đang xử lý..." : "Đặt hàng"}
                            </Button>
                        </Stack>
                    </FormProvider>
                </Grid>
                <Grid size={{md: 12, lg: 5}}>
                    {memoizedCartSummary}
                </Grid>
            </Grid>
        </Box>
    )
}