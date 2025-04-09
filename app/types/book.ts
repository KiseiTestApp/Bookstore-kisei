// Sách
export interface Book {
    id: string;
    title: string;
    author?: string;
    genre?: string;
    description?: string;
    publisher?: string;
    publishYear?: number | null;
    price?: number;
    discounted?: number;
    imageUrl?: string | null;
    quantity_bought?: number;
}