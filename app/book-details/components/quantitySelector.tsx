import React from 'react';
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import {IconButton} from "@mui/material";
import TextField from '@mui/material/TextField'
import Box from "@mui/material/Box";


interface QuantityProps {
    quantity: number;
    onQuantityChanged: (quantity: number) => void;
}
const QuantitySelector = ({quantity, onQuantityChanged}: QuantityProps) => {
    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        if (newQuantity <= 100) {
            onQuantityChanged(newQuantity);
        }
    }
    const handleDecrement = () => {
        const newQuantity = quantity - 1;
        if (newQuantity >= 1) {
            onQuantityChanged(newQuantity);
        }
    }
    const handleChange = (event: any) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 1 && value <= 100) {
            onQuantityChanged(value);
        }
    }
    return (
        <Box className="flex flex-row gap-3">
            <IconButton onClick={handleDecrement} size="small"
                        sx={{
                            width: '42px',
                            borderRadius: '4px',
                            border: '0.5px solid',
                            borderColor: 'gray.100',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
            >
                <RemoveIcon />
            </IconButton>
            <TextField
                value={quantity}
                size="small"
                variant="outlined"
                inputProps={{
                    min: 1,
                    max: 100,
                    style: { textAlign: 'center'}
                }}
                onChange={handleChange}
                sx={{
                    width: '48px',
                }}
            />
            <IconButton onClick={handleIncrement} size="small"
                        sx={{
                            width: '42px',
                            border: '0.5px solid',
                            borderRadius: '4px',
                            borderColor: 'gray.100',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            }
                        }}
            >
                <AddIcon />
            </IconButton>
        </Box>
    )
}
export default QuantitySelector