"use client";

import {
    TextField,
    Typography,
    MenuItem,
    Button,
    IconButton,
    Paper,
    Tooltip,
    InputAdornment,
    CircularProgress
} from "@mui/material";
import {useBookWrite} from "@/app/hooks/book/useBookWrite";
import DeleteIcon from "@mui/icons-material/Delete";
import {Box, Stack} from "@mui/system";
import Container from "@mui/material/Container";
import Image from "next/image";
import {NumericFormat} from "react-number-format";
import {genresList} from "@/app/admin/components/genresList";
import {useRouter} from "next/navigation";
import React from "react";


export default function FormCreateBook() {
    const {
        formData,
        loading,
        handleInputChange,
        handleImageChange,
        handleImageRemove,
        submitBook,
    } = useBookWrite();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitBook();
    }

    return (
        <div className="flex flex-row gap-4">
            <form className="flex flex-row grow gap-4" onSubmit={handleSubmit}>
                <Paper className="p-4 w-full" elevation={1}>
                    <Typography variant="h6">Nội dung sản phẩm</Typography>
                    <Stack spacing={1.5} className="py-4" >
                        <TextField
                            id="title"
                            label="Tên sản phẩm"
                            type="text"
                            size="medium"
                            fullWidth
                            multiline={true}
                            maxRows={2}
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                        <TextField
                            id="author"
                            label="Tên tác giả"
                            type="text"
                            size="medium"
                            fullWidth
                            value={formData.author}
                            onChange={handleInputChange}
                        />
                        <TextField
                            id="publisher"
                            label="Nhà xuất bản"
                            type="text"
                            size="medium"
                            fullWidth
                            value={formData.publisher}
                            onChange={handleInputChange}
                        />

                        <TextField
                            id="genre"
                            select
                            label="Thể loại"
                            fullWidth
                            value={formData.genre}
                            onChange={(e) => {
                                handleInputChange({
                                    target: {
                                        id: 'genre',
                                        value: e.target.value
                                    }
                                } as React.ChangeEvent<HTMLInputElement>)
                            }}
                        >
                            {genresList.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <NumericFormat
                            customInput={TextField}
                            id="publishYear"
                            label="Năm xuất bản"
                            fullWidth
                            value={formData.publishYear}
                            isAllowed={(values) => {
                                const {formattedValue} = values;
                                return formattedValue.length <= 4;
                            }}
                            onValueChange={(values) => {
                                handleInputChange({
                                    target: {
                                        id: 'publishYear',
                                        value: values.value
                                    }
                                } as React.ChangeEvent<HTMLInputElement>)
                            }}
                        />
                        <NumericFormat
                            customInput={TextField}
                            id="price"
                            label="Giá tiền"
                            fullWidth
                            thousandsGroupStyle={"thousand"}
                            valueIsNumericString={true}
                            thousandSeparator=","
                            slotProps={{
                                input: {
                                    endAdornment: <InputAdornment position="end">VND</InputAdornment>
                                },
                            }}
                            value={formData.price}
                            onValueChange={(values) => {
                                handleInputChange({
                                    target: {
                                        id: 'price',
                                        value: values.value
                                    }
                                } as React.ChangeEvent<HTMLInputElement>)
                            }}
                        />
                        <NumericFormat
                            customInput={TextField}
                            id="discounted"
                            label="Giá sau khi giảm"
                            fullWidth
                            thousandsGroupStyle={"thousand"}
                            thousandSeparator=","
                            slotProps={{
                                input: {
                                    endAdornment: <InputAdornment position="end">VND</InputAdornment>
                                },
                            }}
                            value={formData.discounted}
                            onValueChange={(values) => {
                                handleInputChange({
                                    target: {
                                        id: 'discounted',
                                        value: values.value
                                    }
                                } as React.ChangeEvent<HTMLInputElement>)
                            }}
                        />
                        <TextField
                            id="description"
                            label="Mô tả sản phẩm"
                            fullWidth
                            multiline
                            minRows={3}
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </Stack>
                </Paper>
                <Stack spacing={1.5} direction="column" className="w-full flex flex-col grow">
                    <Paper className="p-0 py-4 w-full flex flex-col grow" elevation={1}>
                        <Container>
                            <Typography variant="h6">Ảnh sản phẩm</Typography>
                            <input
                                accept="image/*"
                                style={{ display: "none" }}
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
                            {formData.imageUrl && (
                                <Box style={{position: 'relative', display: 'inline-block'}}>
                                    <Image
                                        src={formData.imageUrl}
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
                                            <DeleteIcon />
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
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    "Lưu sản phẩm"
                                )}
                            </Button>
                            <Button
                                variant="outlined"
                                color="inherit"
                                className="flex w-1/2"
                                onClick={() => router.push(`/admin/products`)}
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