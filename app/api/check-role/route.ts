import { NextResponse } from "next/server";
import { initAdmin } from "@/lib/firebase/firebase-admin";
import {cookies} from "next/headers";

export async function GET() {
    try {
        const adminApp = await initAdmin();
        const cookieStore = await cookies();
        const token = cookieStore.get('idToken')?.value;
        if (!token) {
            return NextResponse.json(
                {error: "No token found."},
                {status: 401}
            )
        }
        const decodedToken = await adminApp.auth().verifyIdToken(token);
        const userDoc = await adminApp
            .firestore()
            .collection("users")
            .doc(decodedToken.uid)
            .get();
        if (!userDoc.exists) {
            return NextResponse.json(
                {error: "No user document found."},
                {status: 403}
            )
        }
        const userData = userDoc.data();
        console.log(userData?.role);
        if (userData?.role !== "admin") {
            return NextResponse.json(
                {error: "Insufficient role found."},
                {status: 403}
            )
        }
        return NextResponse.json({
            role: userData.role,
            tokenRole: decodedToken.role,
            email: decodedToken.email || '',
        })
    } catch (error) {
        console.log('API/check-role error: ', error);
        if (
            error instanceof Error &&
            error.message.includes('auth/id-token-expired')
        ) {
            return NextResponse.json(
                {error: 'Token expired. Please try again later'},
                {status: 401}
            )
        }
        return NextResponse.json(
            {error: 'Authorization failed'},
            {status: 401},
        )
    }
}