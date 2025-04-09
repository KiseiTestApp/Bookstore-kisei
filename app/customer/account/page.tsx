import {Metadata} from "next";
import AccountClientContent from "@/app/customer/account/components/AccountClientContent";

export const metadata: Metadata = {
    title: "Tài khoản",
    description: "Quản lý tài khoản cá nhân của bạn"
}

export default function AccountPage() {
    return (
        <div>
            <AccountClientContent />
        </div>
    )
}