import {Timestamp} from "firebase/firestore";

// Khách hàng
interface CustomerData {
    customer_name: string;
    customer_phone: string;
    customer_email: string;
}

// Địa chỉ
interface AddressData {
    province: string;
    provinceName: string;
    district: string;
    districtName: string;
    ward: string;
    wardName: string;
    street: string;
    fullAddress?: string;
}

// Sản phảm trong đơn hàng
interface OrderItems {
    bookId: string;
    title: string;
    price: number;
    discounted: number;
    subtotal: number;
    imageUrl: string;
    quantity: number;
}

export interface OrderFormData {
    customer: CustomerData;
    shippingAddress: AddressData;
    shippingMethod: "standard" | "pickup";
    paymentMethod: "COD" | "Bank transfer" | 'QR Pay';
    status: "pending";
    note: string;
}

// Đơn hàng
export interface OrderDocument {
    orderId?: string;
    customer: CustomerData;
    shippingAddress: AddressData;
    items: OrderItems[];
    totalPrice: number;
    createdAt: Timestamp;
    status: "pending" | "paid" | "cancelled";
    shippingMethod: "standard" | "pickup";
    paymentMethod: "COD" | "Bank transfer" | 'QR Pay';
    userId?: string;
    updatedAt?: Timestamp;
    note: string;
}