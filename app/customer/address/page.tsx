import {Metadata} from "next";
import AddressList from "@/app/customer/address/components/AddressList";

export const metadata: Metadata = {
    title: "Sổ địa chỉ | Read&Chill",
    description: "Quản lý địa chỉ giao hàng của bạn"
}

export default function AddressPage() {
    return (
        <AddressList />
    )
}