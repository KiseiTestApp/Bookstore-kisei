import {addDoc, collection} from "firebase/firestore";
import { db, storage } from "@/lib/firebase/config";
import {ref, uploadBytesResumable, getDownloadURL} from "@firebase/storage";
import {useState, useCallback} from "react";
import {useSnackbar} from "@/app/context/SnackbarContext";
import {Book} from "@/app/types/book";


// Khai báo kiểu dữ liệu cho form thêm sản phẩm
export interface BookFormData extends Omit<Book, 'publishYear' | 'price' | 'discounted' | 'imageUrl'> {
    publishYear: string | number;
    price: string | number;
    discounted: string | number;
    imageFile: File | null;
    imageUrl: string;
}

const initialFormData: BookFormData = {
    id: '',
    title: '',
    author: '',
    publisher: '',
    genre: '',
    publishYear: '',
    price: '',
    discounted: '',
    description: '',
    imageFile: null,
    imageUrl: '',
}
export const useBookWrite = () => {
    const [formData, setFormData] = useState<BookFormData>(initialFormData);
    const [loading, setLoading] = useState(false);

    const {showSnackbar, updateSnackbarMessage} = useSnackbar();

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {id, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: ['price', 'discounted', 'publishYear'].includes(id)
                ? Number(value.replace(/,/g, '')) || value
                : value,
        }));
    }, [])

    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            showSnackbar('Vui lòng tải file ảnh hợp lệ', 'warning');
            return;
        }
        setFormData(prev => ({
            ...prev,
            imageFile: file,
            imageUrl: URL.createObjectURL(file),
        }))
    },[showSnackbar]);

    const handleImageRemove = useCallback(() => {
        setFormData(prev => ({
            ...prev,
            imageFile: null,
            imageUrl: '',
        }));
    }, []);

    const resetForm = useCallback(() => {
        setFormData(initialFormData);
    }, [])

    // Ghi dữ liệu sách lên Firebase
    const submitBook = useCallback(async () => {
        if (!formData.title || !formData.author || !formData.publisher ||
            !formData.genre || !formData.publishYear || !formData.imageFile) {
            showSnackbar("Vui lòng điền đầy đủ thông tin được yêu cầu", 'warning');
            return;
        }
        setLoading(true);
        showSnackbar("Đang tải ảnh lên: 0%", "info");
        try {
            const storageRef = ref(storage, `books/${formData.id}/${formData.imageFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, formData.imageFile);
            const downloadUrl = await new Promise<string>((res, rej) => {
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload progress', progress);
                        updateSnackbarMessage(`Đang tải ảnh lên: ${progress}%`);
                    },
                    (error) => {
                        console.log(`Upload failed: ${error}`);
                        rej(error);
                    },
                    async () => {
                        const url = await getDownloadURL(uploadTask.snapshot.ref);
                        res(url);
                    }
                );
            });

            const { imageFile, ...bookDataWithoutFile } = formData;
            const bookData = {
                ...bookDataWithoutFile,
                publishYear: Number(formData.publishYear),
                price: Number(formData.price),
                discounted: Number(formData.discounted),
                imageUrl: downloadUrl,
                quantity_bought: 0,
            };
            await addDoc(collection(db, 'books'), bookData);
            showSnackbar('Đã thêm sách vào hệ thống thành công 🎉', 'success');
            resetForm();
        } catch (error) {
            console.error('Submission error', error);
            showSnackbar('Không thêm được sách vào hệ thống. Vui lòng thử lại sau', 'error');
        } finally {
            setLoading(false);
        }
    }, [formData, resetForm, showSnackbar, updateSnackbarMessage]);
    return {
        formData,
        loading,
        handleInputChange,
        handleImageChange,
        handleImageRemove,
        resetForm,
        submitBook,
        setFormData,
    }
}