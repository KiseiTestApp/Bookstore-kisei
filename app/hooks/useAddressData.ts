import { useState, useEffect } from 'react';
import { Province, District, Ward } from "@/app/types/address";
import { AddressFormValues } from "@/app/customer/address/components/AddressForm";
import { UseFormSetValue, UseFormGetValues } from "react-hook-form";

type AddressFieldName = keyof AddressFormValues;

export function useAddressData(
    name: string,
    setValue: UseFormSetValue<any>,
    getValues: UseFormGetValues<any>,
    initialData?: AddressFormValues
) {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [isLoading, setIsLoading] = useState(false);


    const baseName = name || '';

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const data = await import('@/public/vietnam_addresses.json');
                const provinceData = data.default as Province[];
                setProvinces(provinceData);

                if (initialData?.province) {
                    const provinceObj = provinceData.find(p => p.Code === initialData.province);
                    if (provinceObj) {
                        setValue("provinceName" as AddressFieldName, provinceObj.FullName);
                        if (provinceObj.District) {
                            setDistricts(provinceObj.District);
                            if (initialData.district) {
                                const districtObj = provinceObj.District.find(d => d.Code === initialData.district);
                                if (districtObj) {
                                    setValue("districtName" as AddressFieldName, districtObj.FullName);
                                    if (districtObj.Ward) {
                                        setWards(districtObj.Ward);
                                        if (initialData.ward) {
                                            const wardObj = districtObj.Ward.find(w => w.Code === initialData.ward);
                                            if (wardObj) {
                                                setValue("wardName" as AddressFieldName, wardObj.FullName);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (error) {
                console.error("Error loading data", error);
            } finally {
                setIsLoading(false);
            }
        };
        void loadData();
    }, [setValue, baseName, initialData]);

    const handleFieldChange = (field: AddressFieldName, value: string) => {
        setValue(field, value);

        const province = field === 'province' ? value : getValues("province");
        const district = field === 'district' ? value : getValues("district");
        const ward = field === 'ward' ? value : getValues("ward");
        const street = field === 'street' ? value : getValues("street");

        const provinceObj = provinces.find(p => p.Code === province);
        const districtObj = districts.find(d => d.Code === district);
        const wardObj = wards.find(w => w.Code === ward);

        if (field === 'province') {
            if (provinceObj) {
                setDistricts(provinceObj.District || []);
                setValue("provinceName", provinceObj.FullName || '');
                setValue("district", '');
                setValue("districtName", '');
                setValue("ward", '');
                setValue("wardName", '');
                setWards([]);
            }
        } else if (field === 'district') {
            if (districtObj) {
                setWards(districtObj.Ward || []);
                setValue("districtName", districtObj.FullName || '');
                setValue("ward", '');
                setValue("wardName", '');
            }
        } else if (field === 'ward') {
            if (wardObj) {
                setValue("wardName", wardObj.FullName || '');
            }
        }

        const provinceName = provinceObj?.FullName || '';
        const districtName = districtObj?.FullName || '';
        const wardName = wardObj?.FullName || '';

        const addressParts = [];
        if (street) addressParts.push(street);
        if (wardName) addressParts.push(wardName);
        if (districtName) addressParts.push(districtName);
        if (provinceName) addressParts.push(provinceName);

        if (addressParts.length > 0) {
            setValue("fullAddress", addressParts.join(', '));
        }
    };

    return { provinces, districts, wards, isLoading, handleFieldChange };
}