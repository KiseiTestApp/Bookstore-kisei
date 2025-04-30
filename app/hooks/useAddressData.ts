import { useState, useEffect } from 'react';
import { Province, District, Ward } from "@/app/types/address";

export function useAddressData(name: string, setValue: any, getValues: any) {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const provinceValue = getValues(`${name}.province`);
    const districtValue = getValues(`${name}.district`);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const addressData = await import('@/public/vietnam_addresses.json');
                setProvinces(addressData.default as Province[]);
            } catch (error) {
                console.error("Error loading data", error);
            } finally {
                setIsLoading(false);
            }
        };
        void loadData();
    }, []);

    useEffect(() => {
        if (provinceValue) {
            const provinceObj = provinces.find(p => p.Code === provinceValue);
            setDistricts(provinceObj?.District || []);
            setWards([]);
            setValue(`${name}.district`, '');
            setValue(`${name}.ward`, '');
        } else {
            setDistricts([]);
            setWards([]);
        }
    }, [provinceValue, provinces, name, setValue]);

    useEffect(() => {
        if (districtValue) {
            const districtObj = districts.find(d => d.Code === districtValue);
            setWards(districtObj?.Ward || []);
            setValue(`${name}.ward`, '');
        }
    }, [districtValue, districts, name, setValue]);

    const handleFieldChange = (field: string, value: string) => {
        const currentValues = getValues(name);
        const newValues = {
            ...currentValues,
            [field]: value
        };
        setValue(`${name}.${field}`, value);

        const provinceObj = provinces.find(p => p.Code === newValues.province);
        const districtObj = districts.find(d => d.Code === newValues.district);
        const wardObj = wards.find(w => w.Code === newValues.ward);

        if (field === 'province') {
            setValue(`${name}.provinceName`, provinceObj?.FullName || '');
            setValue(`${name}.district`, '');
            setValue(`${name}.ward`, '');
        }
        if (field === 'district') {
            setValue(`${name}.districtName`, districtObj?.FullName || '');
            setValue(`${name}.ward`, '');
        }
        if (field === 'ward') {
            setValue(`${name}.wardName`, wardObj?.FullName || '');
        }

        const addressParts = [
            newValues.street,
            wardObj?.FullName,
            districtObj?.FullName,
            provinceObj?.FullName
        ].filter(part => part && part.trim() !== ' ');
        setValue(`${name}.fullAddress`, addressParts.join(', '));
    };

    return { provinces, districts, wards, isLoading, handleFieldChange };
}