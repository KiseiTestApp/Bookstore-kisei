import {db} from '@/lib/firebase/config';
import {collection, getDocs, deleteDoc, doc} from "@firebase/firestore";
import {AddressFormValues} from "@/app/customer/address/components/AddressForm";

export const fetchAddresses = async (userId: string) => {
    console.log("Fetching addresses for user:", userId);
    if (!userId) {
        console.error("userId is missing");
        throw new Error("Authentication required");
    }
    try {
        const addressesRef = collection(db, `users/${userId}/addresses`);
        const querySnapshot = await getDocs(addressesRef);
        console.log("Fetching addresses for user:", querySnapshot);
        if (querySnapshot.empty) {
            console.log("No addresses found for user:", userId);
            return [];
        }
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as AddressFormValues[];

    } catch (error) {
        console.error("Error fetching addresses data", error);
        throw error;
    }
};

export const deleteAddress = async (userId: string, id: string) => {
    if (!userId || !id) {
        console.error("Missing parameters");
        return false;
    }
    try {
        await deleteDoc(doc(db, `users/${userId}/addresses`, id));
        return true;
    } catch (error) {
        console.error("Error fetching addresses data", error);
        return false;
    }
}