import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Icon from "@mdi/react";
import {mdiHandCoin, mdiPackageCheck, mdiTruckFast} from "@mdi/js";
import Divider from "@mui/material/Divider";
import React from "react";
import {grey} from "@mui/material/colors";

export default function BookImage({imageUrl, title} : {imageUrl: string, title: string}) {
    const iconColor = grey[500];
    return (
        <Box>
            <Image
                src={imageUrl || "No image found"}
                alt={title || 'No image found'}
                width={600}
                height={600}
                priority={true}
            />

            <Box marginTop={2.5}>
                <Typography variant="body1" color="textPrimary" className="font-bold">An tâm mua sắm với những đặc quyền sau:</Typography>
                {[
                    { icon: mdiPackageCheck, text: "Được mở hộp kiểm tra khi nhận hàng" },
                    { icon: mdiHandCoin, text: "Hoàn tiền 100% giá nếu sách bị hư hỏng" },
                    { icon: mdiTruckFast, text: "Thời gian giao nhanh và uy tín" }
                ].map(({ icon, text }, idx) => (
                    <React.Fragment key={idx}>
                        <Typography variant="body2" className="flex items-center gap-3 py-2">
                            <Icon path={icon} size={1} color={iconColor} /> {text}
                        </Typography>
                        <Divider />
                    </React.Fragment>
                ))}
            </Box>
        </Box>
    )
}