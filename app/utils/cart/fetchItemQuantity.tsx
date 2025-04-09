import {db} from "@/lib/firebase/config";
import {doc, getDoc, updateDoc} from "firebase/firestore";

export async function getItemQuantity(userId: string, bookId: string): Promise<number> {
    const cartRef = doc(db, "cart", userId);
    try {
        const cartDoc = await getDoc(cartRef);
        if (cartDoc.exists()) {
            const  cartData = cartDoc.data();
            const itemIndex = cartData.items.findIndex((item : Record<string, string>) => item.bookId === bookId);
            if (itemIndex >= 0) {
                return cartData.items[itemIndex].quantity;

            } else {
                console.log("Item not found in cart.");
                return 0;
            }
        } else {
            console.log("Cart does not exist");
            return 0;
        }
    } catch (error) {
        console.error("Error getting itemQuantity", error);
        throw error;
    }
}
export async function updateQuantity(userId: string, bookId: string, newQuanity: number): Promise<number> {
    const cartRef = doc(db, "cart", userId);
    try {
        const cartDoc = await getDoc(cartRef);
        if (cartDoc.exists()) {
            const cartData = cartDoc.data();
            const items = cartData.items;
            const itemIndex = items.findIndex((item: Record<string, string>) => item.bookId === bookId);
            if (itemIndex >= 0) {
                items[itemIndex].quantity = newQuanity;
                await updateDoc(cartRef, {
                    items: items,
                    updatedAt: new Date(),
                    total: cartData.total = cartData.items.reduce((sum: number, item: Record<string, number>) => sum + item.discounted * item.quantity, 0),
                })
                return newQuanity;
            } else {
                console.log("Item not found in cart.");
                return 0;
            }
        } else {
            console.log("Cart does not exist");
            return 0;
        }
    } catch (error) {
        console.error("Error updating itemQuantity", error);
        throw error;
    }
}