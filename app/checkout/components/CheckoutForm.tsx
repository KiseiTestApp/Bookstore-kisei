"use client"

import { Stack, Box } from "@mui/system";
import ShippingInfoBlock from "@/app/checkout/components/ShippingInfoBlock";
import ShippingMethodBlock from "@/app/checkout/components/ShippingMethodBlock";
import Payment from "@/app/checkout/components/PaymentBlock";
import CustomerNoteBlock from "@/app/checkout/components/CustomerNoteBlock";
import Grid from "@mui/material/Grid2";
import CartSummary from "@/app/checkout/components/CartSummary";
import {submitOrder} from "@/app/utils/orders/submitOrder";
import React, { useState } from "react";
import {useCart} from "@/app/hooks/useCart";
import {useAuth} from "@/app/context/AuthProviderContext";
import Button from "@mui/material/Button";
import {AddressSelection} from "@/app/types/address";
import {useSnackbar} from "@/app/context/SnackbarContext";

export default function CheckoutForm() {
    const {user} = useAuth();
    const {cartItems, totalPrice, clearCart} = useCart();
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const {showSnackbar} = useSnackbar();
    const [orderFormData, setOrderFormData] = useState({
        customer: {
            customer_name: "",
            customer_phone: "",
            customer_email: user?.email || "",
        },
        shippingAddress: {
            province: "",
            district: "",
            ward: "",
            street: "",
            fullAddress: "",
        },
        shippingMethod: "standard" as const,
        paymentMethod: "COD" as const,
        status: "pending" as const,
        note: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false);
    const updateCustomerField = (field: keyof typeof orderFormData.customer, value: string) => {
        setOrderFormData(prev => ({
            ...prev,
            customer: {
                ...prev.customer,
                [field]: value
            }
        }));
    };
    const updateAddressField = (address: AddressSelection) => {
        setOrderFormData(prev => ({
            ...prev,
            shippingAddress: address,
        }));
    };
    const updateShippingMEthod = (method: string) => {
        setOrderFormData(prev => ({
            ...prev,
            shippingMethod: method as typeof prev.shippingMethod,
        }))
    }

    const updatePaymentMethod = (method: string) => {
        setOrderFormData(prev => ({
            ...prev,
            paymentMethod: method as typeof prev.paymentMethod
        }));
    };

    const updateCustomerNote = (note: string) => {
        setOrderFormData(prev => ({
            ...prev,
            note
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            const result = await submitOrder(
                orderFormData,
                cartItems,
                totalPrice,
                user?.uid,
                clearCart,
            );
            if (result.success) {
                setSubmitSuccess(true);
                showSnackbar("Đặt hàng thành công", "success")
            } else {
                showSnackbar(result.error || "Đặt hàng thất bại", "error")
            }
        } catch (error) {
            console.log("Error submitting order", error);
            showSnackbar("Đã có lỗi xảy ra khi gửi đơn hàng", "error")
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <Box margin={6} padding={6}>
            <Grid container spacing={3}>
                <Grid size={7}>
                    <Stack component={"form"} onSubmit={handleSubmit} direction="column" spacing={2}>
                        <ShippingInfoBlock
                            customerData={orderFormData.customer}
                            addressData={orderFormData.shippingAddress}
                            onCustomerChangeAction={updateCustomerField}
                            onAddressChangeAction={updateAddressField}
                        />
                        <Payment
                            value={orderFormData.paymentMethod}
                            onChange={updatePaymentMethod}
                        />
                        <ShippingMethodBlock
                            value={orderFormData.shippingMethod}
                            onChange={updateShippingMEthod}
                        />
                        <CustomerNoteBlock
                            note={orderFormData.note}
                            onChange={updateCustomerNote}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            loading={isSubmitting}
                            disabled={!cartItems || cartItems.length === 0}
                        >
                            {isSubmitting ? "Đang xử lý..." : "Đặt hàng"}
                        </Button>
                    </Stack>
                </Grid>
                <Grid size={5}>
                    <CartSummary />
                </Grid>
            </Grid>
        </Box>
    )
}