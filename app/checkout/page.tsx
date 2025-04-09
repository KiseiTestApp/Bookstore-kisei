import CheckoutForm from "@/app/checkout/components/CheckoutForm";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Thanh toán đơn hàng",
}

export default function CheckoutPage() {
    return (
        <div>
            <CheckoutForm />
        </div>
    )
}