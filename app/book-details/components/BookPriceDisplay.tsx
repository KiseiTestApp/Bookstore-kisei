import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import theme from "@/app/theme";
import React from "react";

export default function BookPriceDisplay({title, normalPrice, discountedPrice}: {
    title: string,
    normalPrice: number,
    discountedPrice: number
}) {
    const discountPercent = Math.round(1-discountedPrice/normalPrice) * 100
    return (
        <Box padding={2} bgcolor='white' borderRadius="md">
            <Typography variant="h6" fontWeight={500}>{title}</Typography>
            {discountedPrice > 0 ? (
                <>
                    <Typography variant="h4" color={theme.palette.primary.main} fontWeight={500}>
                        {discountedPrice.toLocaleString('vi-VN')} VND
                        <span className="mx-3 p-1 rounded-sm bg-emerald-700 text-gray-50 text-sm">
                                        -{discountPercent}%
                        </span>
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
