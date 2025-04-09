import {TextField, MenuItem} from "@mui/material";
import {Book} from '@/app/types/book'
import React from "react";
import {genresList} from "@/app/admin/components/genresList";
import {NumericFormat} from "react-number-format";
import {Stack} from "@mui/system";
import {BookImageUpload} from "@/app/admin/products/book-detail/components/BookImageUpload";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface BookFormDataProps {
    book: Book;
    previewUrl?: string | null;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isEditing?: boolean;
}

export default function BookDetailForm({book, previewUrl, onImageChange, onChange, isEditing = false}: BookFormDataProps) {
    return (
        <Grid container spacing={2} alignItems="flex-start">
            <Grid size={{ xs: 12, md: 6}} component={Paper} padding={2}>
                <Typography variant="h6" color="textPrimary" gutterBottom marginBottom={2}>Thông tin sách</Typography>
                <Stack spacing={2}>
                    <TextField
                        label="Tên sách"
                        name="title"
                        value={book.title}
                        onChange={onChange}
                        fullWidth
                        minRows={2}
                        variant="outlined"
                        disabled={!isEditing}
                    />
                    <TextField
                        label="Tên tác giả"
                        name="author"
                        value={book.author}
                        onChange={onChange}
                        fullWidth
                        variant="outlined"
                        disabled={!isEditing}
                    />

                    <TextField
                        label="Nhà xuất bản"
                        name="publisher"
                        value={book.publisher}
                        onChange={onChange}
                        fullWidth
                        variant="outlined"
                        disabled={!isEditing}
                    />
                    <TextField
                        label="Thể loại"
                        name="genre"
                        value={book.genre}
                        onChange={onChange}
                        select
                        fullWidth
                        variant="outlined"
                        disabled={!isEditing}
                    >
                        {genresList.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <NumericFormat
                        customInput={TextField}
                        label="Năm xuất bản"
                        name="publishYear"
                        value={book.publishYear}
                        fullWidth
                        variant="outlined"
                        isAllowed={(values) => {
                            const {formattedValue} = values;
                            return formattedValue.length <= 4;
                        }}
                        onValueChange={(values) => {
                            const event = {
                                target: {
                                    name: "publishYear",
                                    value: values.value,
                                },
                            } as React.ChangeEvent<HTMLInputElement>;
                            onChange?.(event);
                        }}
                        disabled={!isEditing}
                    />
                    <NumericFormat
                        customInput={TextField}
                        label="Giá "
                        name="price"
                        value={Number(book.price)}
                        fullWidth
                        variant="outlined"
                        thousandsGroupStyle={"thousand"}
                        thousandSeparator={","}
                        disabled={!isEditing}
                        onValueChange={(values) => {
                            const event = {
                                target: {
                                    name: "price",
                                    value: values.value,
                                },
                            } as React.ChangeEvent<HTMLInputElement>;
                            onChange?.(event);
                        }}
                    />
                    <NumericFormat
                        customInput={TextField}
                        label="Giá sau khi giảm"
                        name="discounted"
                        value={Number(book.discounted)}
                        fullWidth
                        variant="outlined"
                        thousandsGroupStyle={"thousand"}
                        thousandSeparator={","}
                        disabled={!isEditing}
                        onValueChange={(values) => {
                            const event = {
                                target: {
                                    name: "discounted",
                                    value: values.value,
                                },
                            } as React.ChangeEvent<HTMLInputElement>;
                            onChange?.(event);
                        }}
                    />
                    <TextField
                        label="Mô tả nội dung"
                        name="discription"
                        value={book.description}
                        onChange={onChange}
                        fullWidth
                        multiline
                        minRows={4}
                        variant="outlined"
                        disabled={!isEditing}
                    />
                </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6}} component={Paper} padding={2}>
                <BookImageUpload
                    imageUrl={book.imageUrl}
                    previewUrl={previewUrl}
                    onImageChange={onImageChange}
                    isEditing={isEditing}
                    altText={book.title || "Ảnh bìa"}
                />
            </Grid>
        </Grid>
    )
}