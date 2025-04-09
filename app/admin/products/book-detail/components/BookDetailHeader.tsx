import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import KeyboardBackspace from '@mui/icons-material/KeyboardBackspace';
import {useRouter} from 'next/navigation';

interface BookDetailHeaderProps {
    onSave?: () => void;
    onCancel?: () => void;
    onEdit?: () => void;
    isEditing: boolean;
    isLoading?: boolean;
    isDirty?: boolean;
}

export default function BookDetailHeader({ onCancel, onEdit, isLoading = false, isEditing, isDirty = false}: BookDetailHeaderProps) {
    const router = useRouter();
    return (
        <Box className="flex justify-between sticky top-0 z-10 bg-gray-100 py-6">
            <Box display="flex" alignItems="center" gap={2}>
                <IconButton onClick={() => router.back()}>
                    <KeyboardBackspace />
                </IconButton>
                <Typography variant="h6">Cập nhật sách</Typography>
            </Box>
            <Stack spacing={2} direction="row">
                {isEditing ? (
                    <>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={isLoading || !isDirty}
                            startIcon={isLoading ? <CircularProgress size={20} /> : null}
                        >
                            {isLoading ? "Đang lưu..." : "Lưu"}
                        </Button>
                        <Button
                            variant="outlined"
                            color="neutral"
                            disabled={isLoading}
                            onClick={onCancel}
                        >
                            Hủy
                        </Button>
                    </>
                    ) : (
                        <Button variant="contained" onClick={onEdit}>
                            Chỉnh sửa
                        </Button>
                )}
            </Stack>
        </Box>
    )
}