import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "@/lib/firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import React, { useState, useCallback } from "react";
import { useSnackbar } from "@/app/context/SnackbarContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema} from "@/lib/validation/bookSchema";
import {BookFormInput} from "@/app/types/book";

export const useBookWrite = () => {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
        getValues,
        control,
    } = useForm<BookFormInput>({
        defaultValues: {
            title: '',
            author: '',
            genre: '',
            publisher: '',
            description: '',
            publishYear: '',
            price: '',
            discounted: '',
            imageFile: null,
            imageUrl: '',
        },
        mode: 'onBlur',
        // @ts-expect-error: Should expect Zod Schema working properly
        resolver: zodResolver(bookSchema),
    });

    const [loading, setLoading] = useState(false);
    const { showSnackbar, updateSnackbarMessage } = useSnackbar();

    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            showSnackbar('Vui lòng tải file ảnh hợp lệ', 'warning');
            return;
        }
        if (file) {
            setValue('imageFile', file);
            setValue('imageUrl', URL.createObjectURL(file));
        }
    }, [showSnackbar, setValue]);

    const handleImageRemove = useCallback(() => {
        setValue('imageFile', undefined);
        setValue('imageUrl', '');
    }, [setValue]);

    const resetForm = useCallback(() => {
        reset();
    }, [reset]);

    const onSubmit = handleSubmit(async (data) => {
        if (!data.imageFile) {
            showSnackbar('Vui lòng tải lên hình ảnh sách', 'warning');
            return;
        }

        setLoading(true);
        showSnackbar('Đang tải dữ liệu lên: 0%', 'info');

        try {
            const storageRef = ref(storage, `books/${data.id}/${data.imageFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, data.imageFile);

            const downloadUrl = await new Promise<string>((resolve, reject) => {
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        updateSnackbarMessage(`Đang tải dữ liệu lên: ${progress}%`);
                    },
                    (error) => reject(error),
                    async () => {
                        const url = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve(url);
                    }
                );
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {imageFile, ...restData} = data;
            const bookData = {
                ...restData,
                imageUrl: downloadUrl,
                quantity_bought: 0,
                createdAt: new Date(),
            };
            await addDoc(collection(db, 'books'), bookData);
            showSnackbar('Đã thêm sách vào hệ thống thành công 🎉', 'success');
            resetForm();
        } catch (error) {
            console.error('Submission error: ', error);
            showSnackbar('Đã gặp phải lỗi khi tải sách lên hệ thống', 'error');
        } finally {
            setLoading(false);
        }
    });

    return {
        register,
        errors,
        loading,
        handleImageChange,
        handleImageRemove,
        resetForm,
        onSubmit,
        watch,
        setValue,
        getValues,
        control,
    };
};