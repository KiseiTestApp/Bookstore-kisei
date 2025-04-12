// Sách
export interface Book {
    id: string;
    title?: string;
    author?: string;
    genre?: string;
    description?: string;
    publisher?: string;
    publishYear?: number;
    price?: number;
    discounted?: number;
    imageFile?: File | null;
    imageUrl?: string | null;
    quantity_bought?: number;
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
