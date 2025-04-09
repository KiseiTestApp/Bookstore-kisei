// Đọc mọi documents thuộc "books" collection trên Firebase
import {useEffect, useState} from "react";
import {collection, getDocs} from "@firebase/firestore";
import {db} from "@/lib/firebase/config";
import {Timestamp} from "firebase/firestore";

type Book = {
    id: string;
    author: string;
    created_at: Timestamp;
    description: string;
    discounted: number;
    genre: string;
    imageUrl: string;
    price: number;
    publishYear: string;
    publisher: string;
    title: string;
}

const useFetchBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        const fetchBooks = async () => {

            try {
                setLoading(true);
                const booksCollection = collection(db, "books");
                const booksSnapshot = await getDocs(booksCollection);
                const booksList = booksSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }) as Book);
                const validBooks = booksList.filter(book => !!book.id)
                setBooks(validBooks);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);
    return { books, loading, error };
};
export default useFetchBooks;