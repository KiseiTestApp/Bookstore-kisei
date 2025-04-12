"use client"

import {usePathname} from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import theme from "@/app/theme";
import Image from "next/image";

export default function Footer() {
    const pathName = usePathname();
    const EXCLUDED_PATHS = [
        "/account/sign-in",
        "/account/sign-up",
        "/no-access",
        "/404",
        "/_not-found",
    ]
    const shouldHideFooter = (pathname: string) => {
        return EXCLUDED_PATHS.includes(pathname) || pathname.startsWith("/admin");
    }

    if (shouldHideFooter(pathName)) {
        return null;
    }
    return (
        <Box bgcolor={theme.palette.primary.main} padding={{ xs: 3, md: 4, lg: 6}}>
            <Box display="flex"
                 justifyContent="space-evenly"
                 flexDirection={{ xs: 'column', md: 'row'}}
                 gap={{ xs: 4, md: 0}}
                 alignItems="flex-start"
            >
                    <Image
                        src="/logoipsum-332.svg"
                        alt="logo"
                        width={105.6}
                        height={52.9}
                    />
                    <Box>
                        <Typography variant="h6" color="white" marginBottom={1}>Tìm hiểu thêm</Typography>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Link variant="body2" color={theme.palette.primary.contrastText} underline="hover">Giới thiệu về chúng tôi</Link>
                            <Link variant="body2" color={theme.palette.primary.contrastText} underline="hover">Chính sách bảo mật và bảo vệ thông tin cá nhân</Link>
                            <Link variant="body2" color={theme.palette.primary.contrastText} underline="hover">Tin tức</Link>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h6" color="white" marginBottom={1}>Hỗ trợ khách hàng</Typography>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Link variant="body2" color={theme.palette.primary.contrastText} underline="hover">Hướng dẫn mua hàng online</Link>
                            <Link variant="body2" color={theme.palette.primary.contrastText} underline="hover">Phương thức thanh toán</Link>
                            <Link variant="body2" color={theme.palette.primary.contrastText} underline="hover">Chính sách giao hàng</Link>
                            <Link variant="body2" color={theme.palette.primary.contrastText} underline="hover">Chính sách đổi trả</Link>
                            <Link variant="body2" color={theme.palette.primary.contrastText} underline="hover">Chương trình khách hàng thân thiết</Link>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h6" color="white" marginBottom={1}>Mạng xã hội</Typography>
                        <Box position="relative" width={24} height={24} marginY={2}>
                            <Image src="/footer_svg/facebook-svgrepo-com.svg" alt="Facebook" fill color="white" />
                        </Box>
                        <Typography variant="h6" color="white" marginBottom={1}>Hình thức thanh toán</Typography>
                    </Box>
                </Box>
        </Box>
    )
}