"use client"

import {Button, Checkbox, Divider, FormControl, FormControlLabel, Stack, TextField} from "@mui/material";
import React from "react";
import {useRouter} from "next/navigation";
import {Box} from "@mui/system";
import {useAuth} from "@/app/context/AuthProviderContext";
import {db} from '@/lib/firebase/config'
import {addDoc, collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {useSnackbar} from "@/app/context/SnackbarContext";
import {Controller, useForm} from 'react-hook-form';
import {AddressFieldsSelector} from "@/app/customer/address/components/AddressFieldSelector";

export interface AddressFormValues {
    id?: string;
    receiver_name: string;
    receiver_phone: string;
    street: string;
    province: string;
    provinceName?: string;
    district: string;
    districtName?: string;
    ward: string;
    wardName?: string;
    fullAddress: string;
    isDefault?: boolean;
}

interface AddAddressFormProps {
    initialData?: AddressFormValues;
    isEdit?: boolean;
}

export default function AddressForm({initialData, isEdit = false}: AddAddressFormProps) {

    const {showSnackbar} = useSnackbar();
    const {user} = useAuth();
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: {errors},
        setValue,
        getValues,
    } = useForm<AddressFormValues>({
        defaultValues: initialData || {
            receiver_name: '',
            receiver_phone: '',
            street: '',
            province: '',
            district: '',
            ward: '',
            fullAddress: '',
            isDefault: false,
            provinceName: '',
            districtName: '',
            wardName: '',
        }
    })


    // Đổi các địa chỉ khác sang địa chỉ thông thường khi có địa chỉ mặc định mới
    const unsetOtherDefaultAddresses = async (userId: string) => {
        const addressesRef = collection(db, `users/${userId}/addresses`);
        const addressesQuery = query(addressesRef, where("isDefault", "==", true));
        const snapshot = await getDocs(addressesQuery);
        const updates = snapshot.docs.map(docRef => {
            updateDoc(docRef.ref, {isDefault: false})
        })
        await Promise.all(updates);
    };

    // Tạo địa chỉ mới trên Firebase
    const onSubmit = async (data: AddressFormValues) => {
        if (!user) return;
        try {
            if (data.isDefault) {
                await unsetOtherDefaultAddresses(user.uid);
            }
            const addressesRef = collection(db, `users/${user.uid}/addresses`);
            if (isEdit && data.id) {
                await updateDoc(doc(db, `users/${user.uid}/addresses/${data.id}`), {
                    ...data,
                    updatedAt: new Date(),
                });
                showSnackbar('Cập nhật địa chỉ thành công', 'success');
            } else {
                await addDoc(addressesRef, {
                    ...data,
                    created_at: new Date(),
                });
                showSnackbar("Tạo địa chỉ mới thành công", "success");
            }
            router.push("/customer/address");
        } catch (error) {
            console.error('Error saving address', error);
            showSnackbar("Đã xảy ra lỗi khi lưu địa chỉ", "error");
        }
    }


    return (
        <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="receiver_name"
                control={control}
                rules={{required: "Vui lòng nhập họ tên"}}
                render={({field}) => (
                    <TextField
                        {...field}
                        placeholder="Họ và tên"
                        fullWidth
                        error={!!errors.receiver_name}
                        helperText={errors.receiver_name?.message}
                    />
                )}
            />

            <Controller
                name="receiver_phone"
                control={control}
                rules={{
                    required: "Vui lòng nhập số điện thoại",
                    pattern: {
                        value: /^(0|\+84)[0-9]{9,10}$/,
                        message: "Số điện thoại không đúng"
                    }
                }}
                render={({field}) => (
                    <TextField
                        {...field}
                        placeholder="Số điện thoại"
                        fullWidth
                        error={!!errors.receiver_phone}
                        helperText={errors.receiver_phone?.message}
                    />
                )}
            />

            <AddressFieldsSelector
                control={control}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
                initialData={initialData}
            />


            <Controller
                name="isDefault"
                control={control}
                render={({field}) => (
                    <FormControl fullWidth>
                        <FormControlLabel
                            control={<Checkbox {...field} checked={field.value}/>}
                            label="Sử dụng như địa chỉ giao hàng mặc định của tôi"
                            labelPlacement="end"
                        />
                    </FormControl>
                )}
            />

            <Divider/>
            <Box display="flex" marginTop={1} justifyContent="space-between">
                <Button variant="outlined" color="primary" onClick={() => router.push("/customer/address")}>Quay
                    lại</Button>
                <Button variant="contained" color="primary" autoCapitalize="true" type="submit">Lưu địa chỉ</Button>
            </Box>
        </Stack>
    )
}