import {useState, useEffect} from "react";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
} from 'firebase/firestore';
import {db} from "@/lib/firebase/config";
import {Review} from "@/app/types/review";

export const useBookReviews = (bookId: string) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<string | null>(null);
    useEffect(() => {
        if (!bookId) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        const reviewsCollection = collection(db, 'books', bookId, 'reviews');
        const reviewsQuery = query(
            reviewsCollection,
            orderBy('createdAt', 'desc'),
        )
        const unsubcribe = onSnapshot(
            reviewsQuery,
            (snapshot) => {
                try {
                    const reviewsData = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
                    })) as Review[];
                    setReviews(reviewsData);
                    setIsLoading(false);
                } catch (error) {
                    console.error(error);
                    setErrors('Failed to load reviews');
                } finally {
                    setIsLoading(false);
                }
            },
            (error) => {
                setIsLoading(false);
                setErrors(error.message);
            }
        )
        return () => unsubcribe();
    }, [bookId]);
    return {reviews, isLoading, errors};
}