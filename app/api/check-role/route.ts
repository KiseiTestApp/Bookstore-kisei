import { NextResponse } from "next/server";
import {getAuth, getFirestore} from "@/lib/firebase/firebase-admin";
import {cookies} from "next/headers";

export async function GET(req: Request) {
    try {
        const isMiddleware = req.headers.get('x-middleware-request') === 'true';
        const cookieStore = await cookies();
        const token = cookieStore.get('adminToken')?.value || cookieStore.get('idToken')?.value;
        if (!token) {
            return NextResponse.json(
                {error: "No token found.", role: 'guest'},
                {status: 401}
            )
        }
        const auth = getAuth();
        const db = getFirestore();
        const decodedToken = await auth.verifyIdToken(token);
        const userDoc = await db
            .collection("users")
            .doc(decodedToken.uid)
            .get();
        if (!userDoc.exists) {
            return NextResponse.json(
                {error: "User not found."},
                {status: 403}
            )
        }
        const userData = userDoc.data();
        console.log(userData?.role);
        if (userData?.role !== "admin" && userData?.role !== "user") {
            return NextResponse.json(
                {error: "Insufficient role found.", role: userData?.role || 'guest'},
                {status: 403}
            )
        }
        if (isMiddleware) {
            return NextResponse.json({ role: userData.role });
        }
        return NextResponse.json({
            role: userData.role,
            tokenRole: decodedToken.role,
            email: decodedToken.email || '',
        })
    } catch (error) {
        console.log('API/check-role error: ', error);
        let errorMessage  = 'Authorization Failed.';
        if (error instanceof Error) {
            if (error.message.includes('auth/id-token-expired')) {
                errorMessage = 'Token expired.';
            } else if (error.message.includes('auth/id-token-revoked')) {
                errorMessage = 'Token revoked.';
            }
        }
        return NextResponse.json(
            {
                error: errorMessage,
                details: error instanceof Error ? error.message : undefined,
            },
            {status: 401},
        )
    }
}