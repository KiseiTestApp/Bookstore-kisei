import { useEffect, useState } from "react";
import { getBookById } from "@/app/utils/products/getBookById";
import { Book } from "@/app/types/book";

export default function useBookRead(bookId: string) {
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!bookId) {
            setError('Invalid book ID');
            setLoading(false);
            return;
        }

        const fetchBook = async () => {
            try {
                setLoading(true);
                const result = await getBookById(bookId);
                if (!result) {
                    throw new Error("Sách không tồn tại");
                }
                setBook(result);
            } catch (err: unknown) {
                console.error("Error fetching book:", err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Đã xảy ra lỗi không xác định');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [bookId]);

    return { book, loading, error };
}
