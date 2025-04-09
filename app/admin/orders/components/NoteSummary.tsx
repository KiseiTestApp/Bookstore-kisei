import {Typography, Card, CardContent, TextField} from "@mui/material";
import {OrderDocument} from "@/app/types/order";

interface NoteSummaryProps {
    orderNote: OrderDocument;
}
export default function NoteSummary({orderNote}: NoteSummaryProps) {
    return (
        <Card sx={{ borderRadius: 2 }}>
            <CardContent>
                <Typography variant="h6">Ghi chú</Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    value={orderNote.note || ""}
                    placeholder={!orderNote.note ? "Không có ghi chú" : undefined}
                    fullWidth
                    multiline
                    minRows={2}
                    slotProps={{
                        input: {
                            readOnly: true,
                        }
                    }}
                />
            </CardContent>
        </Card>
    )
}