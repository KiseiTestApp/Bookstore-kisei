
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import BooksTableView from "@/app/admin/products/components/BooksTableView";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: `Quản lý sách`
}

export default function Products() {
    return (
        <Box marginY={6} marginX={3}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h5" gutterBottom textTransform="uppercase">Sản phẩm</Typography>
                <Button
                    variant="contained" href="/admin/products/form"
                >Thêm sản phẩm</Button>
            </Box>
            <Box marginY={2}>
                <BooksTableView />
            </Box>
        </Box>
    );
}