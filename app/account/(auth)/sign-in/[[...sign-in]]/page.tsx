import SignIn from "@/app/account/(auth)/sign-in/[[...sign-in]]/components/SignIn";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Đăng nhập tài khoản',
    description: "Đăng nhập",
}

export default function SignInPage() {
    return (
        <div>
            <SignIn />
        </div>
    )
};