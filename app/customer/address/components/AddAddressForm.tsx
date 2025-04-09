"use client"

import {TextField, Stack, Divider, Button, FormControlLabel, Checkbox, FormControl} from "@mui/material";
import React, {useState} from "react";
import UserAddressBlock from "@/app/customer/address/components/UserAddressBlock";
import {useRouter} from "next/navigation";
import {Box} from "@mui/system";
import {useAuth} from "@/app/context/AuthProviderContext";
import {db} from '@/lib/firebase/config'
import {addDoc, collection, updateDoc, getDocs, query, where} from "firebase/firestore";
import {useSnackbar} from "@/app/context/SnackbarContext";

export interface AddressFormValues {
    id?: string;
    receiver_name: string;
    receiver_phone: string;
    street: string;
    province: string;
    district: string;
    ward: string;
    fullAddress: string;
    isDefault?: boolean;
}
interface ValidationErrors {
    receiver_name?: string;
    receiver_phone?: string;
    street?: string;
    province?: string;
    district?: string;
    ward?: string;
}
const initialValues: AddressFormValues = {
    receiver_name: '',
    receiver_phone: '',
    street: '',
    province: '',
    district: '',
    ward: '',
    fullAddress: '',
    isDefault: false,
}
export default function AddAddressForm() {
    const [address, setAddress] = useState<AddressFormValues>(initialValues);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [submitError, setSubmitError] = useState('');
    const {showSnackbar} = useSnackbar();
    const {user} = useAuth();
    const router = useRouter();
    const handleFieldChange = (field: keyof AddressFormValues, value: string) => {
        setAddress(prev =>({
            ...prev,
            [field]: value
        }));
    };

    //Kiểm tra dữ liệu trong trường
    const validateForm = () : boolean => {
        const newErrors: ValidationErrors = {};
        let isValid = true;

        //Họ và tên
        if (!address.receiver_name.trim()) {
            newErrors.receiver_name = "Vui lòng nhập họ tên"
            isValid = false;
        }

        //SĐT
        if (!address.receiver_phone.trim()) {
            newErrors.receiver_phone = "Vui lòng nhập số điện thoại"
            isValid = false;
        } else if (!/^(0|\+84)[0-9]{9,10}$/.test(address.receiver_phone)) {
            newErrors.receiver_phone = "Số điện thoại không đúng"
            isValid = false;
        }

        // Địa chỉ cụ thể
        if (!address.street.trim()) {
            newErrors.street = "Vui lòng địa chỉ"
            isValid = false;
        }
        // Tỉnh
        if (!address.province) {
            newErrors.province = "Vui lòng chọn tỉnh/thành phố";
            isValid = false;
        }
        // Huyện/thị xã
        if (!address.district) {
            newErrors.district = "Vui lòng chọn quận/huyện";
            isValid = false;
        }
        // Xã, phường
        if (!address.ward) {
            newErrors.ward = "Vui lòng chọn phường/xã";
            isValid = false;
        }
        setErrors(newErrors);
        setAddress(prev => ({...prev}));
        return isValid;
    }

    const handleAddressChange = (addressPart: Partial<AddressFormValues>) => {
        setAddress(prev => ({
            ...prev,
            ...addressPart,
        }));
    };

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

    // Cập nhật trở lại lên Firebase
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError('');
        if (!user) return;
        if (!validateForm()) {
            e.stopPropagation();
            return;
        }
        try {
            if (address.isDefault) {
                await unsetOtherDefaultAddresses(user.uid)
            }
            const addressesRef = collection(db, `users/${user.uid}/addresses`);
            await addDoc(addressesRef, {
                ...address,
                created_at: new Date(),
            })
            showSnackbar("Tạo địa chỉ mới thành công", "success")
        } catch (error) {
            console.error("Error creating addresses", error);
            showSnackbar("Không thể tạo địa chỉ mới do lỗi đã xảy ra", "error")
        }
    }
    return (
        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
            <TextField
                placeholder="Họ và tên"
                fullWidth
                value={address.receiver_name}
                onChange={(e) => handleFieldChange('receiver_name', e.target.value)}
                error={!!errors.receiver_name}
                helperText={errors.receiver_name}
            />
            <TextField
                placeholder="Số điện thoại"
                fullWidth
                value={address.receiver_phone}
                onChange={(e) => handleFieldChange('receiver_phone', e.target.value)}

                error={!!errors.receiver_phone}
                helperText={errors.receiver_phone}
            />
            <UserAddressBlock
                value={{
                    street: address.street,
                    province: address.province,
                    district: address.district,
                    ward: address.ward,
                    fullAddress: address.fullAddress,
                }}
                errors={errors}
                onChangeAction={handleAddressChange} />
            <FormControl fullWidth>
                <FormControlLabel
                    control={<Checkbox
                        checked={address.isDefault}
                        onChange={(e) => setAddress({ ...address, isDefault: e.target.checked })}
                    />}
                    label={"Sử dụng như địa chỉ giao hàng mặc định của tôi"}
                    labelPlacement="end"
                />
            </FormControl>
            <Divider />
            <Box display="flex" marginTop={1} justifyContent="space-between">
                <Button variant="outlined" color="primary" onClick={() => router.push("/customer/address")}>Quay lại</Button>
                <Button variant="contained" color="primary" autoCapitalize="true" type="submit">Lưu địa chỉ</Button>
            </Box>
        </Stack>
    )
}