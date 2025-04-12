"use client"

import { Controller, FormProvider } from "react-hook-form";
import useBookUpdate from "@/app/hooks/book/useBookUpdate";
import { Button, TextField, Typography, Box, CircularProgress, Paper, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { genresList } from "@/app/admin/components/genresList";

const BookUpdateForm = () => {
    const {
        book,
        loading,
        error,
        previewUrl,
        handleImageChange,
        updateBook,
        formMethods,
    } = useBookUpdate();

    const { handleSubmit, register, formState: { errors, isDirty } } = formMethods;


    const onSubmit = async (data: any) => {
        await updateBook(data);
        console.log("Submitting", data);
    };

    if (loading && !book) {
        return (
            <div className='flex w-full h-full items-center justify-center'>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <FormProvider {...formMethods}>
            <Box marginX={4} marginY={2} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" flexDirection='row' alignItems="center" justifyContent="space-between" marginBottom={2}>
                    <Typography variant="h5">Cập nhật sách</Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || !isDirty}
                    >
                        {loading ? <CircularProgress size={24}  /> : "Cập nhật"}
                    </Button>
                </Box>
                <Grid container spacing={2}>
                    <Grid size={6} component={Paper} paddingY={3} paddingX={2}>
                        <Typography variant="h6">Thông tin sách</Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Tiêu đề"
                            {...register("title")}
                            error={!!errors.title}
                            helperText={errors.title?.message as string}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Tác giả"
                            {...register("author")}
                            error={!!errors.author}
                            helperText={errors.author?.message as string}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label='Nhà xuất bản'
                            {...register('publisher')}
                            error={!!errors.publisher}
                            helperText={errors.publisher?.message as string}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Mô tả"
                            multiline
                            rows={6}
                            {...register("description")}
                        />

                        <Controller
                            name='genre'
                            control={formMethods.control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    margin="normal"
                                    label="Thể loại"
                                    error={!!errors.genre}
                                    helperText={errors.genre?.message as string}
                                >
                                    {genresList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Giá"
                            type="number"
                            {...register("price")}
                            error={!!errors.price}
                            helperText={errors.price?.message as string}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Giá sau khi giảm"
                            type="number"
                            {...register("discounted")}
                            error={!!errors.discounted}
                            helperText={errors.discounted?.message as string}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Năm xuất bản"
                            type="number"
                            {...register("publishYear")}
                            error={!!errors.publishYear}
                            helperText={errors.publishYear?.message as string}
                        />
                    </Grid>
                    <Grid size={6} component={Paper} paddingY={3} paddingX={2}>
                        <Box>
                            <Typography variant="h6">Ảnh bìa sách</Typography>
                            {previewUrl && (
                                <Box display='flex' paddingY={3} alignItems='center' justifyContent='center'>
                                    <Image
                                        src={previewUrl}
                                        alt="Book cover preview"
                                        width={300}
                                        height={300}
                                    />
                                </Box>
                            )}
                            <input
                                type="file"
                                onChange={handleImageChange}
                                id='book-image-input'
                                style={{ display: "none" }}
                            />
                            <label htmlFor="book-image-input">
                                <Button
                                    variant='outlined' component='span' fullWidth
                                    sx={{
                                        justifyContent: 'center',
                                        textTransform: 'none',
                                    }}>
                                    Tải ảnh lên
                                </Button>
                            </label>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </FormProvider>
    );
};

export default BookUpdateForm;