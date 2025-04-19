export const paymentMethodMap = {
    'COD': {
        display: "Thanh toán khi nhận hàng",
    },
    "Bank transfer": {
        display: "Chuyển khoản ngân hàng",
    },
    "QR Pay": {
        display: 'Thanh toán qua mã QR của VNPay'
    }
}
export const orderStatusMap = {
        "pending": {
            display: 'Đang xử lý',
            color: "warning" as const,
        },
        'paid': {
            display: "Đã thanh toán",
            color: "success" as const,
        },
        'cancelled': {
            display: "Đã hủy",
            color: "error" as const,
        },
        'default': {
            display: 'N/A',
            color: 'info' as const,
        }
}


export const shippingMethodMap = {
    "standard": {
        display: "Giao hàng tiêu chuẩn"
    },
    "pickup": {
        display: "Nhận tại cửa hàng"
    },
}

export const getStatusDisplay = (status: string) => {
    return orderStatusMap[status as keyof typeof orderStatusMap]?.display || status;
}
export const getStatusColor = (status: string) => {
    return orderStatusMap[status as keyof typeof orderStatusMap]?.color || 'info';
}


export type PaymentMethod = keyof typeof paymentMethodMap;
export type OrderStatus = keyof typeof orderStatusMap;
export type ShippingMethod = keyof typeof shippingMethodMap;