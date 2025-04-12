import { useEffect, useState } from 'react';
import { Province, District, Ward } from '@/app/types/address';

export const useAddressData = () => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                // Chuẩn bị lấy dữ liệu từ file JSON
                const addressData = await import('@/public/vietnam_addresses.json');
                const cleanedProvinces: Province[] = (addressData.default as Province[]).map(province => ({
                    ...province,
                    District: (province.District || []).map(district => ({
                        ...district,
                        Ward: district.Ward ?? [],
                    }))
                }));
                setProvinces(cleanedProvinces);
            } catch (error) {
                console.error('Error loading address data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    // Lấy dữ liệu huyện/thị xã tương ứng với tỉnh
    const getDistricts = (provinceCode: string): District[] => {
        return provinces.find(p => p.Code === provinceCode)?.District || [];
    };

    // Lấy dữ liệu xã/phường tương ứng với huyện
    const getWards = (provinceCode: string, districtCode: string): Ward[] => {
        const districts = getDistricts(provinceCode);
        return districts.find(d => d.Code === districtCode)?.Ward || [];
    };

    // Lấy dữ liệu tỉnh thành của Việt Nam qua code tương ứng trong file JSON
    const getProvinceByCode = (code: string): Province | undefined => provinces.find(p => p.Code === code);
    const getDistrictByCode = (provinceCode: string, districtCode: string): District | undefined =>
        getDistricts(provinceCode).find(d => d.Code === districtCode);
    const getWardByCode = (provinceCode: string, districtCode: string, wardCode: string): Ward | undefined =>
        getWards(provinceCode, districtCode).find(w => w.Code === wardCode);

    return {
        provinces,
        isLoading,
        getDistricts,
        getWards,
        getProvinceByCode,
        getDistrictByCode,
        getWardByCode,
    };
};
