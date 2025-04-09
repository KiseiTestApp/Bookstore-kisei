import { db } from "@/lib/firebase/config";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { UserData, Address } from "@/app/types/user";

export async function getUserWithAddresses(userId: string): Promise<UserData> {
    try {
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.data();
        if (!userData) {
            throw new Error("User not found");
        }
        if (!userData.email || !userData.username) {
            throw new Error("User data is missing");
        }
        const addressesRef = collection(userDocRef, "addresses");
        const q = query(addressesRef, where("isDefault", "==", true));
        const addressesSnap = await getDocs(q);
        const defaultAddress: Address | undefined = !addressesSnap.empty ?
            {
                id: addressesSnap.docs[0].id,
                ...addressesSnap.docs[0].data()
            } as Address : undefined;

        const result: UserData = {
            id: userId,
            email: userData.email,
            username: userData.username,
            defaultAddress,
        }

        return result as UserData;
    } catch (error) {
        console.error("Error in getUserWithAddresses", error);
        throw error;
    }
}