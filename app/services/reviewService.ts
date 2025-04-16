import {db} from '@/lib/firebase/config';
import {ReviewInput} from "@/app/types/review";
import {collection, doc, runTransaction, Timestamp} from "firebase/firestore";

export const createReview = async (reviewInput: ReviewInput) => {
    try {
        await runTransaction(db, async (transaction) => {

            const bookRef = doc(db, 'books', reviewInput.bookId);
            const bookSnap = await transaction.get(bookRef);
            const bookData = bookSnap.data();

            const reviewCollection = collection(db, 'books', reviewInput.bookId, 'reviews');
            const reviewRef = doc(reviewCollection)

            // Lấy thông tin điểm đánh giá trung bình là lượt đánh giá
            const currentReviewCount = bookData?.reviewCount || 0;
            const currentAverageRating = bookData?.averageRating || 0;

            // Nếu không, tạo đánh giá mới và tính điểm đánh giá
            const newReviewCount = currentReviewCount + 1;
            const newAverageRating = (currentAverageRating * currentReviewCount + reviewInput.review_rating)/newReviewCount;

            transaction.set(reviewRef, {
                ...reviewInput,
                createdAt: Timestamp.now(),
            })

            transaction.update(bookRef, {
                averageRating: parseFloat(newAverageRating.toFixed(1)),
                reviewCount: newReviewCount,
            });
        });
        return {success: true};
    } catch (error) {
        console.error('Error creating review', error);
        return {success: false};
    }
}