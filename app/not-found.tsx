
import Link from 'next/link'
import Image from 'next/image'
import {Box, Button, Typography} from "@mui/material";
import {VisibilityOff} from "@mui/icons-material";
import {ChevronLeft} from "@mui/icons-material";

export default function NotFound() {
    return (
    <Box sx={{ position: 'relative', width: '100dvw', height: '100dvh', overflowY: 'hidden', margin: 0, padding: 0 }}>
            <Image
                src="/charlesdeluvio-pcZvxrAyYoQ-unsplash.jpg"
                alt="404 image"
                fill={true}
                style={{

                    objectPosition: 'center',
                    zIndex: 1,

                }}
            />
            <Box position="absolute" top="50%" left="50%" zIndex={2} sx={{ transform: 'translate(-50%, -50%)' }} padding={2} textAlign="center">
                <VisibilityOff className="text-gray-300" sx={{ fontSize: 48}} />
                <Typography variant="h5" className="text-neutral-50" margin={2}>
                    Page not found
                </Typography>
                <Typography variant="body1" className="text-neutral-100" width={400} marginBottom={2}>
                    Trang bạn tìm kiếm không thể tìm thấy. Điều này có thể do trang đã bị xóa, bị đổi tên hoặc tạm thời không thể truy cập.
                </Typography>
                <Button variant="contained" color="primary" style={{ borderRadius: '20px' }}>
                    <ChevronLeft />
                    <Link href="/">Quay trở về trang chủ</Link>
                </Button>
            </Box>
        </Box>
    )
}