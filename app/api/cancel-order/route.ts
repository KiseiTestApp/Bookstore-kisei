import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

export async function POST(request: Request) {
    try {
        const { orderId } = await request.json();

        await updateDoc(doc(db, 'orders', orderId), {
            status: 'cancelled',
            updatedAt: new Date(),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error cancelling order:', error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}