import { Timestamp } from "firebase/firestore";

// Đánh giá
export interface Review {
    id: string;
    bookId: string;
    userId: string;
    displayName: string;
    review_rating: number;
    review_comment: string;
    createdAt: Date | Timestamp;
}

// Tạo đánh giá mới
export type ReviewInput = Omit<Review, 'id' | 'createdAt'>

