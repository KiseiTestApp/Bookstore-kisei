import React, {useEffect, useState} from 'react';
import {getItemQuantity, updateQuantity} from "@/app/utils/cart/fetchItemQuantity";
import {useAuth} from "@/app/context/AuthProviderContext";

interface QuantityProps {

    bookId: string;
    onQuantityChange?: (quantity: number) => void;
}

const QuantitySelector = ({ bookId, onQuantityChange} : QuantityProps) => {
    const {user} = useAuth();
    const [quantity, setQuantity] = useState<number>(1);
    useEffect(() => {
        const fetchQuantity = async () => {
            if (!user?.uid) return;
            try {
                const fetchQuantity = await getItemQuantity(user.uid, bookId)
                if (fetchQuantity !== undefined) {
                    setQuantity(fetchQuantity);
                    onQuantityChange?.(fetchQuantity);
                }
            } catch (error) {
                console.error("Error fetching Quantity", error);
            }
        };
        fetchQuantity();
    }, [user?.uid, bookId, onQuantityChange]);

    const handleUpdateQuantity = async (newQuantity: number) => {
        if (!user?.uid) return;
        try {
            await updateQuantity(user.uid, bookId, newQuantity);
            setQuantity(newQuantity);
            if (onQuantityChange) {
                onQuantityChange(newQuantity);
            }
        } catch (error) {
            console.error("Error updating quantity", error);
        }
    };

    const handleQuantityAdjustment = (change: number) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= 100) {
            handleUpdateQuantity(newQuantity);
        }
    };

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 0 && value <= 100) {
            handleUpdateQuantity(value);
        }
    };
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (isNaN(value) || value < 1) {
            handleUpdateQuantity(1);
        } else if (value > 100) {
            handleUpdateQuantity(100);
        }
    };

    if (!user) {
        return <></>;
    }

    return (
        <div className="flex items-center">
            <button
                type="button"
                onClick={() => handleQuantityAdjustment(-1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l bg-gray-50 hover:bg-gray-100 focus:scale-125 transition-colors"
                disabled={quantity <= 1}
            >
                <span className="text-gray-500 font-bold">−</span>
            </button>

            <input
                type="text"
                value={quantity}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-12 h-8 border-y border-gray-300 text-center"
                aria-label="Quantity"
            />

            <button
                type="button"
                onClick={() => handleQuantityAdjustment(1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r bg-gray-50 hover:bg-gray-100 focus:scale-125 transition-colors"
                disabled={quantity >= 100}
            >
                <span className="text-gray-500 font-bold">+</span>
            </button>
        </div>
    )
}
export default QuantitySelector;