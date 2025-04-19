import {NextResponse} from "next/server";

export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            order_id,
            amount,
            order_desc,
            bank_code = '',
        } = body;
        const vnp_Url = process.env.VNP_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        const vnp_TmnCode = process.env.VNP_TMN_CODE || '';
        const vnp_HashSecret = process.env.VNP_HASH_SECRET || '';
        const vnp_ReturnUrl = process.env.VNP_RETURN_URL || `${process.env.NEXT_PUBLIC_SITE_URL}/payment/return`;
        const vnp_Params: Record<string, string> = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: vnp_TmnCode,
            vnp_Amount: String(Math.round(amount * 100)),
            vnp_CreateDate: new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14),
            vnp_CurrCode: 'VND',
            vnp_IpAddr: (request.headers.get('x-forward-for') || '127.0.0.1').split(',')[0],
            vnp_Locale: 'vn',
            vnp_OrderInfo: order_desc,
            vnp_OrderType: '150000',
            vnp_ReturnUrl: vnp_ReturnUrl,
            vnp_TxnRef: order_id,

        }
        if (bank_code) {
            vnp_Params.vnp_BankCode = bank_code;
        }
        const sortParams = Object.keys(vnp_Params).sort().reduce((acc: Record<string, string>, key) => {
            acc[key] = vnp_Params[key];
            return acc;
        }, {});

        const signData = new URLSearchParams(sortParams).toString();

        // Tạo mã checksum
        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
            'raw',
            encoder.encode(vnp_HashSecret),
            {name: 'HMAC', hash: 'SHA-512'},
            false,
            ['sign']
        );
        const signature = await crypto.subtle.sign(
            'HMAC',
            key,
            encoder.encode(signData),
        )
        const hash = Array.from(new Uint8Array(signature))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

        sortParams['vnp_SecureHash'] = hash;

        const paymentUrl = `${vnp_Url}?${new URLSearchParams(sortParams).toString()}`;
        return NextResponse.json({
            code: '00',
            message: 'success',
            data: paymentUrl,
        })
    } catch (error) {
        console.error('VNPay error', error);
        return NextResponse.json(
            { code: '99', message: error instanceof Error ? error.message : 'Internal Server Error' },
            { status: 500 }
        )
    }
}