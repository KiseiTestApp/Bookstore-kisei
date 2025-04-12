import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import theme from "@/app/theme";

export default function BookPriceDisplay({title, normalPrice, discountedPrice}: {
    title: string,
    normalPrice: number,
    discountedPrice: number
}) {
    const discountPercent = Math.round((normalPrice / discountedPrice) * 100) - 100;
    return (
        <Box padding={2} bgcolor='white' borderRadius="md">
            <Typography variant="h6" fontWeight={500}>{title}</Typography>
            <Box className="flex flex-row items-center gap-3 my-2">
                <Typography variant="h4"
                            color={theme.palette.primary.main}>{discountedPrice.toLocaleString('vi-VN')}đ</Typography>
                <span className="p-0.5 rounded-sm bg-emerald-500 text-gray-50 text-sm">
                    -{discountPercent}%
                </span>
                <Typography variant="body1" color="textSecondary">{normalPrice.toLocaleString('vi-VN')}đ</Typography>
            </Box>
        </Box>
    )
}
