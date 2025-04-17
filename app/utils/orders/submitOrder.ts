import {db} from '@/lib/firebase/config';
import {doc, addDoc, collection, runTransaction, increment} from "firebase/firestore";
import {OrderDocument} from "@/app/types/order";
import {CartItem} from "@/app/utils/cart/fetchCartItems";

export const submitOrder = async (
    orderForm: OrderDocument,
    cartItems: CartItem[],
    totalPrice: number,
    userId: string | undefined,
    clearCart: () => Promise<boolean>,
): Promise<{ success: boolean, error? : string}> => {
    if (!userId) {
        return {success: false, error: 'User not authenticated'};
    }
    try {

        //Kiểm tra liệu người dùng có trên hệ thống
        if (!userId) {
            return {success: false, error: 'User not authenticated'};
        }

        //Kiểm tra giỏ hàng có trống không
        if (!cartItems || cartItems.length === 0) {
            return {success: false, error: 'Cannot submit empty cart'};
        }

        //Tạo giao dịch cho cơ sở dữ liệu
        await runTransaction(db, async (transaction) => {
            //1: Tạo order document
            const orderData = {
                userId,
                ...orderForm,
                items: cartItems,
                totalPrice: totalPrice,
                status: "pending",
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            const orderCollection = collection(db, "orders");
            await addDoc(orderCollection, orderData);

            //2: Thêm và cập nhật trường để ghi lại số lượng sản phẩm được bán
            const bookUpdates = cartItems.map(async (item) => {
                const bookRef = doc(db, "books", item.bookId);
                transaction.update(bookRef, {
                    quantity_bought: increment(item.quantity),
                    last_purchased: new Date(),
                });
            });
            await Promise.all(bookUpdates);

            //3: Xóa document giỏ hàng
            const cartCleared = await clearCart();
            if (!cartCleared) {
                console.error("Failed to delete cart");
                return {success: false, error: 'Failed to delete cart but order still submitted'};
            }
        });
        return {success: true}
    } catch (error) {
        console.error("Error submitting order: ", error);
        return {success: false, error: error instanceof Error ? error.message : "Failed to submit order"};
    }
}