"use client"

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import {TextField} from "@mui/material";
import {useAddressData} from "@/app/hooks/useAddressData";
import {Controller} from "react-hook-form";
import {AddressFormValues} from "@/app/customer/address/components/AddressForm";

interface AddressFieldsProps {
    control: any;
    setValue: any;
    getValues: any;
    errors: any,
    initialData?: AddressFormValues
}

export const AddressFieldsSelector = ({ control, setValue, getValues, errors, initialData }: AddressFieldsProps) => {
    const { provinces, districts, wards, isLoading, handleFieldChange } = useAddressData(
        "",
        setValue,
        getValues,
        initialData
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
                            renderValue={(value) => {
                                const selectedProvince = provinces.find(p => p.Code === value);
                                return selectedProvince ? selectedProvince.FullName : value;
                            }}
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
                            renderValue={(value) => {
                                const selectedDistrict = districts.find(d => d.Code === value);
                                return selectedDistrict ? selectedDistrict.FullName : value;
                            }}
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
                            renderValue={(value) => {
                                const selectedWard = wards.find(w => w.Code === value);
                                return selectedWard ? selectedWard.FullName : value;
                            }}
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
                        onChange={(e) => {
                            field.onChange(e);
                            handleFieldChange('street', e.target.value)
                        }}
                    />
                )}
            />
        </>
    );
};