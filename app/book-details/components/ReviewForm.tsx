'use client'

import {useForm} from "react-hook-form";
import {Rating, TextField, Box, Typography, Button} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {useDialog} from "@/app/context/DialogContext";
import {ReviewInput} from "@/app/types/review";
import {createReview} from "@/app/services/reviewService";
import theme from "@/app/theme";
import {useSnackbar} from "@/app/context/SnackbarContext";

export const ReviewForm = (bookId: string) => {
    const {confirmDialog} = useDialog();
    const {showSnackbar} = useSnackbar();
    const openReviewDialog = (onSuccess? : () => void) => {
        confirmDialog({
            title: 'Viết đánh giá sản phẩm',
            content: <ReviewFormContent bookId={bookId} showSnackbar={showSnackbar} onSuccess={onSuccess}  />,
            showConfirmButton: false,
            showCancelButton: false,
        })
    };
    return {openReviewDialog}
}

interface ReviewFormContentProps {
    bookId: string;
    showSnackbar: (message: string, type: 'success' | 'error') => void;
    onSuccess?: () => void;
}

const ReviewFormContent = ({bookId, showSnackbar, onSuccess} : ReviewFormContentProps) => {
    const {
        handleSubmit,
        register,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ReviewInput>({
        defaultValues: {
            bookId,
            review_rating: 0,
            review_comment: ''
        }
    });

    const rating = watch('review_rating');
    const onSubmit = async (data: ReviewInput) => {
        try {
            const result = await createReview(data)
            if (result.success) {
                showSnackbar('Gửi đánh giá thành công', 'success')
                onSuccess?.();
            }
        } catch (error) {
            console.error('Error creating review', error)
            showSnackbar('Đã gặp phải lỗi khi gửi đánh giá', 'error')
        }
    }
    return (
        <Box component='form' onSubmit={handleSubmit(onSubmit)} textAlign='center'>
            <Typography variant='h6' color='textPrimary'>
                Đánh giá của bạn
            </Typography>
            <Rating
                value={rating}
                onChange={(_, newValue) => {
                    setValue('review_rating', newValue || 0, {shouldValidate: true})
                }}
                precision={1}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <TextField
                {...register('displayName', {
                    required: 'Thông tin này quan trọng, Vui lòng không để trống'
                })}
                placeholder='Nhập tên sẽ hiển thị khi đánh giá'
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!errors.displayName}
                helperText={errors?.displayName?.message}
            />
            <TextField
                {...register('review_comment', {
                    required: 'Thông tin này quan trọng, Vui lòng không để trống'
                })}
                placeholder='Nhập nhận xét của bạn về sản phẩm'
                multiline
                rows={3}
                maxRows={6}
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!errors.review_comment}
                helperText={errors.review_comment?.message}
            />
            <Box marginTop={2}>
                <Button type='submit' variant='contained' fullWidth sx={{ backgroundColor: theme.palette.primary.main }}>
                    Gửi nhận xét
                </Button>
            </Box>
        </Box>
    )
}