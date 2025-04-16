"use client"

import {usePathname} from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Image from "next/image";
import {shouldHideComponent} from "@/app/utils/hideComponents";
import {grey} from "@mui/material/colors";

export default function Footer() {
    const pathName = usePathname();
    if (shouldHideComponent(pathName)) {
        return null;
    }
    return (
        <Box bgcolor='white' padding={{ xs: 3, md: 4, lg: 6}} minHeight={250} marginTop={3}>
            <Box display="flex"
                 justifyContent="space-evenly"
                 flexDirection={{ xs: 'column', md: 'row'}}
                 gap={{ xs: 4, md: 0}}
                 alignItems="flex-start"
            >
                    <Box position='relative' width='10%' height='auto' sx={{ aspectRatio: '2/1'}}>
                        <Image
                            src="/logoipsum-332.svg"
                            alt="logo"
                            fill
                            style={{ objectFit: "contain" }}
                            priority
                            quality={75}
                            loading='eager'
                        />
                    </Box>
                    <Box>
                        <Typography variant="h6" color='textPrimary' marginBottom={1}>Tìm hiểu thêm</Typography>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Link variant="body2" color={grey[800]} underline="hover">Giới thiệu về chúng tôi</Link>
                            <Link variant="body2" color={grey[800]} underline="hover">Chính sách bảo mật và bảo vệ thông tin cá nhân</Link>
                            <Link variant="body2" color={grey[800]} underline="hover">Tin tức</Link>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h6" color='textPrimary' marginBottom={1}>Hỗ trợ khách hàng</Typography>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Link variant="body2" color={grey[800]} underline="hover">Hướng dẫn mua hàng online</Link>
                            <Link variant="body2" color={grey[800]} underline="hover">Phương thức thanh toán</Link>
                            <Link variant="body2" color={grey[800]} underline="hover">Chính sách giao hàng</Link>
                            <Link variant="body2" color={grey[800]} underline="hover">Chính sách đổi trả</Link>
                            <Link variant="body2" color={grey[800]} underline="hover">Chương trình khách hàng thân thiết</Link>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h6" color='textPrimary' marginBottom={1}>Mạng xã hội</Typography>
                        <Typography variant="h6" marginBottom={1}>Hình thức thanh toán</Typography>
                    </Box>
                </Box>
        </Box>
    )
}