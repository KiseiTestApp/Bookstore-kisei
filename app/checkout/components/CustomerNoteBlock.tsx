import {TextField, Typography, Box} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";

export default function CustomerNoteBlock() {
    const {control} = useFormContext();
    return (
        <Box sx={{ backgroundColor: 'white', p: 4 }} className="rounded-sm">
            <Typography variant="h5">Viết lời nhắn</Typography>
            <Controller
                name="note" control={control}
                render={({field, fieldState: { error }}) => (
                    <TextField
                        {...field}
                        variant="outlined"
                        margin="normal"
                        name="note"
                        fullWidth
                        multiline
                        minRows={2}
                        placeholder="Thông điệp (Giới hạn 100 chữ)"
                        error={!!error}
                        slotProps={{
                            htmlInput: {
                                maxLength: 100,
                            }
                        }}
                    />
                )}
                rules={{
                    maxLength: {
                        value: 100,
                        message: 'Vượt quá giới hạn 100 ký tự'
                    }
                }}
            />
        </Box>
    )
}