import {db} from '@/lib/firebase/config'
import {collection, getDocs, query, where} from "@firebase/firestore";

export interface User {
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
    role: string;
    createdAt: string | Date;
}
export const fetchUsers = async (): Promise<User[]> => {
    try {
        const usersCollection = collection(db, "users");
        const usersQuery = query(usersCollection, where("role", "==", "user"));
        const usersSnapshot = await getDocs(usersQuery);
        const users:  User[] = [];
        usersSnapshot.forEach((doc) => {
            users.push({
                id: doc.id,
                ...doc.data(),
            } as User);
        });
        return users;
    } catch (error) {
        console.error("Error fetching users", error);
        throw error;
    }
}