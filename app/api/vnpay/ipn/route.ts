import {getFirestore} from "@/lib/firebase/firebase-admin";
import {NextResponse} from "next/server";
import * as crypto from "node:crypto";
import {getVNPayResponseMessage} from "@/app/utils/vnpayResponseCode";
import * as querystring from "node:querystring";

export async function GET(request: Request) {
    try {
        const db = getFirestore();
        const {searchParams} = new URL(request.url);
        const vnp_Params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            vnp_Params[key] = value;
        })

        // 1. Kiểm tra xem url có đủ tham số hợp lệ không
        if (!vnp_Params.vnp_Amount || !vnp_Params.vnp_ResponseCode || !vnp_Params.vnp_TxnRef) {
            return NextResponse.json(
                {RspCode: '99', Message: 'Thiếu các thông số yêu cầu'},
                {status: 400}
            )
        }

        // 2. Tạo checksum để đối chiếu và xác thực khóa
        const secureHash = vnp_Params.vnp_SecureHash;
        delete vnp_Params.vnp_SecureHash;
        delete vnp_Params.vnp_SecureHashType;
        const sortedParams = Object.keys(vnp_Params)
            .sort()
            .reduce((acc, key) => {
                acc[key] = vnp_Params[key];
                return acc;
            }, {} as Record<string, string>);
        const signData =  querystring.stringify(sortedParams);
        const secretKey = process.env.VNP_HASH_SECRET as string;
        const signed = crypto.createHmac('sha512', secretKey)
            .update(signData)
            .digest('hex');
        if (secureHash !== signed) {
            console.error('invalid signature received');
            return NextResponse.json(
                {RspCode: '97', Message: 'Chữ ký không hợp lệ'},
                {status: 403}
            )
        }

        // 3: Xử lý thông tin đơn hàng
        const orderId = vnp_Params.vnp_TxnRef as string;
        const responseCode = vnp_Params.vnp_ResponseCode;
        const orderRef = db.collection("orders").doc(orderId);

        // 4: Cập nhật lên Firebase
        if (responseCode === '00') {
            await orderRef.update({
                status: 'paid',
                paymentDate: new Date(),
                transaction_id: vnp_Params.vnp_TransactionNo,
            })
        } else {
            await orderRef.update({
                status: 'failed',
                paymentErrorCode: responseCode,
                paymentMessage: getVNPayResponseMessage(responseCode),
            })
        }
        return NextResponse.json(
            {RspCode: '00', Message: 'Xác nhận thành công'}
        )
    } catch (error) {
        console.error('Xử lý đơn hàng trên server đã gặp phải lỗi', error);
        return NextResponse.json(
            {RspCode: '99', Message: 'Lỗi máy chủ'},
            {status: 500}
        )
    }
}

export async function POST() {
    return NextResponse.json(
        {RspCode: '99', Message: 'Phương thức POST không được cấp phép'},
        {status: 405}
    )
}
export async function PUT() {
    return NextResponse.json(
        {RspCode: '99', Message: 'Phương thức PUT không được cấp phép'},
        {status: 405}
    )
}
export async function DELETE() {
    return NextResponse.json(
        {RspCode: '99', Message: 'Phương thức DELETE không được cấp phép'},
        {status: 405}
    )
}