"use client"

import {useSnackbar} from "@/app/context/SnackbarContext";
import {useEffect, useState, useCallback} from "react";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "@/lib/firebase/config";
import {useForm} from "react-hook-form";

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

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: {errors},
    } = useForm<FormData>();

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
                reset(initialData);
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
    }, [userId]);

    // Set dữ liệu cho trường giới tính
    const handleGenderChange = (value: string) => {
        setValue('gender', value)
    }

    // Bật/tắt khả năng chỉnh sửa
    const toggleEdit = () => {
        if (isEditing) {
            handleSubmit(onSubmit);
        } else {
            setIsEditing(true);
        }
    }

    // Hủy chỉnh sửa
    const cancelEdit = () => {
        reset();
        setIsEditing(false);
    }

    // Ghi dữ liệu mới lên lại Firebase
    const onSubmit = async (data: FormData) => {
        if (!userId) return;
        setUpdating(true);
        try {
            await updateDoc(doc(db, "users", userId), data as Record<string, any>);
            showSnackbar("Cập nhật hồ sơ cá nhân thành công", "success")
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile", error);
            showSnackbar("Đã xảy ra lỗi trong khi cập nhật hồ sơ", "error");
        } finally {
            setUpdating(false);
        }
    }
    return {
        loading,
        isEditing,
        updating,
        register,
        errors,
        handleGenderChange,
        toggleEdit,
        cancelEdit,
        handleSubmit: handleSubmit(onSubmit)
    };
}