//Cập nhật dữ liệu sách lên Firebase
"use client"

import {useState } from "react";
import {db, storage} from "@/lib/firebase/config";
import {doc, updateDoc} from "firebase/firestore";
import { useParams } from "next/navigation";
import {Book} from "@/app/types/book";
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import {useSnackbar} from "@/app/context/SnackbarContext";

const useBookUpdate = () => {
    const [book, setBook] = useState<Book | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [formData, setFormData] = useState<Partial<Book>>({});
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const { bookId } = useParams<{ bookId: string }>();
    const {showSnackbar, updateSnackbarMessage} = useSnackbar();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        type NumericField = 'price' | 'discounted' | 'publishYear';
        const numericFields: NumericField[] = ['price', 'discounted', 'publishYear'];

        setFormData(prev => {
            if (numericFields.includes(name as NumericField)) {
                return {
                    ...prev,
                    [name]: value === '' ? prev[name as NumericField] : value
                };
            }
            return { ...prev, [name]: value };
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };


    //Cập nhật sách lên Firebase
    const updateBook = async (data: Partial<Book>, imageFile?: File) => {
        if (!bookId) return;
        setLoading(true);
        showSnackbar('Đang cập nhật được : 0%', 'info');
        try {
            let imageUrl = data.imageUrl || book?.imageUrl;
            if (imageFile) {
                const storageRef = ref(storage, `books/${bookId}`);
                const uploadTask = uploadBytesResumable(storageRef, imageFile);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        updateSnackbarMessage(`Đang cập nhật được: ${progress}%`);
                    },
                    (error) => {
                        showSnackbar('Đã gặp lỗi khi tải ảnh lên', 'error');
                        throw error;
                    },
                    async () => {
                        imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    }
                );
                await uploadTask;
            }
            const updatedData = {
                ...book,
                ...data,
                imageUrl,
                price: Number(data.price),
                discounted: Number(data.discounted),
                publishYear: Number(data.publishYear),
            };
            const bookRef = doc(db, "books", bookId);
            await updateDoc(bookRef, updatedData);
            showSnackbar('Cập nhật sách thành công 🎉', 'success');
            setBook(updatedData as Book);
            return true;
        } catch (error) {
            setError("Failed to update book");
            showSnackbar('Đã gặp phải lỗi khi cập nhật sách', 'error');
            console.error(error);
            return false;
        } finally {
            setLoading(false);
        }
    }
    return {
        book,
        loading,
        error,
        formData,
        setFormData,
        imageFile,
        previewUrl,
        handleChange,
        handleImageChange,
        updateBook
    };
};

export default useBookUpdate;