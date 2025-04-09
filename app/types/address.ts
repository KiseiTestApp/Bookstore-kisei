// Xã
export interface Ward {
    Code: string;
    FullName: string;
    DistrictCode: string;
}

// Huyện
export interface District {
    Code: string;
    FullName: string;
    ProvinceCode: string;
    Ward: Ward[];
}

// Tỉnh/thành phố
export interface Province {
    Code: string;
    FullName: string;
    District: District[];
}

// Địa chỉ
export interface AddressSelection {
    street: string;
    province: string;
    district: string;
    ward: string;
    fullAddress: string;
}