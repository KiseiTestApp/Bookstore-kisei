import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

interface BookImageUploadProps {
    imageUrl?: string | null;
    previewUrl?: string | null;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isEditing?: boolean;
    altText?: string;
    isLoading?: boolean;
}
export function BookImageUpload({imageUrl, previewUrl, onImageChange, isEditing = false, altText = "Ảnh bìa", isLoading}: BookImageUploadProps) {
    return (
        <Box>
            <Typography variant="h6">Ảnh</Typography>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                {previewUrl || imageUrl ? (
                    <Image
                        src={previewUrl || imageUrl || "favicon.ico"}
                        alt={altText}
                        width={300}
                        height={300}
                        style={{
                            borderRadius: '2px',
                        }}
                    />
                ) : null}
                {isEditing && onImageChange && (
                    <Button variant="contained" component="label" disabled={isLoading}>
                        {isLoading ? "Đang tải lên..." : "Tải ảnh lên"}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onImageChange}
                            hidden
                        />
                    </Button>
                )}
            </Box>
        </Box>
    )
}