"use client";

import { Book } from "@/app/types/book";
import { CircularProgress, Stack } from "@mui/material";
import BookFormFields from "./BookFormFields";
import useBookUpdate from "@/app/hooks/book/useBookUpdate";
import BookDetailHeader from "@/app/admin/products/book-detail/components/BookDetailHeader";
import {useRef, useEffect} from "react";

interface UpdateBookFormProps {
    initialBook?: Book;
    onSuccess?: () => void;
    isEditing: boolean;
    onCancel?: () => void;
    onEdit?: () => void;
}

const UpdateBookForm = ({ initialBook, onSuccess, isEditing, onCancel, onEdit }: UpdateBookFormProps) => {
    const {
        book: fetchedBook,
        loading,
        formData,
        setFormData,
        previewUrl,
        handleChange,
        handleImageChange,
        updateBook,
    } = useBookUpdate();
    const currentBook = initialBook || fetchedBook;
    const initialData = useRef<Partial<Book>>({...currentBook});
    useEffect(() => {
        if (currentBook) {
            initialData.current = currentBook;
            setFormData(currentBook);
        }
    }, [currentBook]);
    const isDirty = JSON.stringify(formData) !== JSON.stringify(initialData.current);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isDirty) return;
        const success = await updateBook(formData);
        if (success && onSuccess) onSuccess();
    }

    if (!currentBook && loading) return (
        <CircularProgress size={20} />
    );
    if (!currentBook) return <div>Book not found</div>;

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={1}>
                <BookDetailHeader
                    isDirty={isDirty}
                    isEditing={isEditing}
                    isLoading={loading}
                    onEdit={onEdit}
                    onCancel={onCancel}
                />
                <BookFormFields
                    book={{ ...currentBook, ...formData }}
                    previewUrl={previewUrl}
                    onImageChange={handleImageChange}
                    onChange={handleChange}
                    isEditing={isEditing}
                />
            </Stack>
        </form>
    );
};

export default UpdateBookForm;