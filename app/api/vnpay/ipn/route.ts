import { getFirestore } from 'firebase-admin/firestore';
import {NextApiResponse, NextApiRequest} from "next";
import * as crypto from "node:crypto";
import {getVNPayResponseMessage} from "@/app/utils/vnpayResponseCode";


const db = getFirestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({
            RspCode: '99',
            Message: 'Method not allowed',
        })
    }
    try {
        const vnp_Params = {...req.query};
        if (!vnp_Params.vnp_Amount || !vnp_Params.vnp_ResponseCode || !vnp_Params.vnp_TxnRef) {
            return res.status(400).json({
                RspCode: '99',
                Message: 'Missing required parameter',
            });
        }
        const secureHash = vnp_Params.vnp_SecureHash as string;
        delete vnp_Params.vnp_SecureHash;
        delete vnp_Params.vnp_SecureHashType;
        const sortedParams = Object.keys(vnp_Params).sort().reduce((acc: Record<string, any>, key) => {
            acc[key] = vnp_Params[key];
            return acc;
        }, {});
        const searchParams = new URLSearchParams();
        for (const [key, value] of Object.entries(sortedParams)) {
            searchParams.append(key, value.toString());
        }
        const signData = searchParams.toString();
        const secretKey = process.env.VNP_HASH_SECRET as string;
        const signed = crypto
            .createHmac('sha512', secretKey)
            .update(signData)
            .digest('hex');
        if (secureHash !== signed) {
            console.error('Invalid signature received', signed);
            return res.status(403).json({
                RspCode: '97',
                Message: 'Invalid signature received',
            })
        }
        const orderId = vnp_Params.vnp_TxnRef as string;
        const responseCode = vnp_Params.vnp_ResponseCode as string;
        const orderRef = db.collection("orders").doc(orderId);
        if (responseCode === '00') {
            await orderRef.update({
                status: "paid",
                paymentDate: new Date(),
                vnpayTransactionId: vnp_Params.vnp_TransactionNo,
                vnpayBankCode: vnp_Params.vnp_BankCode,
            });
        } else {
            await orderRef.update({
                status: 'failed',
                paymentError: responseCode,
                paymentMessage: getVNPayResponseMessage(responseCode),
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            RspCode: '99',
            Message: 'Something went wrong',
        })
    }
}