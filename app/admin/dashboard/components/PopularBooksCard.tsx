
import { fetchPopularBooks } from '@/app/utils/dashboard/fetchPopularBooks';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import Paper from "@mui/material/Paper";
import Divider from '@mui/material/Divider';
import Tooltip from "@mui/material/Tooltip";
import {RankingAvatar} from "@/app/admin/dashboard/components/RankingAvatar";

export default async function PopularBooksCard() {
    const popularBooks = await fetchPopularBooks(5);

    return (
        <Box component={Paper} padding={2}>
            <Typography variant="h6">Top sách bán chạy</Typography>
            <Divider sx={{ marginY: 2}} />
            {popularBooks.map((book, index) => (
                <Grid key={book.id} container columns={4} spacing={1} paddingY={1} alignItems="center">
                    <Grid size={1}>
                        <Image
                            src={book.imageUrl || ''}
                            alt={book.title}
                            width={60}
                            height={60}
                        />
                    </Grid>
                    <Grid size={2}>
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-start"
                            justifyContent="center"
                            overflow="hidden"
                        >
                            <Tooltip title={book.title}>
                                <Typography
                                    variant="subtitle2"
                                    whiteSpace="nowrap"
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                    width='100%'
                                    color="textPrimary">
                                    {book.title}
                                </Typography>
                            </Tooltip>
                            <Typography variant="subtitle2" color="textSecondary">Đã bán: {book.quantity_bought}</Typography>
                        </Box>
                    </Grid>
                    <Grid size={1} display="flex" alignItems="center" justifyContent="center">
                        <RankingAvatar rank={index+1}>
                            {index + 1}
                        </RankingAvatar>
                    </Grid>
                </Grid>
            ))}
        </Box>
    );
}