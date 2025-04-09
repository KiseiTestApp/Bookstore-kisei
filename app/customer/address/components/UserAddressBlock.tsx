"use client"

import {MenuItem, TextField} from '@mui/material';
import React, { useEffect, useState } from 'react';
import addressData from '@/public/vietnam_addresses.json';
import {Province, Ward, District, AddressSelection} from "@/app/types/address";
import Grid from "@mui/material/Grid2";
import {Box} from "@mui/system";

interface AddressSelectorProps {
    value: AddressSelection;
    onChangeAction: (address: AddressSelection) => void;
    errors?: {
        street?: string;
        province?: string;
        district?: string;
        ward?: string;
    };
}

export default function UserAddressBlock({ value, onChangeAction, errors } : AddressSelectorProps) {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selected, setSelected] = useState<AddressSelection>(value);

    useEffect(() => {
        setProvinces(addressData as Province[]);
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
        <Box>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <TextField
                        error={!!errors?.street}
                        helperText={errors?.street}
                        fullWidth
                        placeholder="Tên nhà, số đường"
                        value={selected.street}
                        onChange={(e) => handleChange('street', e.target.value)}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField fullWidth
                               value={selected.province}
                               onChange={(e) => handleChange('province', e.target.value)}
                               select
                               label="Tỉnh/Thành phố"
                               error={!!errors?.province}
                               helperText={errors?.province}
                    >
                        {provinces.map((province) => (
                            <MenuItem key={province.Code} value={province.Code}>
                                {province.FullName}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid size={12}>
                    <TextField fullWidth
                               value={selected.district}
                               onChange={(e) => handleChange('district', e.target.value)}
                               disabled={!selected.province}
                               label="Huyện/Thị xã"
                               select
                               error={!!errors?.district}
                               helperText={errors?.district}
                    >
                        {districts.map((district) => (
                            <MenuItem key={district.Code} value={district.Code}>
                                {district.FullName}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid size={12}>
                    <TextField
                        value={selected.ward}
                        onChange={(e) => handleChange('ward', e.target.value)}
                        disabled={!selected.district}
                        label="Phường/Xã"
                        select
                        fullWidth
                        error={!!errors?.ward}
                        helperText={errors?.ward}
                    >
                        {wards.map((ward) => (
                            <MenuItem key={ward.Code} value={ward.Code}>
                                {ward.FullName}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
        </Box>
    );
}