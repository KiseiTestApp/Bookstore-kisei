import { useState, useEffect } from 'react';
import { Province, District, Ward } from "@/app/types/address";
import {AddressFormValues} from "@/app/customer/address/components/AddressForm";

export function useAddressData(name: string, setValue: any, getValues: any, initialData?: AddressFormValues) {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const baseName = name || '';

    const provinceValue = getValues(`${name}.province`);
    const districtValue = getValues(`${name}.district`);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const addressData = await import('@/public/vietnam_addresses.json');
                setProvinces(addressData.default as Province[]);
                if (initialData?.province) {
                    const provinceObj = (addressData.default as Province[]).find(p => p.Code === initialData.province);
                    if (provinceObj) {
                        setDistricts(provinceObj.District || []);
                        setValue(`${name}.provinceName`, provinceObj.FullName);
                        
                        if (initialData.district) {
                            const districtObj = provinceObj.District.find(d => d.Code === initialData.district);
                            if (districtObj) {
                                setWards(districtObj.Ward || []);
                                setValue(`${name}.districtName`, districtObj.FullName);

                                if (initialData.ward) {
                                    const wardObj = districtObj.Ward.find(w => w.Code === initialData.ward);
                                    if (wardObj) {
                                        setValue(`${name}.wardName`, wardObj.FullName);
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
    }, [initialData, name, setValue]);

    useEffect(() => {
        if (provinceValue) {
            const provinceObj = provinces.find(p => p.Code === provinceValue);
            setDistricts(provinceObj?.District || []);
            setWards([]);
            setValue(`${name}.district`, '');
            setValue(`${name}.ward`, '');
            if (provinceObj) {
                setValue(`${baseName}provinceName`, provinceObj.FullName);
            }
        } else {
            setDistricts([]);
            setWards([]);
        }
    }, [provinceValue, provinces, name, setValue, baseName]);

    useEffect(() => {
        if (districtValue) {
            const districtObj = districts.find(d => d.Code === districtValue);
            setWards(districtObj?.Ward || []);
            setValue(`${name}.ward`, '');
            if (districtObj) {
                setValue(`${baseName}districtName`, districtObj.FullName);
            }
        }
    }, [baseName, districtValue, districts, name, setValue]);

    const handleFieldChange = (field: string, value: string) => {

        setValue(`${baseName}${field}`, value);

        const province = getValues(`${baseName}province`);
        const district = getValues(`${baseName}district`);
        const ward = getValues(`${baseName}ward`);
        const street = getValues(`${baseName}street`);

        const provinceObj = provinces.find(p => p.Code === province);
        const districtObj = districts.find(d => d.Code === district);
        const wardObj = wards.find(w => w.Code === ward);

        if (field === 'province') {
            setValue(`${baseName}provinceName`, provinceObj?.FullName || '');
            setValue(`${baseName}district`, '');
            setValue(`${baseName}districtName`, '');
            setValue(`${baseName}ward`, '');
            setValue(`${baseName}wardName`, '');
        } else if (field === 'district') {
            setValue(`${baseName}districtName`, districtObj?.FullName || '');
            setValue(`${baseName}ward`, '');
            setValue(`${baseName}wardName`, '');
        } else if (field === 'ward') {
            setValue(`${baseName}wardName`, wardObj?.FullName || '');
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
            setValue(`${baseName}fullAddress`, addressParts.join(', '));
        }
    };

    return { provinces, districts, wards, isLoading, handleFieldChange };
}