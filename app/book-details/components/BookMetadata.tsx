import { Book } from '@/app/types/book';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import React from "react";

export default function BookMetadata({ book }: { book: Book }) {
    const details = [
        {label: 'Tác giả', value: book.author},
        {label: 'Nhà xuất bản', value: book.publisher},
        {label: 'Năm xuất bản', value: book.publishYear},
        {label: 'Thể loại', value: book.genre},
    ]
    return (
        <Box bgcolor='white' borderRadius="md" padding={2}>
            <Typography variant="body1" color="textPrimary" fontWeight={600}>Thông tin chi tiết</Typography>
            <Box className="flex flex-col mt-4 gap-2">
                {details.map(({label, value}, index) => (
                    <React.Fragment key={index}>
                        <Grid container spacing={2}>
                            <Grid size={5}>
                                <Typography variant='body2' color='textSecondary'>
                                    {label}
                                </Typography>
                            </Grid>
                            <Grid size={5}>
                                <Typography variant='body2'>
                                    {value}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                    </React.Fragment>
                ))}
            </Box>
        </Box>
    )
}
