"use client"

import {useState} from "react";
import Box from "@mui/material/Box";
import UpdateBookForm from "@/app/admin/products/book-detail/components/UpdateBookForm";
import {Book} from "@/app/types/book";

interface BookDetailPageProps {
    initialBook?: Book;
}
export default function BookDetailPage({initialBook}: BookDetailPageProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const handleSuccess = () => {
        setIsEditing(false);
    }
    const handleCancel = () => {
        setIsEditing(false);
    }
    const handleEdit = () => {
        setIsEditing(true);
    }
    return (
        <Box display="flex" flexDirection="column" gap={1} marginX={4} marginY={2}>
            <UpdateBookForm
                initialBook={initialBook}
                isEditing={isEditing}
                onEdit={handleEdit}
                onCancel={handleCancel}
                onSuccess={handleSuccess}
            />
        </Box>
    )
}