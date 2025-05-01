import type { Metadata } from 'next'
import {Box} from "@mui/material";


export const metadata: Metadata = {
    title: 'Sửa địa chỉ',
}

export default function AddressLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <Box>
            {children}
        </Box>
    )
}