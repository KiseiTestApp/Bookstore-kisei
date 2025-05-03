
import {Box, Button, Typography} from "@mui/material";
import Image from "next/image";

export default function NoAccess() {
    return (
        <div className="relative flex h-screen w-full">
            <div className="absolute inset-0 brightness-50 z-0">
                <Image src='/matthew-henry-kX9lb7LUDWc-unsplash.jpg'
                     alt="random image"
                     className="w-full h-full object-cover" fill={true}
                />
            </div>
            <div className='relative flex flex-col items-center justify-center h-screen w-full sm:px-10 md:px-20 lg:px-40 text-center'>
                <Box display='flex' flexDirection='column' gap={2} maxWidth='600px'>
                    <Typography variant="h3" gutterBottom color="white">Xin lỗi bạn</Typography>
                    <Typography variant="h5" gutterBottom className="text-gray-200">Bạn không có quyền truy cập vào trang này. Vui lòng nhấn nút bên dưới để quay trở về trang chủ</Typography>
                    <Button
                        variant="contained"
                        href="/"
                        sx = {{
                            borderRadius: 28,
                            px: {xs: 2, sm: 3, md: 4},
                            py: {xs: 1, sm: 1.5, md: 1.8},
                    }}>
                        Trở về Trang chủ
                    </Button>
                </Box>
            </div>
        </div>
    );
}