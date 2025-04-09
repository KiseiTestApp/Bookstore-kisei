"use client"

import { Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {Province, Ward, District, AddressSelection} from "@/app/types/address";
import Grid from "@mui/material/Grid2";

interface AddressSelectorProps {
    value: AddressSelection;
    onChangeAction: (address: AddressSelection) => void;
}

export default function AddressSelector({ value, onChangeAction } : AddressSelectorProps) {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selected, setSelected] = useState<AddressSelection>(value);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const addressData = await import ('@/public/vietnam_addresses.json');
                setProvinces(addressData.default as Province[]);
            } catch (error) {
                console.error("Error loading data", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        if (selected.province) {
            const province = provinces.find(p => p.Code === selected.province);
            setDistricts(province?.District || []);
        }
    }, [selected.province]);

    useEffect(() => {
        if (selected.district) {
            const district = districts.find(d => d.Code === selected.district);
            setWards(district?.Ward || []);
        }
    }, [selected.district]);

    const handleChange = (field : keyof AddressSelection, value: string) => {
        const newValues = {
            ...selected,
            [field]: value
        };

        setSelected(newValues);

        const provinceObj = provinces.find(p => p.Code === newValues.province);
        const districtObj = districts.find(d => d.Code === newValues.district);
        const wardObj = wards.find(w => w.Code === newValues.ward);


        onChangeAction({
            ...newValues,
            province: provinceObj?.FullName || '',
            district: districtObj?.FullName || '',
            ward: wardObj?.FullName || '',
            fullAddress: [
                newValues.street,
                wardObj?.FullName,
                districtObj?.FullName,
                provinceObj?.FullName
            ].filter(Boolean).join(', ')
        });
    };

    return (
        <Grid container spacing={2}>
            {isLoading ? (
                <Grid size={12}>Đang tải dữ liệu...</Grid>
            ) : (
                <>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            placeholder="Tên nhà, số đường"
                            value={selected.street}
                            onChange={(e) => handleChange('street', e.target.value)}
                        />
                    </Grid>
                    <Grid size={4}>
                        <FormControl fullWidth>
                            <InputLabel>Tỉnh/Thành phố</InputLabel>
                            <Select
                                value={selected.province}
                                onChange={(e) => handleChange('province', e.target.value)}
                            >
                                {provinces.map((province) => (
                                    <MenuItem key={province.Code} value={province.Code}>
                                        {province.FullName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={4}>
                        <FormControl fullWidth >
                            <InputLabel>Quận/Huyện</InputLabel>
                            <Select
                                value={selected.district}
                                onChange={(e) => handleChange('district', e.target.value)}
                                disabled={!selected.province}
                            >
                                {districts.map((district) => (
                                    <MenuItem key={district.Code} value={district.Code}>
                                        {district.FullName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={4}>
                        <FormControl fullWidth>
                            <InputLabel>Phường/Xã</InputLabel>
                            <Select
                                value={selected.ward}
                                onChange={(e) => handleChange('ward', e.target.value)}
                                disabled={!selected.district}
                            >
                                {wards.map((ward) => (
                                    <MenuItem key={ward.Code} value={ward.Code}>
                                        {ward.FullName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </>
            )}
        </Grid>
    );
}