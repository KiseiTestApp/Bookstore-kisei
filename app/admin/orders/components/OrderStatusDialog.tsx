import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";

interface OrderStatusDialogProps {
    open: boolean;
    actionType: "confirm" | "cancel";
    onClose: () => void;
    onConfirm: () => void;
}

export default function OrderStatusDialog({open, actionType, onClose, onConfirm}: OrderStatusDialogProps) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {actionType === "confirm" ? "Xác nhận đơn hàng" : "Hủy đơn hàng"}
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" color="textPrimary">
                    Bạn có muốn thực hiện hành động chuyển trạng thái đơn không?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Hủy bỏ
                </Button>
                <Button
                    onClick={() => {
                        onConfirm();
                        onClose();
                    }}
                    color={actionType === "confirm" ? "primary" : "error"}
                    variant="contained"
                >
                    {actionType === "confirm" ? "Xác nhận" : "Hủy đơn"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}