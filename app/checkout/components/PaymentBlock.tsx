import {RadioGroup} from "@mui/material";
import {FormControl, FormControlLabel} from "@mui/material";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import React from "react";

interface PaymentProps {
    value: "COD" | "Bank transfer",
    onChange: (paymentMethod: "COD" | "Bank transfer") => void;
}
export default function Payment({value, onChange}: PaymentProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value as "COD" | "Bank transfer");
    }
    const radioValue = value === "COD" ? "COD" : "Bank transfer";
    return (
        <FormControl component="div" className="bg-white rounded-sm">
            <RadioGroup
                name="paymentMethod"
                value={radioValue}
                onChange={handleChange}
                sx={{ paddingX: 4, paddingY: 2 }}
            >
                <Typography variant="h5" paddingY={1}>Phương thức thanh toán</Typography>
                <FormControlLabel
                    value="COD"
                    control={<Radio />}
                    label="Thanh toán khi giao hàng"
                />
                <FormControlLabel
                    value="Bank transfer"
                    control={<Radio />}
                    label="Chuyển khoản qua ngân hàng"
                />
            </RadioGroup>
        </FormControl>
    )
}
