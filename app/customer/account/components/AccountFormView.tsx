
import {
    Box,
    CircularProgress,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button
} from "@mui/material";
import Stack from "@mui/material/Stack";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {UseFormRegister, FieldErrors} from 'react-hook-form'

interface AccountFormViewProps {
    loading: boolean;
    isEditing: boolean;
    updating: boolean;
    register: UseFormRegister<{
        username: string;
        phoneNumber: string;
        email: string;
        gender: string;
        birthday: string;
    }>
    errors: FieldErrors<{
        username: string;
        phoneNumber: string;
        email: string;
        gender: string;
        birthday: string;
    }>
    handleGenderChange: (value: string) => void;
    toggleEdit: () => void;
    cancelEdit: () => void;
    handleSubmit: () => void;
}

export const AccountFormView = ({
    loading,
    isEditing,
    updating,
    register,
    errors,
    handleGenderChange,
    toggleEdit,
    cancelEdit,
    handleSubmit,
}: AccountFormViewProps) => {
    if (loading) {
        return (
            <Box className="flex" justifyContent="center" alignItems="center">
                <CircularProgress color="secondary" />
            </Box>
        )
    }
    return (
        <Box>
            <Typography variant="h6">Thông tin tài khoản</Typography>
            <Box marginTop={4}>
                <Stack component="form" spacing={2} onSubmit={handleSubmit}>
                    <Box display="flex" alignItems="center">
                        <Typography variant="body1" width={240} paddingTop={1}>Họ và tên đầy đủ</Typography>
                        <TextField
                            {...register('username')}
                            fullWidth
                            name="username"
                            slotProps={{
                                input: {
                                    readOnly: !isEditing,
                                }
                            }}
                            variant="outlined"
                            error={!!errors.username}
                            helperText={errors.username?.message}
                        />
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Typography variant="body1" width={240} paddingTop={1}>Số điện thoại</Typography>
                        <TextField
                            {...register('phoneNumber')}
                            fullWidth
                            name="phoneNumber"
                            slotProps={{
                                input: {
                                    readOnly: !isEditing,
                                }
                            }}
                            variant="outlined"
                            error={!!errors.phoneNumber}
                            helperText={errors.phoneNumber?.message}
                        />
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Typography variant="body1" width={240} paddingTop={1}>Email</Typography>
                        <TextField
                            {...register('email')}
                            fullWidth
                            name="email"
                            slotProps={{
                                input: {
                                    readOnly: true,
                                }
                            }}
                            variant="outlined"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Typography variant="body1" width={240} paddingTop={1}>Email</Typography>
                        <FormControl fullWidth>
                            <InputLabel>Giới tính</InputLabel>
                            <Select
                                {...register('gender')}
                                onChange={(e => handleGenderChange(e.target.value as string))}
                                disabled={!isEditing}
                                variant="outlined"
                            >
                                <MenuItem value="male">Nam</MenuItem>
                                <MenuItem value="female">Nữ</MenuItem>
                                <MenuItem value="other">Khác</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Typography variant="body1" width={240} paddingTop={1}>Ngày sinh</Typography>
                        <TextField
                            {...register('birthday')}
                            fullWidth
                            type="date"
                            name="birthday"
                            slotProps={{
                                input: {
                                    readOnly: !isEditing,
                                }
                            }}
                            variant="outlined"
                            error={!!errors.birthday}
                            helperText={errors.birthday?.message}
                        />
                    </Box>
                </Stack>
                <Stack spacing={2} marginTop={4} direction="row">
                    <Button
                        variant="contained"
                        size="large"
                        onClick={toggleEdit}
                        startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                        disabled={updating}
                    >
                        {updating ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : isEditing ? (
                            "Lưu thay đổi"
                        ) : (
                            "Chỉnh sửa"
                        )}
                    </Button>
                    {isEditing && (
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={cancelEdit}
                            disabled={updating}
                        >
                            Hủy bỏ
                        </Button>
                    )}
                </Stack>
            </Box>
        </Box>
    );
};
