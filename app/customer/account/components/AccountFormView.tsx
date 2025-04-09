
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


interface AccountFormViewProps {
    loading: boolean;
    isEditing: boolean;
    updating: boolean;
    formData: {
        username: string;
        phoneNumber: string;
        email: string;
        gender: string;
        birthday: string;
    }
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleGenderChange: (value: string) => void;
    toggleEdit: () => void;
    cancelEdit: () => void;
}

export const AccountFormView = ({
    loading,
    isEditing,
    updating,
    formData,
    handleChange,
    handleGenderChange,
    toggleEdit,
    cancelEdit
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
                <Stack component="form" spacing={2}>
                    <Box display="flex" alignItems="center">
                        <Typography variant="body1" width={240} paddingTop={1}>Họ và tên đầy đủ</Typography>
                        <TextField
                            fullWidth
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    readOnly: !isEditing,
                                }
                            }}
                            aria-label={formData.username}
                            variant="outlined"
                        />
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Typography variant="body1" width={240} paddingTop={1}>Số điện thoại</Typography>
                        <TextField
                            fullWidth
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    readOnly: !isEditing,
                                }
                            }}
                            aria-label={formData.phoneNumber}
                            variant="outlined"
                        />
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Typography variant="body1" width={240} paddingTop={1}>Email</Typography>
                        <TextField
                            fullWidth
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    readOnly: true,
                                }
                            }}
                            aria-label={formData.email}
                            variant="outlined"
                        />
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Typography variant="body1" width={240} paddingTop={1}>Email</Typography>
                        <FormControl fullWidth>
                            <InputLabel>Giới tính</InputLabel>
                            <Select
                                value={formData.gender}
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
                            fullWidth
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    readOnly: !isEditing,
                                }
                            }}
                            variant="outlined"
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
