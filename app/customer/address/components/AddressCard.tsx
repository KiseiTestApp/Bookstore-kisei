// Card địa chỉ
import {Box, Button, Typography} from "@mui/material"
import {AddressFormValues} from "@/app/customer/address/components/AddressForm";
import theme from "@/app/theme";
import {useDialog} from "@/app/context/DialogContext";

interface AddressCardData {
    address: AddressFormValues;
    isDefault?: boolean;
    onDelete: (id: string) => void;
}

export default function AddressCard({address, isDefault, onDelete}: AddressCardData) {

    const {confirmDialog} = useDialog();

    const handleDeleteClick = () => {
        confirmDialog({
            title: 'Xóa địa chỉ',
            content: "Bạn có muốn xóa địa chỉ này?",
            confirmText: 'Xóa',
            cancelText: 'Hủy',
            onConfirm: () => {
                if (address.id) {
                    onDelete(address.id);
                }
            },
        });
    };

    return (
        <Box marginTop={2}>
            <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={2}>
                    <Typography variant="body1"  fontWeight={500}>
                        {address.receiver_name}
                    </Typography>
                    {isDefault && (
                        <Typography variant="subtitle2" bgcolor={theme.palette.primary.lighter} color={theme.palette.primary.dark} padding={0.5}>
                            Địa chỉ giao hàng mặc định
                        </Typography>
                    )}
                </Box>
                <Box>
                    <Button color="error" onClick={handleDeleteClick} size="small" disabled={isDefault}>
                        Xóa
                    </Button>
                    <Button color='primary' href={`/customer/address/edit/${address.id}`}>
                        Cập nhật
                    </Button>
                </Box>
            </Box>
            <Box marginTop={1}>
                <Typography variant="body2" color="textSecondary">
                    {address.receiver_phone}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {address.fullAddress}
                </Typography>
            </Box>
        </Box>
    )
}