

import {Typography, Box} from "@mui/material";
import OrderTableContainer from "@/app/admin/orders/components/OrderTableContainer";

export default function Page() {
        return (
            <Box marginX={3} marginY={6}>
                <Typography variant="h5" gutterBottom textTransform="uppercase">Đơn hàng</Typography>
                <Box marginY={2}>
                    <OrderTableContainer />
                </Box>
            </Box>
        );
}