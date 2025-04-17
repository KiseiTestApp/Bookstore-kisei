
import Box from '@mui/material/Box'
import dynamic from "next/dynamic";
const FormCreateBook = dynamic(() => import('@/app/admin/products/components/FormCreateBook'), {
    ssr: false,
})

export default function Page() {
    return (
        <Box className="h-full w-full" padding={6}>
            <FormCreateBook />
        </Box>
    )
}