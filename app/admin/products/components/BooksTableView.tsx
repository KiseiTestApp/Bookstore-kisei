"use client"

import Image from "next/image";
import {useRouter} from "next/navigation";

import {db} from "@/lib/firebase/config";
import {doc, deleteDoc} from "@firebase/firestore";
import useFetchBooks from "@/app/utils/products/useFetchBooks";

import Visibility from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import {GridColDef, DataGrid} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import {useDialog} from "@/app/context/DialogContext";
import {useSnackbar} from "@/app/context/SnackbarContext";
import {BookTableRow} from '@/app/types/book';

const BooksTableView = () => {
    const {books} = useFetchBooks();
    const router = useRouter();
    const {showSnackbar} = useSnackbar();
    const {confirmDialog} = useDialog();

    const handleDeleteBook = async (bookId: string) => {
        try {
            await deleteDoc(doc(db, "books", bookId));
            showSnackbar("Đã xóa sách thành công", "success");
            router.refresh();
        } catch (error) {
            console.error("Error deleting book: ", error);
            showSnackbar("Đã gặp lỗi khi xóa sách khỏi hệ thống", "error");
        }
    }

    const confirmDeleteBook = (bookId: string, bookTitle: string) => {
        confirmDialog({
            title: "Xác nhận xóa sách",
            content: `Bạn có muốn xóa sách "${bookTitle}"?`,
            confirmText: "Xóa",
            onConfirm: () => handleDeleteBook(bookId),
        })
    }

    const columns: GridColDef<BookTableRow>[] = [
        {
            field: 'id',
            headerName: 'STT',
            width: 70,
            renderCell: (params) => params.api.getAllRowIds().indexOf(params.id)+1,
        },
        {
            field: 'imageUrl',
            headerName: 'Ảnh minh họa',
            width: 120,
            renderCell: (params) => (
                <Image
                    src={params.value}
                    alt={params.row.title || "Bìa sách"}
                    width={60}
                    height={60}
                    style={{ objectFit: 'cover' }}
                />
            ),
        },
        {
            field: 'title',
            headerName: 'Tên sách',
            width: 250,
        },
        {
            field: "publisher",
            headerName: "Nhà xuất bản",
            width: 150,
        },
        {
            field: 'price',
            headerName: 'Giá bán',
            type: 'number',
            width: 120,
        },
        {
            field: 'discounted',
            headerName: 'Giá giảm',
            type: 'number',
            width: 120,
        },
        {
            field: 'genre',
            headerName: 'Thể loại',
            width: 120,
        },
        {
            field: 'actions',
            headerName: 'Thao tác',
            width: 150,
            renderCell: (params) => (
                <>
                    <Tooltip title="Xem chi tiết">
                        <IconButton href={(`/admin/products/book-detail/${params.row.id}`)}>
                            <Visibility />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa sản phẩm">
                        <IconButton onClick={(e) => {
                            e.stopPropagation();
                            confirmDeleteBook(params.row.id as string, params.row.title as string)
                        }}
                                    color="error"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ),
        },
    ];
    const rows = books.map((book) => ({
        id: book.id,
        imageUrl: book.imageUrl,
        title: book.title,
        publisher: book.publisher,
        genre: book.genre,
        price: book.price,
        discounted: book.discounted,
    }));

    return (
        <Box>
            <DataGrid
                key={books.length}
                columns={columns}
                rows={rows}
                checkboxSelection
                disableRowSelectionOnClick
                pageSizeOptions={[5, 10, 15]}
                sx={{
                    backgroundColor: 'white',
                    boxShadow: 2,
                    border: 2,
                    borderColor: 'primary.light',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                    },
                }}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
            />
        </Box>
    )
}

export default BooksTableView;