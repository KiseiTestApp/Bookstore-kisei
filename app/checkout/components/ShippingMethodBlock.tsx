import {FormControl, FormControlLabel, RadioGroup} from "@mui/material";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import {Controller, useFormContext} from "react-hook-form";

export default function ShippingMethodBlock() {
    const {control} = useFormContext();
    return (
        <FormControl component="div" className="bg-white rounded-sm">
            <Controller
                name="shippingMethod" control={control}
                render={({field}) => (
                    <RadioGroup
                        {...field}
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
                )}
            />
        </FormControl>
    )
}