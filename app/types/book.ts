// Sách
export interface Book {
    id: string;
    title?: string;
    author?: string;
    genre?: string;
    description?: string;
    publisher?: string;
    publishYear?: number;
    price: number;
    discounted: number;
    imageFile?: File | null;
    imageUrl: string | null;
    averageRating?: number;
    reviewCount?: number;
    quantity_bought?: number;
}

//Bảng cho sách
export type BookTableRow = {
    id: string;
    imageUrl: string;
    title: string;
    publisher: string;
    genre: string;
    price: number;
    discounted: number;
}

//Form cho sách
export interface BookFormInput {
    id?: string;
    title: string;
    author: string;
    genre: string;
    description?: string;
    publisher: string;
    publishYear: string | number;
    price: string | number;
    discounted?: string | number;
    imageFile?: File | null;
    imageUrl?: string;
}
