"use client"

import { TextField, Typography } from '@mui/material';
import React from 'react';
import Grid from "@mui/material/Grid2";
import {AddressSelection} from "@/app/types/address";
import dynamic from "next/dynamic";

const AddressSelector = dynamic(() => import("./AddressSelector"), {
    ssr: false
});

interface CustomerData {
    customer_name: string;
    customer_phone: string;
    customer_email: string;
}
interface AddressData {
    street: string;
    province: string;
    district: string;
    ward: string;
    fullAddress: string;
}
interface ShippingInfoBlockProps {
    customerData: CustomerData;
    addressData: AddressData;
    onCustomerChangeAction: (field: keyof CustomerData, value: string) => void;
    onAddressChangeAction: (address: AddressSelection) => void;
}

export default function ShippingInfoBlock({customerData, addressData, onAddressChangeAction, onCustomerChangeAction} : ShippingInfoBlockProps) {
    const handleCustomerChange = (field: keyof CustomerData, value: string) => {
        onCustomerChangeAction(field, value);
    };

    return (
        <Grid container columns={10} spacing={2} sx={{ background: 'white', p: 4 }}>
            <Typography variant="h5">Thông tin đơn hàng</Typography>
            <Grid size={10}>
                <TextField
                    fullWidth
                    placeholder="Họ và tên"
                    value={customerData.customer_name}
                    onChange={(e) => handleCustomerChange('customer_name', e.target.value)}

                />
            </Grid>
            <Grid size={5}>
                <TextField
                    fullWidth
                    placeholder="Số điện thoại"
                    value={customerData.customer_phone}
                    onChange={(e) => handleCustomerChange('customer_phone', e.target.value)}

                />
            </Grid>
            <Grid size={5}>
                <TextField
                    fullWidth
                    placeholder="Email"
                    value={customerData.customer_email}
                    onChange={(e) => handleCustomerChange('customer_email', e.target.value)}

                />
            </Grid>
            <Grid size={10}>
                <AddressSelector
                    value={addressData}
                    onChangeAction={onAddressChangeAction}
                />
            </Grid>
        </Grid>
    );
}