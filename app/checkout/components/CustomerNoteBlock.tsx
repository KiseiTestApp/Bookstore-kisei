import React from "react";
import {TextField, Typography, Box} from "@mui/material";

interface CustomerNote {
    note: string;
    onChange: (note: string) => void;
}

export default function CustomerNoteBlock({note, onChange}: CustomerNote) {
    return (
        <Box sx={{ backgroundColor: 'white', p: 4 }} className="rounded-sm">
            <Typography variant="h5">Viết lời nhắn</Typography>
            <TextField
                variant="outlined"
                margin="normal"
                name="note"
                value={note}
                onChange={(e) => onChange(e.target.value)}
                fullWidth
                multiline
                minRows={2}
                placeholder="Thông điệp (Giới hạn 100 chữ)"
                slotProps={{
                    htmlInput: {
                        maxLength: 100,
                    }
                }}
            />
        </Box>
    )
}