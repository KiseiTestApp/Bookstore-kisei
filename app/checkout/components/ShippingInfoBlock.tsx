"use client"

import { TextField, Typography } from '@mui/material';
import Grid from "@mui/material/Grid2";
import {Controller, useFormContext} from "react-hook-form";
import dynamic from "next/dynamic";

const AddressSelector = dynamic(() => import("./AddressSelector"), {
    ssr: false
});

export default function ShippingInfoBlock() {
    const {control} = useFormContext();

    return (
        <Grid container columns={10} spacing={2} sx={{ background: 'white', p: 4 }}>
            <Typography variant="h5">Thông tin đơn hàng</Typography>
            <Grid size={10}>
                <Controller
                    name='customer.customer_name'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            fullWidth
                            placeholder="Họ và tên"
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                    rules={{ required: 'Vui lòng nhập họ tên' }}
                />
            </Grid>
            <Grid size={5}>
                <Controller
                    name='customer.customer_phone'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            fullWidth
                            placeholder="Số diện thoại"
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                    rules={{
                        required: 'Vui lòng nhập số điện thoại',
                        pattern: {
                            value: /^\d{10,15}$/,
                            message: 'Số điện thoại không hợp lệ'
                        }
                    }}
                />
            </Grid>
            <Grid size={5}>
                <Controller
                    name='customer.customer_email'
                    control={control}
                    render={({field, fieldState: {error} }) => (
                        <TextField
                            {...field}
                            fullWidth
                            placeholder="Email"
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                    rules={{
                        required: 'Vui lòng nhập email',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email không hợp lệ'
                        }
                    }}
                />
            </Grid>
            <Grid size={10}>
                <AddressSelector name="shippingAddress" />
            </Grid>
        </Grid>
    );
}