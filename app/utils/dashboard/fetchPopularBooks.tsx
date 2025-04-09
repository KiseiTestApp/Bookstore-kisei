import {db} from "@/lib/firebase/config";
import {collection, getDocs, orderBy, limit, query} from "firebase/firestore";
import {Book} from '@/app/types/book'

export const fetchPopularBooks= async (limitCount: 5)  : Promise<Book[]> => {
    try {
        const popularBooksRef = collection(db, "books");
        const q = query(popularBooksRef, orderBy('quantity_bought', 'desc'), limit(limitCount));
        const popularBooksSnapshot = await getDocs(q);
        return popularBooksSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Book[];
    } catch (error) {
        console.error("Error fetching popular books.", error);
        throw new Error("Failed to fetch popular books.");
    }
}