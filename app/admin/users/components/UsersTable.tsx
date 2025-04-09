"use client"

import { useEffect, useState } from "react";
import { fetchUsers, User } from "@/app/utils/account/fetchUsers";
import {
    Table,
    TableBody,
    TableContainer,
    TableRow,
    TableHead,
    TableCell,
    Paper,
    Box,
    Avatar,
    Typography,
    IconButton,
    CircularProgress
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import { format } from "date-fns";
import UserDetailsDialog from "@/app/admin/users/components/UserDetailsDialog";
import {nameToColor, getLastName} from "@/app/utils/dashboard/changeAvatarColor";

export default function UsersTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleViewDetails = (userId: string) => {
        setSelectedUserId(userId);
        setDialogOpen(true);
    }
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const usersList = await fetchUsers();
                setUsers(usersList);
            } catch (error) {
                console.error("Error fetching users", error);
            } finally {
                setLoading(false);
            }
        }
        loadUsers();
    }, []);

    if (loading) return (
        <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
        </Box>
    );

    if (users.length === 0) return (
        <Box p={4} textAlign="center">
            <Typography>Không có dữ liệu người dùng</Typography>
        </Box>
    );

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Khách hàng</TableCell>
                            <TableCell>Số điện thoại</TableCell>
                            <TableCell>Ngày tạo</TableCell>
                            <TableCell>Xem chi tiết</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Avatar sx={{
                                            width: 36,
                                            height: 36,
                                            bgcolor: nameToColor(user.username || ''),
                                            fontSize: 18
                                        }}>
                                            {getLastName(user.username)}
                                        </Avatar>
                                        <Box display="flex" flexDirection="column">
                                            <Typography variant="body2" color="textPrimary">
                                                {user.username || 'N/A'}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {user.email || 'N/A'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>{user.phoneNumber || 'N/A'}</TableCell>
                                <TableCell>
                                    {user.createdAt ? format(new Date(user.createdAt), 'dd/MM/yyyy') : 'N/A'}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleViewDetails(user.id)}>
                                        <Visibility />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <UserDetailsDialog
                userId={selectedUserId || ''}
                open={dialogOpen}
                onCloseAction={() => setDialogOpen(false)}
            />
        </>

    )
}