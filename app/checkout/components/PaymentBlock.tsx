import {FormControl, FormControlLabel, RadioGroup} from "@mui/material";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import {Controller, useFormContext} from "react-hook-form";

export default function Payment() {
    const {control} = useFormContext();
    return (
        <FormControl component="div" className="bg-white rounded-sm">
            <Controller name="paymentMethod" control={control} render={({ field }) => (
                <RadioGroup
                    {...field}
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
                )}
            />
        </FormControl>
    );
}
