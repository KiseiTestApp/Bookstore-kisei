'use client'

import {Suspense, useEffect, useState} from 'react';
import {useSearchParams, useRouter} from "next/navigation";
import {Box, Typography, Button, CircularProgress} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

function PaymentResultContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
    const [orderId, setOrderId] = useState<string | null>(null);
    useEffect(() => {
        const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
        const orderIdParam = searchParams.get('vnp_TxnRef');
        setOrderId(orderIdParam);
        if (vnp_ResponseCode === '00') {
            setStatus('success');
        } else {
            setStatus('failed');
        }
    },[searchParams]);
    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' minHeight='70vh' textAlign='center' padding={3}>
            {status === 'loading' && (
                <>
                    <CircularProgress size={60} color={'primary'} sx={{mb: 3}} />
                    <Typography variant='h5'>
                        Đang xử lý kết quả thanh toán
                    </Typography>
                </>
            )}
            {status === 'success' && (
                <>
                    <CheckCircleIcon fontSize='large' color='success' sx={{ mb: 2}} />
                    <Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold'}}>
                        Thanh toán thành công
                    </Typography>
                    <Typography variant='body1' marginBottom={3}>
                        Cảm ơn bạn đã đặt hàng. Đơn hàng #{orderId} của bạn đã được thanh toán
                        thành công
                    </Typography>
                </>
            )}
            {status === 'failed' && (
                <>
                    <ErrorIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Thanh toán không thành công
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Thanh toán cho đơn hàng #{orderId} đã bị hủy hoặc thất bại.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="contained" color='primary'>
                            Phản ánh tới tổng đài
                        </Button>
                        <Button variant="outlined" onClick={() => router.push('/')}>
                            Về trang chủ
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    )
}

export default function PaymentResult() {
    return (
        <Suspense fallback={
            <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
                <CircularProgress size={60} />
            </Box>
        }>
            <PaymentResultContent />
        </Suspense>
    )
}
