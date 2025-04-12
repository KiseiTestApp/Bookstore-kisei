"use client"

import { Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {Province, Ward, District} from "@/app/types/address";
import Grid from "@mui/material/Grid2";
import {useFormContext} from 'react-hook-form';

interface AddressSelectorProps {
    name: string;
}

export default function AddressSelector({ name } : AddressSelectorProps) {
    const {watch, setValue, getValues} = useFormContext();
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const formValues = watch(name);
    const { province, district, ward, street } = formValues || {};

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
        void loadData();
    }, []);

    useEffect(() => {
        if (province) {
            const provinceObj = provinces.find(p => p.Code == province);
            setDistricts(provinceObj?.District || []);
            setValue(`${name}.district`, '');
            setValue(`${name}.ward`, '');
        }
    }, [province, provinces, name, setValue]);

    useEffect(() => {
        if (district) {
            const districtObj = districts.find(d => d.Code === district);
            setWards(districtObj?.Ward || []);
            setValue(`${name}.ward`, '');
        }
    }, [district, districts, name, setValue]);

    const handleFieldChange = (field: string, value: string) => {
        const currentValues = getValues(name);
        const newValues = {
            ...currentValues,
            [field]: value
        }
        setValue(`${name}.${field}`, value);

        // Tìm thông tin địa chỉ dựa theo Code tương ứng
        const provinceObj = provinces.find(p => p.Code === newValues.province);
        const districtObj = provinceObj?.District?.find(d => d.Code === newValues.district);
        const wardObj = districtObj?.Ward?.find(w => w.Code === newValues.ward);

        // Lưu tên địa chỉ
        if (field === 'province') {
            setValue(`${name}.district`, newValues.province);
            setValue(`${name}.provinceName`, provinceObj?.FullName || '');
        }
        if (field === 'district') {
            setValue(`${name}.district`, newValues.district);
            setValue(`${name}.districtName`, districtObj?.FullName || '');
        }
        if (field === 'ward') {
            setValue(`${name}.ward`, newValues.ward);
            setValue(`${name}.wardName`, wardObj?.FullName || '');
        }

        // Cập nhật địa chỉ đầy đủ
        const addressParts = [
                newValues.street,
                wardObj?.FullName,
                districtObj?.FullName,
                provinceObj?.FullName
        ].filter(part => part && part.trim() !== ' ');
        setValue(`${name}.fullAddress`, addressParts.join(', '));
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
                            value={street || ''}
                            onChange={(e) => handleFieldChange('street', e.target.value)}
                        />
                    </Grid>
                    <Grid size={4}>
                        <FormControl fullWidth>
                            <InputLabel>Tỉnh/Thành phố</InputLabel>
                            <Select
                                value={province || ''}
                                onChange={(e) => handleFieldChange('province', e.target.value)}
                                label="Tỉnh/Thành phố"
                                MenuProps={{
                                    style: {
                                        maxHeight: 300,
                                    },
                                }}
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
                        <FormControl fullWidth>
                            <InputLabel>Quận/Huyện</InputLabel>
                            <Select
                                value={district || ''}
                                onChange={(e) => handleFieldChange('district', e.target.value)}
                                label="Quận/Huyện"
                                disabled={!province}
                                MenuProps={{
                                    style: {
                                        maxHeight: 300,
                                    }
                                }}
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
                                value={ward || ''}
                                onChange={(e) => handleFieldChange('ward', e.target.value)}
                                label="Phường/Xã"
                                MenuProps={{
                                    style: {
                                        maxHeight: 300,
                                    }
                                }}
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