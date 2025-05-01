'use client'

import React, {useEffect, useState} from 'react';
import {useRouter, useParams} from "next/navigation";
import AddressForm, {AddressFormValues} from "@/app/customer/address/components/AddressForm";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {db} from '@/lib/firebase/config';
import {doc, getDoc} from "firebase/firestore";
import {useAuth} from "@/app/context/AuthProviderContext";

export default function EditAddressPage() {
    const {user} = useAuth();
    const {id} = useParams<{id: string}>();
    const router = useRouter();
    const [initialData, setInitialData] = useState<AddressFormValues | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        if (!user || !id) return;
        const fetchAddress = async () => {
            try {
                const addressRef = doc(db, `users/${user.uid}/addresses/${id}`);
                const addressSnap = await getDoc(addressRef);
                if (!addressSnap.exists()) {
                    router.replace('/customer/address');
                    return;
                }
                const data = addressSnap.data() as Omit<AddressFormValues, 'id'>;
                setInitialData({
                    id: addressSnap.id,
                    ...data,
                })
            } catch (error) {
                console.error(error);
                router.replace('/customer/address');
            } finally {
                setLoading(false);
            }
        };
        fetchAddress();
    }, [user, id, router]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" marginTop={4}>
                <CircularProgress />
            </Box>
        )
    }
    return (
        <Box>
            <Typography variant="h6" gutterBottom marginBottom={2}>Sửa địa chỉ</Typography>
            <AddressForm
                initialData={initialData}
                isEdit={true}
            />
        </Box>
    )
}