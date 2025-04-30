"use client"

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import {TextField} from "@mui/material";
import {useAddressData} from "@/app/hooks/useAddressData";
import {Controller} from "react-hook-form";

interface AddressFieldsProps {
    control: any;
    setValue: any;
    getValues: any;
    errors: any,
}

export const AddressFieldsSelector = ({ control, setValue, getValues, errors }: AddressFieldsProps) => {
    const { provinces, districts, wards, isLoading, handleFieldChange } = useAddressData(
        "",
        setValue,
        getValues
    );

    const handleSelectChange = (field: string) => (e: SelectChangeEvent) => {
        setValue(field, e.target.value, { shouldValidate: true });
        handleFieldChange(field, e.target.value);
    };

    return (
        <>
            <FormControl fullWidth disabled={isLoading}>
                <InputLabel>Tỉnh/Thành phố</InputLabel>
                <Controller
                    name="province"
                    control={control}
                    rules={{ required: "Vui lòng chọn tỉnh/thành phố" }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label="Tỉnh/Thành phố"
                            onChange={handleSelectChange("province")}
                            value={field.value}
                        >
                            {provinces.map((province) => (
                                <MenuItem key={province.Code} value={province.Code}>
                                    {province.FullName}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
            </FormControl>

            <FormControl fullWidth disabled={!districts.length || isLoading}>
                <InputLabel>Quận/Huyện</InputLabel>
                <Controller
                    name="district"
                    control={control}
                    rules={{ required: "Vui lòng chọn quận/huyện" }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label="Quận/Huyện"
                            onChange={handleSelectChange("district")}
                            value={field.value}
                        >
                            {districts.map((district) => (
                                <MenuItem key={district.Code} value={district.Code}>
                                    {district.FullName}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
            </FormControl>

            <FormControl fullWidth disabled={!wards.length || isLoading}>
                <InputLabel>Phường/Xã</InputLabel>
                <Controller
                    name="ward"
                    control={control}
                    rules={{ required: "Vui lòng chọn phường/xã" }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label="Phường/Xã"
                            onChange={handleSelectChange("ward")}
                            value={field.value}
                        >
                            {wards.map((ward) => (
                                <MenuItem key={ward.Code} value={ward.Code}>
                                    {ward.FullName}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
            </FormControl>

            <Controller
                name="street"
                control={control}
                rules={{ required: "Vui lòng nhập số nhà, tên đường" }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        placeholder="Số nhà, tên đường"
                        fullWidth
                        error={!!errors.street}
                        helperText={errors.street?.message}
                    />
                )}
            />
        </>
    );
};