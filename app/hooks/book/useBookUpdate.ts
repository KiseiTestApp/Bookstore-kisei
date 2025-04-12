"use client"

import React, { useEffect, useState } from "react";
import { db, storage } from "@/lib/firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { useSnackbar } from "@/app/context/SnackbarContext";
import { useForm} from "react-hook-form";
import {BookForm, bookSchema} from "@/lib/validation/bookSchema";
import {zodResolver} from "@hookform/resolvers/zod";

const useBookUpdate = () => {
    const [book, setBook] = useState<BookForm | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const { bookId } = useParams<{ bookId: string }>();
    const { showSnackbar, updateSnackbarMessage } = useSnackbar();

    const formMethods = useForm<BookForm>({
        defaultValues: {
            title: '',
            author: '',
            description: '',
            publisher: '',
            genre: '',
            price: 0,
            discounted: 0,
            publishYear: 0,
            imageUrl: '',
        },
        mode: 'onBlur',
        // @ts-expect-error: Should expect the Zod Resolver working as intended
        resolver: zodResolver(bookSchema),
    });

    const {reset} = formMethods;

    useEffect(() => {
        const fetchBook = async () => {
            if (!bookId) return;
            setLoading(true);
            try {
                const bookRef = doc(db, "books", bookId);
                const bookSnap = await getDoc(bookRef);
                if (bookSnap.exists()) {
                    const bookData = bookSnap.data() as BookForm;
                    setBook(bookData);
                    formMethods.reset(bookData);
                    if (bookData.imageUrl) {
                        setPreviewUrl(bookData.imageUrl);
                    }
                } else {
                    setError('Book not found');
                }
            } catch (error) {
                setError('Failed to fetch book');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        if (bookId) {
            fetchBook();
        }
    }, [bookId, reset, formMethods]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            if (file.type.startsWith("image/")) {
                setImageFile(file);
                setPreviewUrl(URL.createObjectURL(file));
                formMethods.setValue('imageFile', file);
            } else {
                showSnackbar('Chỉ được phép tải file ảnh', 'warning');
            }
        }
    };


    const updateBook = async (data: BookForm) => {
        if (!bookId) return;
        setLoading(true);
        showSnackbar('Đang cập nhật được : 0%', 'info');
        try {
            let imageUrl = data.imageUrl || book?.imageUrl;
            if (data.imageFile) {
                const storageRef = ref(storage, `books/${bookId}`);
                const uploadTask = uploadBytesResumable(storageRef, data.imageFile);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        updateSnackbarMessage(`Đang cập nhật được: ${progress}%`);
                    },
                    (error) => {
                        showSnackbar('Đã gặp lỗi khi tải ảnh lên', 'error');
                        throw error;
                    },
                );
                await uploadTask;
                imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            }
            const updatedData = {
                ...book,
                ...data,
                imageUrl,
            };
            const bookRef = doc(db, "books", bookId);
            await updateDoc(bookRef, updatedData);
            showSnackbar('Cập nhật sách thành công 🎉', 'success');
            setBook(updatedData as BookForm);
            return true;
        } catch (error) {
            setError("Failed to update book");
            showSnackbar('Đã gặp phải lỗi khi cập nhật sách', 'error');
            console.error(error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        book,
        loading,
        error,
        imageFile,
        previewUrl,
        handleImageChange,
        updateBook,
        formMethods,
    };
};

export default useBookUpdate;