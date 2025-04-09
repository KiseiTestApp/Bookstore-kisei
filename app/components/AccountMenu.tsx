"use client"

import {Menu, MenuItem, Typography, Box, ListItemText, ListItemIcon, Button} from "@mui/material";
import ManageAccounts from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {User} from "firebase/auth";
import {useRouter} from "next/navigation";

interface AccountMenuProps {
    user: User | null;
    anchorEl: HTMLElement | null;
    open: boolean;
    onCloseAction: () => void;
    onSignOutAction: () => void;
}
export default function AccountMenu({ user, anchorEl, open, onCloseAction, onSignOutAction }: AccountMenuProps) {
    const router = useRouter();
    return (
        <Menu
            id="account-menu"
            open={open}
            onClose={onCloseAction}
            anchorEl={anchorEl}
            slotProps={{
                paper: {
                    className: "w-64 max-w-full",
                },
            }}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            sx={{
                "& .MuiPaper-root" : {
                    width: {xs: '100%', sm: 'auto'},
                    maxWidth: {xs: 'calc(100%-32px)', sm: 'none'},
                }
            }}
        >
            {user ? [
                <Box key="sign-in-list">
                    <MenuItem key="greeting">
                        <ListItemText>
                            <Typography variant="body1" className="items-center justify-center">Xin chào, {user.displayName}</Typography>
                        </ListItemText>
                    </MenuItem>
                    <MenuItem key="profile" onClick={() => router.push('/customer/account')}>
                        <ListItemIcon>
                            <ManageAccounts fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                            Tài khoản của tôi
                        </ListItemText>
                    </MenuItem>
                    <MenuItem key="orders">
                        <ListItemIcon>
                            <ListAltIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                            Đơn hàng của tôi
                        </ListItemText>
                    </MenuItem>
                    <MenuItem key="log-out">
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText onClick={onSignOutAction}>
                            Thoát khỏi tài khoản
                        </ListItemText>
                    </MenuItem>
                </Box>
            ] : [
                <Box key="sign-out-list">
                    <MenuItem
                        onClick={onCloseAction}
                        className="w-full"
                        key="sign-in"
                    >
                        <Button fullWidth className="w-full" variant="contained" onClick={() => router.push("/account/sign-in")}>
                            Đăng nhập
                        </Button>
                    </MenuItem>
                    <MenuItem
                        onClick={onCloseAction}
                        className="w-full"
                        key="sign-up"
                    >
                        <Button fullWidth className="w-full" variant="outlined" onClick={() => router.push("/account/sign-up")}>
                            Đăng ký
                        </Button>
                    </MenuItem>
                </Box>
            ]}
        </Menu>
    )
}