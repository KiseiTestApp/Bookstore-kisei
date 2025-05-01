"use client"

import { Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import React from 'react';
import Grid from "@mui/material/Grid2";
import {useFormContext} from 'react-hook-form';
import {FixedSizeList} from "react-window";
import {useAddressData} from "@/app/hooks/useAddressData";


// eslint-disable-next-line react/display-name
const VirtualizedList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(
    (props, ref) => {
        const { children, ...other } = props;
        const items = React.Children.toArray(children);
        const itemCount = items.length;
        const itemSize = 48;
        const listHeight = Math.min(itemCount * itemSize, 300);

        return (
            <div ref={ref}>
                <FixedSizeList
                    height={listHeight}
                    width="100%"
                    itemSize={itemSize}
                    itemCount={itemCount}
                    style={{ padding: 2}}
                >
                    {({ index, style }) => (
                        <div style={style}>
                            {items[index]}
                        </div>
                    )}
                </FixedSizeList>
            </div>
        );
    }
);

const MenuProps = {
    PaperProps: {
        style: {
            width: 'auto',
        },
    },
    MenuListProps: {
        component: VirtualizedList,
        style: {padding: 2}
    },
};

interface AddressSelectorProps {
    name: string;
}

export default function AddressSelector({ name } : AddressSelectorProps) {
    const {watch, setValue, getValues} = useFormContext();
    const {
        provinces,
        districts,
        wards,
        isLoading,
        handleFieldChange,
    } = useAddressData(name, setValue, getValues);

    const formValues = watch();
    const { province, district, ward, street } = formValues || {};

    const selectedProvince = provinces.find(p => p.Code === province);
    const selectedDistrict = districts.find(d => d.Code === district);
    const selectedWard = wards.find(w => w.Code === ward);

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
                    <Grid size={{xs: 12, lg: 4}}>
                        <FormControl fullWidth>
                            <InputLabel>Tỉnh/Thành phố</InputLabel>
                            <Select
                                value={province || ''}
                                onChange={(e) => handleFieldChange('province', e.target.value)}
                                label="Tỉnh/Thành phố"
                                MenuProps={MenuProps}
                                renderValue={() => selectedProvince ? selectedProvince.FullName : ''}
                            >
                                {provinces.map((province) => (
                                    <MenuItem key={province.Code} value={province.Code}>
                                        {province.FullName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{xs: 12, lg: 4}}>
                        <FormControl fullWidth>
                            <InputLabel>Quận/Huyện</InputLabel>
                            <Select
                                value={district || ''}
                                onChange={(e) => handleFieldChange('district', e.target.value)}
                                label="Quận/Huyện"
                                disabled={!province}
                                MenuProps={MenuProps}
                                renderValue={() => selectedDistrict ? selectedDistrict.FullName : ''}
                            >
                                {districts.map((district) => (
                                    <MenuItem key={district.Code} value={district.Code}>
                                        {district.FullName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{xs: 12, lg: 4}}>
                        <FormControl fullWidth>
                            <InputLabel>Phường/Xã</InputLabel>
                            <Select
                                value={ward || ''}
                                onChange={(e) => handleFieldChange('ward', e.target.value)}
                                label="Phường/Xã"
                                disabled={!district}
                                MenuProps={MenuProps}
                                renderValue={() => selectedWard ? selectedWard.FullName : ''}
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