import QuantitySelector from "./quantitySelector";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {Book} from "@/app/types/book";
import {useRouter} from "next/navigation";

interface PurchaseBoxProps {
    book: Book;
    quantity: number;
    onQuantityChangeAction: (newQuantity: number) => void;
    onAddtoCartAction: () => Promise<void>;
    userId?: string;
}

export default function PurchaseBox({book, quantity, onQuantityChangeAction, onAddtoCartAction, userId}: PurchaseBoxProps) {
    const actualPrice = book.discounted > 0 ? book.discounted : book.price ;
    const router = useRouter();
    const handleBuyNowAction = async () => {
        try {
            await onAddtoCartAction();
            setTimeout(() => router.push("/checkout"), 2500);
        } catch (error) {
            console.error('Error in buy now flow', error);
        }
    }
    return (
        <Box padding={1} borderRadius="md" bgcolor='white' sx={{position: 'sticky', top: '0', height: 'fit-content'}}>
            <QuantitySelector quantity={quantity} onQuantityChanged={onQuantityChangeAction}/>
            <Box className="mt-3">
                <Typography variant="h6" fontWeight={380}>Tạm tính</Typography>
                <Typography variant="h5" fontWeight={450}>
                    {Math.round(quantity * actualPrice).toLocaleString('vi-VN')}đ
                </Typography>
            </Box>
            <Stack spacing={1.5} className="mt-4">
                <Button variant="contained" color="primary" fullWidth
                        onClick={handleBuyNowAction}
                        disabled={!userId}
                >
                    Mua ngay
                </Button>
                <Button variant="outlined" color="primary" fullWidth onClick={onAddtoCartAction}
                        disabled={!userId}
                >
                    Thêm vào giỏ hàng
                </Button>
            </Stack>
        </Box>
    )
}