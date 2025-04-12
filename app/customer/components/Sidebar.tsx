// components/customer/Sidebar.tsx
'use client';

import { usePathname } from 'next/navigation';
import { List, ListItem, ListItemButton, ListItemText, useTheme } from '@mui/material';
import Link from 'next/link';

export default function CustomerSidebar() {
    const pathname = usePathname();
    const theme = useTheme();

    const navItems = [
        { name: 'Hồ sơ cá nhân', href: '/customer/account/' },
        { name: 'Sổ địa chỉ', href: '/customer/address/' },
        { name: 'Thay đổi mật khẩu', href: '/customer/change-password/' },
        { name: 'Lịch sử mua hàng', href: '/customer/order-history/' },
    ];

    return (
        <List sx={{ width: 250 }}>
            {navItems.map((item) => (
                <ListItem key={item.href} disablePadding>
                    <Link href={item.href} passHref legacyBehavior>
                        <ListItemButton
                            selected={pathname.startsWith(item.href)}
                            sx={{
                                '&.Mui-selected': {
                                    transition: 'ease-in-out',
                                    backgroundColor: `${theme.palette.primary.main}10`,
                                    color: theme.palette.primary.main,
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.hover,
                                    },
                                }
                            }}
                        >
                            <ListItemText
                                primary={item.name}
                                slotProps={{
                                    primary: {
                                        color: 'inherit',
                                    }
                                }}
                            />
                        </ListItemButton>
                    </Link>
                </ListItem>
            ))}
        </List>
    );
}