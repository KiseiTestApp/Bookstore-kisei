import {db} from '@/lib/firebase/config';
import { doc, getDoc } from "firebase/firestore";
import {Book} from '@/app/types/book';

export async function getBookById(bookId: string): Promise<Book | null> {
    try {
        const bookRef = doc(db, "books", bookId);
        const bookDoc = await getDoc(bookRef);
        if (bookDoc.exists()) {
            return {
                id: bookDoc.id,
                title: bookDoc.data().title,
                author: bookDoc.data().author || 'Unknown',
                description: bookDoc.data().description,
                price: bookDoc.data().price ?? 0,
                discounted: bookDoc.data().discounted ?? 0,
                imageUrl: bookDoc.data().imageUrl || null,
                publisher: bookDoc.data().publisher || 'Unknown',
                publishYear: bookDoc.data().publishYear || null,
                genre: bookDoc.data().genre || 'Unknown',
                averageRating: bookDoc.data()?.averageRating || 0,
                reviewCount: bookDoc.data().reviewCount || 0,
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching book:", error);
        return null;
    }
}