import React, {useEffect, useState} from 'react';

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import {getItemQuantity, updateQuantity} from "@/app/utils/cart/fetchItemQuantity";
import {useAuth} from "@/app/context/AuthProviderContext";

interface QuantityProps {

    bookId: string;
    onQuantityChange?: (quantity: number) => void;
}

const SmallQuantitySelector = ({ bookId, onQuantityChange} : QuantityProps) => {
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

    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        if (newQuantity <= 100) {
            handleUpdateQuantity(newQuantity);
        }
    };
    const handleDecrement = () => {
        const newQuantity = quantity - 1;
        if (newQuantity >= 0) {
            handleUpdateQuantity(newQuantity);
        }
    }
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 0 && value <= 100) {
            handleUpdateQuantity(value);
        }
    };

    if (!user) {
        return <></>;
    }

    return (
        <Box className="flex items-center">
            <IconButton onClick={handleDecrement} size="small">
                <RemoveIcon />
            </IconButton>
            <TextField
                value={quantity}
                onChange={handleChange}
                sx={{
                    width: "48px",
                    "& input": {
                        textAlign: 'center',
                    }
                }}
            />
            <IconButton onClick={handleIncrement} size="small">
                <AddIcon />
            </IconButton>
        </Box>
    )
}
export default SmallQuantitySelector;