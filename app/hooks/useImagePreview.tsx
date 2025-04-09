//Hiện ảnh

import {useState} from "react";

export const useImagePreview = (initialUrl?: string) => {
    const [preview, setPreview] = useState(initialUrl);
    const handleChange = (file: File) => {
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }
    return {preview, handleChange};
}