import AddressForm from "@/app/customer/address/components/AddressForm";
import {Typography, Box} from "@mui/material";

export default function AddAddressPage() {
    return (
        <Box>
            <Typography variant="h6" gutterBottom marginBottom={2}>Thêm địa chỉ mới</Typography>
            <AddressForm />
        </Box>
    )
}