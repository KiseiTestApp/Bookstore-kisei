import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "@/lib/firebase/config";
import {CartDocument} from "@/app/utils/cart/fetchCartItems";

export async function deleteFromCart(userId:string, bookId:string) {
    const cartRef = doc(db, 'cart', userId);
    try {
        const cartDoc = await getDoc(cartRef);
        if (!cartDoc.exists()) {
            throw new Error("Could not find cart");
        }
        const cartData = cartDoc.data() as CartDocument;
        const itemIndex = cartData.items.findIndex((item) => item.bookId === bookId);
        if (itemIndex === -1) {
            throw new Error("Item does not exist");
        }
        const [removedItem] = cartData.items.splice(itemIndex, 1);
        const newTotal = cartData.items.reduce((sum, item) => sum + item.discounted * item.quantity, 0);
        await updateDoc(cartRef, {
            items: cartData.items,
            total: newTotal,
        });
        console.log(`Item ${itemIndex} has been deleted`, removedItem);
        return removedItem;
    } catch (error: any) {
        console.error('Error while deleting item', error);
        throw new Error(`Failed to remove item from cart: ${error.message}`);
    }
}
