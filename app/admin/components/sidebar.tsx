"use client"

import React from "react";
import Container from "@mui/material/Container";
import IconLinkList from "@/app/components/IconLinkList";
import {signOut} from "firebase/auth";
import {auth} from "@/lib/firebase/config";
import {useRouter} from "next/navigation";
import {Button} from "@mui/material";
import ExittoIcon from "@mui/icons-material/ExitToApp";
import {Box} from "@mui/system";
import Image from "next/image";


export default function Sidebar(){
    const router = useRouter();
    const handleSignout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out");
            router.push("/admin/sign-in");
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    }
    return (
        <Box className="flex flex-col gap-7 bg-white py-5 h-screen sticky top-0 overflow-y-auto ">
            <div className="relative z-10">
                <Image
                    src="/logoipsum-332.svg"
                    alt="logo"
                    fill
                />
            </div>
            <Container>
                <IconLinkList />
            </Container>
            <div className="flex px-5 justify-center mt-auto w-full items-end">
                <Button
                    variant="outlined"
                    size="large"
                    color="secondary"
                    onClick={handleSignout}
                    startIcon={<ExittoIcon />}
                    fullWidth
                >Đăng xuất</Button>
            </div>
        </Box>
    );
}