import {db} from "@/lib/firebase/config";
import {doc, getDoc, getDocs, updateDoc, collection, query, orderBy, where} from "@firebase/firestore";
import {OrderDocument} from "@/app/types/order";

export const fetchAllOrders = async (): Promise<OrderDocument[]> => {
    try {
        const ordersCollection = collection(db, "orders");
        const ordersQuery = query(ordersCollection, orderBy('createdAt', 'desc'));
        const ordersQuerySnapshot = await getDocs(ordersQuery);
        return ordersQuerySnapshot.docs.map(doc => ({
            orderId: doc.id,
            ...doc.data(),
        })) as OrderDocument[];
    } catch (error) {
        console.error("Error fetching order documents", error);
        throw error;
    }
};

export const fetchUserOrders = async (userId : string): Promise<OrderDocument[]> => {
    try {
        const ordersCollection = collection(db, "orders");
        const userOrdersQuery = query(ordersCollection,
            where("userId", "==", userId),
            orderBy("createdAt", "desc")
        );
        const userOrdersSnapshot = await getDocs(userOrdersQuery);
        return userOrdersSnapshot.docs.map(doc => ({
            orderId: doc.id,
            ...doc.data(),
        })) as OrderDocument[];

    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'failed-precondition') {
            console.error(
                "Firestore index missing. Please create this index:\n" +
                "Collection: orders\n" +
                "Fields: userId (Ascending), createdAt (Descending)"
            );
        }
        console.error("Error fetching user orders", error);
        throw error;
    }
}
export const fetchOrderById = async (orderId: string): Promise<OrderDocument | null> => {
    try {
        const orderRef = doc(db, "orders", orderId);
        const orderDoc = await getDoc(orderRef);
        if (orderDoc.exists()) {
            return {
                orderId: orderDoc.id,
                ...orderDoc.data(),

            } as OrderDocument;
        }
        return null;
    } catch (error) {

        console.error("Error fetching order by ID: ", error);
        throw error;
    }
}
export const updateOrderStatus = async (orderId: string, newStatus: "paid" | "cancelled"): Promise<void> => {
    try {
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, {
            status: newStatus,
            updatedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error updating order status", error);
        throw error;
    }
}