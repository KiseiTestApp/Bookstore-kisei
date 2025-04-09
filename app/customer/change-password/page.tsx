import {Typography, Box} from "@mui/material";
import PasswordChangeForm from "@/app/customer/change-password/components/PasswordChangeForm";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Thay đổi mật khẩu'
}

export default function ChangePasswordPage() {
    return (
        <Box>
            <Typography variant="h6">Thay đổi mật khẩu</Typography>
            <PasswordChangeForm />
        </Box>
    )
}