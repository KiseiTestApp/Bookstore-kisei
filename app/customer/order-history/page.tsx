
import { OrderHistoryContainer } from "@/app/customer/order-history/components/OrderHistoryContainer";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Lịch sử đơn hàng",
}

export default function OrderHistoryPage() {
    return <OrderHistoryContainer />;
}