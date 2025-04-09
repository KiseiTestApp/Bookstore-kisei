"use client"

import {useSnackbar} from "@/app/context/SnackbarContext";
import {useEffect, useState, useCallback} from "react";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "@/lib/firebase/config";

export interface FormData {
    username: string;
    phoneNumber: string;
    email: string;
    gender: string;
    birthday: string;
}

export const useAccountForm = (userId: string | undefined) => {
    const {showSnackbar} = useSnackbar();

    // * Tạo state cho các trường dữ liệu
    const [loading, setLoading] = useState<boolean>(true);
    const [isEditing, setIsEditing] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        phoneNumber: "",
        email: "",
        gender: '',
        birthday: "",
    })
    const [originalData, setOriginalData] = useState({...formData})

    const loadUserData = useCallback(async () => {
        if (!userId) return;

        // * Lấy dữ liệu từ Firebase
        try {
            const userRef = doc(db, "users", userId);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const initialData = {
                    username: userDoc.data().username || "",
                    phoneNumber: userDoc.data().phoneNumber || "",
                    email: userDoc.data().email || "",
                    gender: userDoc.data().gender || "",
                    birthday: userDoc.data().birthday || "",
                };
                setFormData(initialData);
                setOriginalData(initialData);
            }
        } catch (error) {
            // Catch lỗi trong trường hợp không có thông tin người dùng
            console.error("Error loading user data", error);
            showSnackbar("Failed to load user data", "error");
        } finally {
            setLoading(false);
        }
    }, [userId, showSnackbar]);

    useEffect(() => {
        loadUserData();
    }, [loadUserData]);

    // Phương thức set dữ liệu
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    // Set dữ liệu cho trường giới tính
    const handleGenderChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            gender: value,
        }))
    }

    // Bật/tắt khả năng chỉnh sửa
    const toggleEdit = () => {
        if (isEditing) {
            handleSubmit()
        } else {
            setIsEditing(true);
        }
    }

    // Hủy chỉnh sửa
    const cancelEdit = () => {
        setFormData({...originalData})
        setIsEditing(false);
    }

    // Ghi dữ liệu mới lên lại Firebase
    const handleSubmit = async () => {
        if (!userId) return;
        setUpdating(true);
        try {
            await updateDoc(doc(db, "users", userId), formData);
            showSnackbar("Cập nhật hồ sơ cá nhân thành công", "success")
            setOriginalData({...formData})
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile", error);
            showSnackbar("Đã xảy ra lỗi trong khi cập nhật hồ sơ", "error");
            setFormData({...originalData})
        } finally {
            setUpdating(false);
        }
    }
    return {loading, isEditing, updating, formData, handleChange, handleGenderChange, toggleEdit, cancelEdit};
}