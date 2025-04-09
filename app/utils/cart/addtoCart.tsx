import {db} from "@/lib/firebase/config";
import {doc, getDoc, setDoc, Timestamp, updateDoc} from "firebase/firestore";

export async function addtoCart(userId:string, bookId:string, quantity:number) {
    const cartRef = doc(db, 'cart', userId);
    const bookRef = doc(db, 'books', bookId);
    try {
        // Lấy thông tin sách trên Firebase
        const bookDoc = await getDoc(bookRef);
        if (!bookDoc.exists()) {
            throw new Error("Không tìm thấy sách");
        }
        const bookData = bookDoc.data();
        if (!bookData) {
            throw new Error("Không xác định được dữ liệu sách");
        }
        // Lấy thông tin giỏ hàng hoặc tạo giỏ hàng mới
        const cartDoc = await getDoc(cartRef);
        const price = bookData.discounted || bookData.price;

        // TH lấy thông tin giỏ hàng đã tồn tại
        if (cartDoc.exists()) {
            const cartData = cartDoc.data();
            const itemIndex = cartData.items.findIndex((item: Record<string, string>) => item.bookId === bookId);
            const newItems = [...cartData.items];
            let quantityChange = quantity;
            if (itemIndex >= 0) {
                //Nếu sản phẩm đã có trong giỏ hàng, cộng thêm số lượng
                newItems[itemIndex] = {
                    ...newItems[itemIndex],
                    quantity: newItems[itemIndex].quantity + quantity,
                    subtotal: (newItems[itemIndex].quantity + quantity) * price
                }

            } else {
                // Nếu không, thêm sản phẩm mới vào trong giỏ hàng
                newItems.push({
                    bookId,
                    title: bookData.title,
                    quantity,
                    price: bookData.price,
                    discounted: bookData.discounted,
                    imageUrl: bookData.imageUrl,
                    subtotal: quantity * price,
                });
            }

            const newTotal = newItems.reduce((sum, item) => sum + item.subtotal, 0);

            // Lưu thông tin giỏ hàng đã được cập nhật
            await updateDoc(cartRef, {
                items: newItems,
                total: newTotal,
                updatedAt: Timestamp.now()
            });
            return newItems.length;
        } else {
            // Tạo giỏ hàng mới
            const newCart = {
                userId, // Thông tin người dùng
                // Thông tin giỏ hàng
                items: [
                    {
                        bookId,
                        title: bookData.title,
                        quantity,
                        price: bookData.price,
                        discounted: bookData.discounted,
                        imageUrl: bookData.imageUrl,
                        subtotal: quantity * price,
                    }
                ],
                total: price * quantity,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            };
            await setDoc(cartRef, newCart);
            return 1;
        }
    } catch (error) {
        console.log('Error adding item to cart', error);
        throw error;
    }
}
