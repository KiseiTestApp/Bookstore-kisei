import {RadioGroup} from "@mui/material";
import {FormControl, FormControlLabel} from "@mui/material";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import React from "react";

interface ShippingMethodProps {
    value: "standard" | "pickup";
    onChange: (method: "standard" | "pickup") => void;
}

export default function ShippingMethodBlock({value, onChange}: ShippingMethodProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value as "standard" | "pickup")
    }
    const radioValue = value || "standard";
    return (
        <FormControl component="div" className="bg-white rounded-sm">

            <RadioGroup
                name="shipping_method"
                value={radioValue}
                onChange={handleChange}
                sx={{ paddingX: 4, paddingY: 2 }}
            >
                <Typography variant="h5" paddingY={1}>Phương thức vận chuyển</Typography>
                <FormControlLabel
                    value="standard"
                    control={<Radio />}
                    label="Giao hàng tiêu chuẩn (Thông báo phí ship sau)"
                />
                <FormControlLabel
                    value="pickup"
                    control={<Radio />}
                    label="Nhận tại cửa hàng - Miễn phí"
                />
            </RadioGroup>
        </FormControl>
    )
}