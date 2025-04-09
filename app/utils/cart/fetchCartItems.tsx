import {db} from "@/lib/firebase/config";
import {doc, onSnapshot} from "firebase/firestore";

export interface CartItem {
    title: string;
    quantity: number;
    price: number;
    discounted: number;
    subtotal: number;
    bookId: string;
    imageUrl: string;
}

export interface CartDocument {
    items: CartItem[];
    total: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export const fetchCartItems = (
    userId: string,
    onUpdate: (data: CartDocument | null) => void
) => {
    const cartRef = doc(db, "cart", userId);

    return onSnapshot(cartRef, (doc) => {
        if (doc.exists()) {
            const data = doc.data();
            const items: CartItem[] = data.items || [];
            const itemsWithSubtotal = (data.items || [] as CartItem[]).map((item: CartItem) => ({
                ...item,
                subtotal: item.subtotal || (item.discounted || item.price) * item.quantity
            }));
            const calculatedTotal = itemsWithSubtotal.reduce(
                (sum: number, item: CartItem) => sum + item.subtotal,
                0
            );
            onUpdate({
                items: itemsWithSubtotal,
                total: typeof data.total === 'number' ? data.total : calculatedTotal,
                createdAt: data.createdAt?.toDate(),
                updatedAt: data.updatedAt?.toDate()
            });
        } else {
            onUpdate(null);
        }
    });
};