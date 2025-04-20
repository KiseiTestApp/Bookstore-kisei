import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import theme from "@/app/theme";
import React from "react";
import {teal, grey} from "@mui/material/colors";

export default function BookPriceDisplay({title, normalPrice, discountedPrice}: {
    title: string,
    normalPrice: number,
    discountedPrice: number
}) {
    const discountPercent = Math.round((1 -discountedPrice/normalPrice) * 100)
    return (
        <Box padding={2} bgcolor='white' borderRadius="md">
            <Typography variant="h6" fontWeight={300}>{title}</Typography>
            {discountedPrice > 0 ? (
                <>
                    <Typography variant="h4" fontWeight={500} alignItems='center' display='flex' gap={2}>
                        {discountedPrice.toLocaleString('vi-VN')} VND
                        <Typography variant='body1' color={grey[200]} bgcolor={teal[700]} padding={0.3} borderRadius='15%' >
                            -{discountPercent}%
                        </Typography>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{textDecoration: 'line-through'}}>
                        {normalPrice.toLocaleString('vi-VN')} VND
                    </Typography>
                </>
            ): (
                <Typography variant="h4" color={theme.palette.primary.main} fontWeight={500}>
                    {normalPrice.toLocaleString('vi-VN')} VND
                </Typography>
            )}
        </Box>
    )
}
