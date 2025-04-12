"use client"

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import Person from "@mui/icons-material/Person";
import {useEffect, useState} from "react";
import {db} from "@/lib/firebase/config";
import {doc, onSnapshot} from "firebase/firestore";
import {usePathname, useRouter} from "next/navigation";
import {useAuth} from "@/app/context/AuthProviderContext";
import InlineSearch from "@/app/components/InlineSearchBar";
import AccountMenu from "@/app/components/AccountMenu";
import Box from "@mui/material/Box";
import Image from "next/image";
import {useMediaQuery, useTheme} from "@mui/material";


export default function Header() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [cartItemCount, setCartItemCount] = useState(0);
    const open = Boolean(anchorEl);
    const {user, logout} = useAuth();
    const router = useRouter();
    const pathName = usePathname();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    useEffect(() => {
        if (!user) return;
        const cartRef = doc(db, 'cart', user.uid);
        const unsubcribe = onSnapshot(cartRef, (cartDoc) => {
            if (cartDoc.exists()) {
                const cartData = cartDoc.data();
                setCartItemCount(cartData.items.length);
            } else {
                setCartItemCount(0);
            }
        });
        return () => unsubcribe();
    }, [user])

    const loggedInMenu = [
        {
            name: "Giỏ hàng",
            link: "/cart",
            icon: (
                <Badge badgeContent={cartItemCount} color="primary">
                    <ShoppingCartOutlined/>
                </Badge>
            ),
        },
    ];

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const EXCLUDED_PATHS = [
        "/account/sign-in",
        "/account/sign-up",
        "/no-access",
        "/404",
        "/_not-found",
    ]
    const shouldHideHeader = (pathname: string) => {
        return EXCLUDED_PATHS.some(path => pathname === path) ||
            pathname.startsWith("/admin");
    }

    if (shouldHideHeader(pathName)) {
        return null;
    }

    return (
        <nav
            className="py-4 px-4 sm:px-10 bg-white border-b border-b-neutral-100 flex flex-col md:flex-row items-center gap-4 md:gap-0">
            <div className="flex w-full md:w-auto justify-between items-center">
                <Image
                    src="/logoipsum-332.svg"
                    alt="logo"
                    width={isMobile ? 72 : 96}
                    height={isMobile ? 72 : 96}
                    onClick={() => router.push("/")}
                    className="cursor-pointer"
                />
                {isMobile && (
                    <Box display="flex" alignItems="center" gap={1}>
                        {(user ? loggedInMenu : loggedInMenu).map((item, index) => (
                            <Tooltip key={index} title={item.name} arrow>
                                <IconButton className="cursor-pointer" href={item.link}>
                                    {item.icon}
                                </IconButton>
                            </Tooltip>
                        ))}
                        <Tooltip title="Account" arrow>
                            <IconButton
                                onClick={handleClick}
                                className="cursor-pointer"
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                {user ? (
                                    <Avatar sx={{width: 32, height: 32}}>{user.displayName?.charAt(0)}</Avatar>
                                ) : (
                                    <Person/>
                                )}
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            </div>

            <Box width={isMobile ? '100%' : 'auto'} flexGrow={1} px={isMobile ? 0 : 6}>
                <InlineSearch isMobile={isMobile}/>
            </Box>

            {!isMobile && (
                <Box display="flex" alignItems="center" gap={3}>
                    {(user ? loggedInMenu : loggedInMenu).map((item, index) => (
                        <Tooltip key={index} title={item.name} arrow>
                            <IconButton className="cursor-pointer" href={item.link}>
                                {item.icon}
                            </IconButton>
                        </Tooltip>
                    ))}
                    <div>
                        <div>
                            <Tooltip title="Account" arrow>
                                <IconButton
                                    onClick={handleClick}
                                    className="cursor-pointer">
                                    {user ? (
                                        <Avatar sx={{width: 32, height: 32}}>{user.displayName?.charAt(0)}</Avatar>
                                    ) : (
                                        <Person/>
                                    )}
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </Box>
            )}
            <AccountMenu
                user={user}
                anchorEl={anchorEl}
                open={open}
                onCloseAction={handleClose}
                onSignOutAction={logout}
            />
        </nav>
    );
}