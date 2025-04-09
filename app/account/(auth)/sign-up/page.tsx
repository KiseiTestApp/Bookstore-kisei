import SignUp from "@/app/account/(auth)/sign-up/components/SignUp";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Tạo tài khoản",
}

export default function SignUpPage() {
    return (
        <div>
            <SignUp />
        </div>
    )
}