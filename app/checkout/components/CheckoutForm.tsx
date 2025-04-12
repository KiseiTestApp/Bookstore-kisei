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
        try {
            const orderData = prepareOrderData(data, cartItems, totalPrice);
            const result = await submitOrder(
                orderData,
                cartItems,
                totalPrice,
                user?.uid,
                clearCart,
            );
            if (result.success) {
                showSnackbar('Đặt hàng thành công', 'success');
            } else {
                showSnackbar(result.error || 'Đặt hàng thất bại', 'error');
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
                <Grid size={7}>
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
                <Grid size={5}>
                    {memoizedCartSummary}
                </Grid>
            </Grid>
        </Box>
    )
}