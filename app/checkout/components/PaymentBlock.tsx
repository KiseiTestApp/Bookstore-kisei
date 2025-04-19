import {Box, FormControl, FormControlLabel, RadioGroup} from "@mui/material";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Radio from "@mui/material/Radio";
import {Controller, useFormContext, useWatch} from "react-hook-form";
import {grey} from "@mui/material/colors";

export default function Payment() {
    const {control} = useFormContext();
    const selectedMethod = useWatch({
        control,
        name: 'paymentMethod',
    })
    return (
        <FormControl component="div" className="bg-white rounded-sm">
            <Controller name="paymentMethod" control={control} render={({field}) => (
                <RadioGroup
                    {...field}
                    sx={{paddingX: 4, paddingY: 2}}
                >
                    <Typography variant="h5" paddingY={1}>Phương thức thanh toán</Typography>
                    <FormControlLabel
                        value="COD"
                        control={<Radio/>}
                        label="Thanh toán khi giao hàng"
                    />
                    <Collapse in={selectedMethod === 'COD'}>
                        <Box display='block' marginY={1} bgcolor={grey[100]} paddingX={3} paddingY={2} textAlign='center'>
                            <Typography variant='body1' color='textPrimary'>
                                Bạn vui lòng kiểm tra đầy đủ hàng hóa và hóa đơn bán lẻ nhận được từ nhân viên giao hàng.
                                Vui lòng chỉ thanh toán đúng số tiền hàng được ghi trên hóa đơn + phí ship đã được thỏa thuận từ trước.
                                Xin cảm ơn.
                            </Typography>
                        </Box>
                    </Collapse>
                    <FormControlLabel
                        value="Bank transfer"
                        control={<Radio/>}
                        label="Chuyển khoản qua ngân hàng"
                    />
                    <Collapse in={selectedMethod === 'Bank transfer'}>
                        <Box display='block' marginY={1} bgcolor={grey[100]} paddingX={3} paddingY={2} textAlign='center'>
                            <Typography variant='body1' color='textPrimary'>
                                Sau khi gửi đơn hàng, chúng mình sẽ gửi email cung cấp số tài khoản sau khi xác nhận đơn hàng
                                và thông báo tổng tiền thanh toán. Xin cảm ơn.
                            </Typography>
                        </Box>
                    </Collapse>
                    <FormControlLabel
                        value='QR Pay'
                        control={<Radio />}
                        label='Thanh toán VNPay qua mã QR'
                    />
                    <Collapse in={selectedMethod === 'QR Pay'}>
                        <Box display='block' marginY={1} bgcolor={grey[100]} paddingX={3} paddingY={2} textAlign='center'>
                            <Typography variant='body1' color='textPrimary'>
                                Bạn sẽ được điều hướng tới trang thanh toán VNPay để quét mã QR thanh toán đơn.
                                Vui lòng kiểm tra và chỉ thanh toán đúng số tiền hàng bạn sẽ phải thanh toán. Xin cảm ơn.
                            </Typography>
                        </Box>
                    </Collapse>
                </RadioGroup>
            )}
            />
        </FormControl>
    );
}
