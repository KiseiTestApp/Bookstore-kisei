"use client"

import {deepPurple} from '@mui/material/colors';
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import {CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Avatar from "@mui/material/Avatar";
import React, {useEffect} from "react";
import {db} from '@/lib/firebase/config';
import {getCountFromServer, collection} from "@firebase/firestore";
import Skeleton from "@mui/material/Skeleton";

export default function UsersCountCard() {
    const purpleColorIcon = deepPurple[400];
    const purpleColorBackground = deepPurple[50];
    const [usersCount, setUsersCount] = React.useState<number>(0);
    const [loading, setLoading] = React.useState(true);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersRef = collection(db, "users");
                const usersSnapshot = await getCountFromServer(usersRef);
                const count = usersSnapshot.data().count;
                setUsersCount(count);
            } catch (error) {
                console.log("Error fetching books count", error);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    return (
        <Card>
            <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                    {loading ? (
                        <>
                            <Skeleton variant="text" width={150} height={24} />
                            <Skeleton variant="text" width={50} height={32} />
                        </>
                    ) : usersCount === 0? (
                        <Typography variant="body1">
                            Không có người dùng trên hệ thống
                        </Typography>
                    ) : (
                        <>
                            <Typography variant="body1" color="textSecondary">
                                Tổng số người dùng
                            </Typography>
                            <Typography variant="h6" color="textPrimary">{usersCount}</Typography>
                        </>
                    )}
                </Box>
                {loading ? (
                    <Skeleton variant="circular" width={40} height={40} />
                ) : (
                    <Avatar sx={{ bgcolor: purpleColorBackground }}>
                        <PeopleAltIcon sx={{ color: purpleColorIcon }} />
                    </Avatar>
                )}
            </CardContent>
        </Card>
    )
}