"use client"

import React, {createContext, useContext, useEffect, useState} from "react";
import {onAuthStateChanged, updateProfile, User} from "firebase/auth";
import {auth, db} from "@/lib/firebase/config";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {createUserWithEmailAndPassword} from "@firebase/auth";
import {updatePassword, reauthenticateWithCredential, EmailAuthProvider, getAuth} from "firebase/auth";
import {useSnackbar} from "@/app/context/SnackbarContext";
import {getAuthErrorMessage} from "@/app/types/authErrors";
import {useRouter} from "next/navigation";
import {isFirebaseError} from "@/app/utils/firebaseErrorUtils";

type AuthContextType = {
    user: User | null;
    role: string | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, username: string, phoneNumber: string) => void;
    adminSignIn: (email: string, password: string) => Promise<void>;
    changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) => Promise<{success: boolean, error?: string}>;
    logout: () => Promise<void>;
    error: string | null;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    role: null,
    loading: true,
    signIn: async () => {},
    signUp: async () => {},
    adminSignIn: async () => {},
    changePassword: async () => ({success: false}),
    logout: async () => {},
    error: null,
});

const setAuthToken = async (token: string) => {
    try {
        const response = await fetch('/api/set-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });

        if (!response.ok) {
            throw new Error('Failed to set auth token');
        }
    } catch (error) {
        console.error('Error setting auth token:', error);
        throw error;
    }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const {showSnackbar} = useSnackbar();

    //Kiểm tra tình trạng của user trên hệ thống
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnapshot = await getDoc(userDocRef);
                setRole(userDocSnapshot.exists() ? userDocSnapshot.data()?.role : "user");
            } else {
                setRole(null);
            }
            setLoading(false);
        });
        return () => {
            console.log("AuthProvider unsubscribe", unsubscribe);
            unsubscribe();
        }
    }, []);

    //Chức năng đăng nhập
    const signIn = async (email: string, password: string) : Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnapshot = await getDoc(userDocRef);
            const userRole = userDocSnapshot.data()?.role || "user";
            console.log('User role:', userRole);
            if (!userDocSnapshot.exists()) {
                await setDoc(userDocRef, {
                    email: user.email,
                    role: "user",
                    createdAt: new Date().toISOString(),
                });
            }
            const idToken = await user.getIdToken(true);
            await setAuthToken(idToken);
        } catch (err: unknown) {
            let errorMessage = 'Đăng nhập thất bại';
            if (isFirebaseError(err)) {
                errorMessage = getAuthErrorMessage(err.code || errorMessage)
            }
            showSnackbar(errorMessage, 'error');
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    //Chức năng đăng ký
    const signUp = async (
        email: string,
        password: string,
        username: string,
        phoneNumber: string,
    ) : Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, {displayName: username});
            await setDoc(doc(db, "users", user.uid), {
                email,
                username,
                phoneNumber,
                role: 'user',
                createdAt: new Date().toISOString(),
            });
            const idToken = await user.getIdToken();
            await setAuthToken(idToken);
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const adminSignIn = async (email: string, password: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDocRef = doc(db, "users", user.uid);
            const userDocSnapshot = await getDoc(userDocRef);
            const userRole = userDocSnapshot.data()?.role;
            console.log('User role:', userRole);
            if (userRole !== 'admin') {
                await auth.signOut();
                throw new Error('ADMIN_ACCESS_REQUIRED');
            }
            const idToken = await user.getIdToken(true);
            const response = await fetch('/api/admin/set-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: idToken }),
            });

            if (!response.ok) {
                throw new Error('Failed to set admin token');
            }
            document.cookie = `isAdmin=true; path=/admin; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`;
        } catch (err: any) {
            console.error("Admin sign-in failed:", err);
            const errorMessage = err.message === 'ADMIN_ACCESS_REQUIRED'
                ? 'Chỉ quản trị viên mới có thể truy cập đường dẫn này'
                : getAuthErrorMessage(err.code) || 'Admin authentication failed';

            showSnackbar(errorMessage, "error");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    //Chức năng đổi mật khẩu
    const changePassword = async (
        currentPassword: string,
        newPassword: string,
        confirmPassword: string
    ): Promise<{success: boolean, error?: any}> => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (!currentUser || !user?.email) {
                showSnackbar("Yêu cầu xác thực lại tài khoản", "error");
                return {success: false, error: "No authenticated user"};
            }

            if (newPassword !== confirmPassword) {
                showSnackbar("Mật khẩu mới không trùng nhau", "error");
                return {success: false, error: "Passwords don't match"};
            }

            const credential = EmailAuthProvider.credential(
                user.email,
                currentPassword
            );
            await reauthenticateWithCredential(currentUser, credential);
            await updatePassword(currentUser, newPassword);
            await currentUser.getIdToken(true);
            showSnackbar("Đổi mật khẩu thành công", "success");
            return {success: true};
        } catch (err: any) {
            let errorMessage = "Password change failed";
            if (err.code) {
                errorMessage = getAuthErrorMessage(err.code);
                if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
                    showSnackbar("Sai mật khẩu hiện tại. Vui lòng đăng nhập lại", "error");
                    await auth.signOut();
                    return {success: false, error: "Invalid credentials - signed out"};
                }
            }

            showSnackbar(errorMessage, "error");
            return {success: false, error: err};
        }
    }

    //Chức năng đăng xuất
    const logout = async () => {
        setLoading(true);
        setError(null);
        try {
            await auth.signOut();
            await fetch('/api/logout', {method: 'POST'});
            setUser(null);
            setRole(null);
            document.cookie = 'idToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure; Samesite=Strict';
            localStorage.removeItem('idToken');
            showSnackbar("Đăng xuất thành công", "success");
            setTimeout(() => router.push('/'), 1000);
        } catch (err: any) {
            const errorMessage = getAuthErrorMessage(err.code) || 'Logout failed';
            setError(errorMessage);
            showSnackbar(errorMessage, "error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ user, role, loading, signIn, signUp, adminSignIn, error, changePassword, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);