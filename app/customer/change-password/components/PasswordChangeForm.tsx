"use client"

import {useState} from "react";
import {TextField, Box, Button, CircularProgress, Typography} from "@mui/material";
import {useAuth} from "@/app/context/AuthProviderContext";
import {useSnackbar} from "@/app/context/SnackbarContext";

export default function PasswordChangeForm() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const {changePassword} = useAuth();
    const {showSnackbar} = useSnackbar();


    //
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const result = await changePassword(currentPassword, newPassword, confirmPassword);
            if (result.success) {
                setSuccess(true);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('')
                showSnackbar("Đổi mật khẩu thành công", "success")
            } else {
                setError(true);
            }
        } catch (error: any) {
            console.error("Error changing password", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }


    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Box marginBottom={2}>
                <Box display="flex" alignItems="center">
                    <Typography width={240}>Mật khẩu hiện tại*</Typography>
                    <TextField
                        type="password"
                        fullWidth
                        margin="normal"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </Box>
                <Box display="flex" alignItems="center">
                    <Typography width={240}>Mật khẩu mới</Typography>
                    <TextField
                        type="password"
                        fullWidth
                        margin="normal"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </Box>
                <Box display="flex" alignItems="center">
                    <Typography width={240}>Xác nhận mật khẩu</Typography>
                    <TextField
                        type="password"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Box>
            </Box>
            <Box display="flex" justifyContent="center">
                <Button type="submit" variant="contained" disabled={loading} sx={{ width: '40%' }} >
                    {loading ? (
                        <Box display="flex" alignItems="center">
                            <CircularProgress size={24} color="inherit" sx={{ marginRight: 2}} />
                            <Typography color="textDisabled">Đang xử lý</Typography>
                        </Box>
                    ) : (
                        <Typography>Đổi mật khẩu</Typography>
                    )}
                </Button>
            </Box>
        </Box>
    )
}