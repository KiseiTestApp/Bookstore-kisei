import {Timestamp} from "firebase/firestore";

// * Địa chỉ
export interface Address {
    id: string;
    street: string;
    province: string;
    district: string;
    ward: string;
    fullAddress: string;
    isDefault?: boolean;
}

// * Người dùng
export interface UserData {
    id: string;
    defaultAddress?: Address | null;
    username: string;
    email: string;
    phoneNumber?: string | null;
    createdAt?: Timestamp| Date;
    updatedAt?: Timestamp | Date;
}