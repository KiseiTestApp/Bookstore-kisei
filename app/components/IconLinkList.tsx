import React from 'react';
import Link from 'next/link';
import {usePathname} from "next/navigation";
import {useTheme} from "@mui/material/styles";
import Dashboard from "@mui/icons-material/Dashboard";
import People from "@mui/icons-material/People";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import ListAlt from "@mui/icons-material/ListAlt";
import Typography from "@mui/material/Typography";

interface MenuItem {
    name: string;
    link: string;
    icon: React.ReactNode;
}


export default function IconLinkList() {
    const menuList = [
        {
            name: "Tổng quan",
            link: "/admin/dashboard",
            icon: <Dashboard />
        },
        {
            name: "Quản lý khách hàng",
            link: "/admin/users",
            icon: <People />
        },
        {
            name: "Quản lý sản phẩm",
            link: "/admin/products",
            icon: <ShoppingCart />
        },
        {
            name: "Quản lý đơn hàng",
            link: "/admin/orders",
            icon: <ListAlt />
        },
    ];
    return (
        <ul className="flex flex-col gap-4">
            {menuList?.map((item, key) => {
                return <Tab item={item} key={key} />;
            })}
        </ul>
    );
    function Tab({ item } : { item: MenuItem }) {
        const theme = useTheme();
        const pathName = usePathname();
        const isSelected = item.link === '/admin' ? pathName === item.link : pathName.startsWith(item.link);
        return (
            <Link href={item?.link}>
                <ul
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium ease-soft-spring transition-all duration-300`}
                    style={{
                        backgroundColor: isSelected ? theme.palette.primary.main : "transparent",
                        color: isSelected ? theme.palette.primary.contrastText : theme.palette.text.secondary,
                    }}
                >

                {item?.icon}
                    <Typography
                        variant="body1"
                        style={{
                            color: isSelected ? theme.palette.primary.contrastText : theme.palette.text.secondary, textWrap: "nowrap",
                        }}
                    >
                        {item?.name}
                    </Typography>
                </ul>
            </Link>
        )
    }
}

