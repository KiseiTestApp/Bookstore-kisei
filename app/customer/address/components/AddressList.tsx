"use client";

import {Box, Button, CircularProgress, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useRouter} from "next/navigation";
import {useAuth} from "@/app/context/AuthProviderContext";
import {useEffect, useState} from "react";
import {useSnackbar} from "@/app/context/SnackbarContext";
import {AddressFormValues} from "@/app/customer/address/components/AddressForm";
import AddressCard from "@/app/customer/address/components/AddressCard";
import {fetchAddresses, deleteAddress} from "@/app/utils/account/address/addressHandlers";

export default function AddressList() {
    const [addresses, setAddresses] = useState<AddressFormValues[] | undefined>([]);
    const [loading, setLoading] = useState(true);
    const {showSnackbar} = useSnackbar();
    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) return;
        fetchAddresses(user.uid)
            .then((data) => {
                console.log("Fetch addresses for user:", data);
                setAddresses(data);
            })
            .catch((error) => {
                console.error("Full error: ", error);
                showSnackbar("Không thể tải địa chỉ. Vui lòng thử lại.", "error")
                setAddresses(undefined)
            })
            .finally(() => setLoading(false));
    }, [user]);

    const handleDeleteAddress = async (id: string) => {
        if (!user) return;
        const success = await deleteAddress(user.uid, id);
        if (success) {
            setAddresses(prev => prev?.filter(addr => addr.id !== id));
            showSnackbar("Đã xóa địa chỉ thành công", "success")
        } else {
            showSnackbar("Gặp lỗi khi xóa địa chỉ này", "error")
        }
    }

    if (loading) return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <CircularProgress color="primary" />
        </Box>
    )

    return (
        <Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">Sổ địa chỉ</Typography>
                <Button size="large" startIcon={<AddIcon />} variant="contained" onClick={() => router.push("/customer/address/new")}>Thêm địa chỉ mới</Button>
            </Box>
            {addresses?.length === 0 ? (
                <Typography>Bạn chưa có địa chỉ nào</Typography>
            ) : (
                addresses?.map(address => (
                    <AddressCard
                        onDelete={handleDeleteAddress}
                        key={address.id}
                        address={address}
                        isDefault={address.isDefault}
                    />
                ))
            )}
        </Box>
    )
}