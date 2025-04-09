"use client"

import {useEffect, useState} from "react";
import {fetchCartItems} from "@/app/utils/cart/fetchCartItems";
import {useAuth} from "@/app/context/AuthProviderContext";
import {doc, deleteDoc} from "firebase/firestore";
import {db} from "@/lib/firebase/config";

interface CartItem {
    title: string;
    quantity: number;
    price: number;
    discounted: number;
    subtotal: number;
    bookId: string;
    imageUrl: string;
}
export const useCart = () => {
    const {user} = useAuth();
    const [cart, setCart] = useState<{
        items: CartItem[];
        total: number;
        loading: boolean;
        error: Error | null;
    }>({
        items: [],
        total: 0,
        loading: true,
        error: null
    });
    useEffect(() => {
        if (!user?.uid) {
            setCart(prev => ({...prev, loading: false}));
            return;
        }

        //Lấy thông tin giỏ hàng
        const unsubcribe = fetchCartItems(user.uid, (data) => {
            if (data === null) {
                setCart({
                    items: [],
                    total: 0,
                    loading: false,
                    error: null
                });
            } else {
                setCart({
                    items: data.items,
                    total: data.total,
                    loading: false,
                    error: null
                });
            }
        });
        return () => unsubcribe();
    }, [user?.uid])

    // Xóa giỏ hàng
    const clearCart = async () => {
        if (!user?.uid) return false;
        try {
            const cartRef = doc(db, "cart", user.uid);
            await deleteDoc(cartRef);
            return true;
        } catch (error) {
            console.error("Error while updating cart", error);
            return false;
        }
    };

    return {
        cartItems: cart.items,
        totalPrice: cart.total,
        isLoading: cart.loading,
        error: cart.error,
        clearCart,
    };
}

