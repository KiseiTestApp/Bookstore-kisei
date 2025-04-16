import {Alert, Box, Button, CircularProgress, Divider, Link, Rating, Typography} from "@mui/material";
import {useBookReviews} from "@/app/hooks/book/useBookReviews";
import {useAuth} from "@/app/context/AuthProviderContext";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import {auto} from "@popperjs/core";
import {ReviewForm} from "@/app/book-details/components/ReviewForm";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import {Timestamp} from "firebase/firestore";

type ReviewListProps = {
    bookId: string;
    averageRating: number;
    reviewCount: number;

}

export default function ReviewList({bookId, averageRating, reviewCount}: ReviewListProps) {
    const {reviews, isLoading, errors} = useBookReviews(bookId);
    const {user} = useAuth();
    const {openReviewDialog} = ReviewForm(bookId);
    if (isLoading) return <CircularProgress/>;
    if (errors) return <Alert severity='error'>Lỗi gặp phải khi tải đánh giá: {errors}</Alert>;

    const handleOpenDialog = () => {
        openReviewDialog();
    }

    return (
        <Box bgcolor='white' borderRadius='md' padding={2}>
            <Box>
                <Typography variant='h6' color='textPrimary'>Đánh giá sản phẩm</Typography>
                <Box display='flex' flexDirection='row' justifyContent='space-around' alignItems='center' paddingY={2}>
                    <Box textAlign='center'>
                        <Typography variant='h5'>
                            {averageRating}/5
                        </Typography>
                        <Rating
                            value={averageRating}
                            precision={0.5}
                            readOnly
                            emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize='inherit'/>}
                        />
                        <Typography variant='body2' color='textSecondary'>
                            ({reviewCount || 0} đánh giá)
                        </Typography>
                    </Box>
                    <Box>
                        {user ? (
                            <Button variant='outlined' sx={{ml: auto}} startIcon={<EditIcon/>}
                                    onClick={handleOpenDialog}>
                                Viết đánh giá
                            </Button>
                        ) : (
                            <Typography variant='body1' color='textPrimary'>
                                Vui lòng <Link href='/account/sign-in/' underline='hover'>đăng nhập</Link> hoặc <Link
                                href='/account/sign-up/' underline='hover'>đăng ký</Link> để viết đánh giá
                            </Typography>
                        )}
                    </Box>
                </Box>
                <Divider sx={{my: 2}}/>
                <Stack spacing={2}>
                    {reviews.map((review) => (
                        <Grid container key={review.id} spacing={4} paddingY={2}>
                            <Grid sx={{width: 200, flexShrink: 0}}>
                                <Typography variant='body1' color='textPrimary'>
                                    {review.displayName}
                                </Typography>
                                <Typography variant='body2' color='textSecondary'>
                                    {(review.createdAt instanceof Timestamp
                                            ? review.createdAt.toDate()
                                            : review.createdAt
                                    ).toLocaleDateString('vi-VN')}
                                </Typography>
                            </Grid>
                            <Grid>
                                <Rating value={review.review_rating} readOnly size='small'
                                        emptyIcon={<StarIcon opacity={0.55} fontSize='inherit'/>}/>
                                <Typography variant='body1'>
                                    {review.review_comment}
                                </Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Stack>
            </Box>
        </Box>
    )
}