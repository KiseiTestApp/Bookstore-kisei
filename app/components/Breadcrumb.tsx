"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

const DynamicBreadcrumbs = ({lastLabel} : Record<any, string>) => {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(segment => segment);
    const crumbNameMapping: { [key: string]: string } = {
        checkout: 'Thanh toán',
        cart: "Giỏ hàng",
    };
    const breadcrumbs = segments.map((segment, index) => {
        const url = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;
        let formattedSegment = crumbNameMapping[segment]
            ? crumbNameMapping[segment]
            : segment.charAt(0).toUpperCase() + segment.slice(1);
        if (isLast && lastLabel) {
            formattedSegment = lastLabel;
        }
        return isLast ? (
            <Typography color="text.primary" key={url} >
                {formattedSegment}
            </Typography>
        ) : (
            <Link href={url} key={url} passHref>
                <Typography sx={{
                    transition: "color 0.2s ease-in-out",
                    '&:hover': {
                        color: 'primary.main',
                    }
                }}>
                    {formattedSegment}
                </Typography>
            </Link>
        );
    });

    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link href="/" passHref>
                <Typography sx={{
                    transition: "color 0.2s ease-in-out",
                    '&:hover': {
                        color: 'primary.main',
                    }
                }}>
                    Trang chủ
                </Typography>
            </Link>
            {breadcrumbs}
        </Breadcrumbs>
    );
};

export default DynamicBreadcrumbs;
