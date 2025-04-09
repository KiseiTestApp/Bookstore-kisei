import {Box, Typography} from "@mui/material";
import Breadcrumb from "@/app/components/Breadcrumb";
import CartContent from "@/app/cart/component/CartContent";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Giỏ hàng',
    description: "Quản lý giỏ hàng của bạn",
}

export default function CartPAge() {
    return (
        <Box margin={4} padding={2}>
            <Typography variant="h5" color="textPrimary" sx={{ textTransform: "uppercase"}}>
                Giỏ hàng
            </Typography>
            <Breadcrumb />
            <Box marginTop={1.5}>
                <CartContent />
            </Box>
        </Box>
    )
}