"use client"

import {
    TextField,
    Typography,
    MenuItem,
    Button,
    IconButton,
    Paper,
    Tooltip,
    CircularProgress, FormHelperText
} from "@mui/material";
import {useBookWrite} from "@/app/hooks/book/useBookWrite";
import DeleteIcon from "@mui/icons-material/Delete";
import {Box, Stack} from "@mui/system";
import Container from "@mui/material/Container";
import Image from "next/image";
import {genresList} from "@/app/admin/components/genresList";
import {Controller} from "react-hook-form";


export default function FormCreateBook() {
    const {
        register,
        control,
        errors,
        loading,
        handleImageChange,
        handleImageRemove,
        onSubmit,
        watch,
    } = useBookWrite();
    const imageUrl = watch('imageUrl');

    return (
        <div className="flex flex-row gap-4">
            <form className="flex flex-row grow gap-4" onSubmit={onSubmit}>
                <Paper className="p-4 w-full" elevation={1}>
                    <Typography variant="h6">Nội dung sản phẩm</Typography>
                    <Stack spacing={1.5} className="py-4">
                        <TextField
                            id="title"
                            label="Tên sản phẩm"
                            type="text"
                            size="medium"
                            fullWidth
                            multiline={true}
                            maxRows={2}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                            {...register('title')}
                        />
                        <TextField
                            id="author"
                            label="Tên tác giả"
                            type="text"
                            size="medium"
                            fullWidth
                            error={!!errors.author}
                            helperText={errors.author?.message}
                            {...register('author')}
                        />
                        <TextField
                            id="publisher"
                            label="Nhà xuất bản"
                            type="text"
                            size="medium"
                            fullWidth
                            error={!!errors.publisher}
                            helperText={errors.publisher?.message}
                            {...register('publisher')}
                        />
                        <Controller
                            name="genre"
                            control={control}
                            render={({field}) => (
                                <TextField {...field} select label="Thể loại" fullWidth error={!!errors.genre}
                                           helperText={errors.genre?.message}>
                                    {genresList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                        <Controller
                            name="publishYear" control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label='Năm xuất bản'
                                    error={!!errors.publishYear}
                                    helperText={errors.publishYear?.message}
                                />
                            )}
                        />
                        <Controller
                            name="price" control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    label='Giá tiền'
                                    fullWidth
                                    error={!!errors.price}
                                    helperText={errors.price?.message}
                                />
                            )}
                        />
                        <Controller
                            name="discounted" control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    type="number"
                                    label='Giá sau khi giảm'
                                    error={!!errors.discounted}
                                    helperText={errors.discounted?.message}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            )}
                        />
                        <TextField
                            label="Mô tả sản phẩm"
                            fullWidth
                            multiline
                            minRows={3}
                            {...register('description')}
                        />
                    </Stack>
                </Paper>
                <Stack spacing={1.5} direction="column" className="w-full flex flex-col grow">
                    <Paper className="p-0 py-4 w-full flex flex-col grow" elevation={1}>
                        <Container>
                            <Typography variant="h6">Ảnh sản phẩm</Typography>
                            <input
                                accept="image/*"
                                style={{display: "none"}}
                                id="image-upload"
                                type="file"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="image-upload">
                                <Button
                                    variant="outlined"
                                    component="span"
                                >
                                    Tải lên ảnh
                                </Button>
                            </label>
                            {errors.imageUrl && (
                                <FormHelperText error>
                                    {errors.imageUrl.message}
                                </FormHelperText>
                            )}
                            {imageUrl && (
                                <Box style={{position: 'relative', display: 'inline-block'}}>
                                    <Image
                                        src={imageUrl}
                                        alt="Preview"
                                        width={600}
                                        height={600}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'block',
                                        }}
                                        className="py-3"
                                    />
                                    <Tooltip title={"Xóa ảnh"}>
                                        <IconButton
                                            color="error"
                                            onClick={handleImageRemove}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            )}
                        </Container>
                        <Container className="p-4 w-full flex flex-row gap-6">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                className="flex w-1/2"
                                disabled={loading}
                            >
                                {loading ? (
                                    <CircularProgress size={24} color="inherit"/>
                                ) : (
                                    "Lưu sản phẩm"
                                )}
                            </Button>
                            <Button
                                variant="outlined"
                                color="inherit"
                                className="flex w-1/2"
                                onClick={() => history.back()}
                            >
                                Hủy
                            </Button>
                        </Container>
                    </Paper>
                </Stack>
            </form>
        </div>
    );
}