import {
    Box,
    Typography,
} from "@mui/material";
import UsersTable from "@/app/admin/users/components/UsersTable";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Quản lý khách hàng'
}


export default function Users() {
    return (
        <Box marginY={6} marginX={3}>
            <Typography variant="h5" gutterBottom textTransform="uppercase">Khách hàng</Typography>
            <Box marginY={2}>
                <UsersTable />
            </Box>
        </Box>
    )
}