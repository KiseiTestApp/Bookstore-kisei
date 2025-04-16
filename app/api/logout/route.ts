import {serialize} from "cookie";
import {NextResponse} from "next/server";

export async function POST() {
    try {
        const cookies = [
            serialize('idToken', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/admin',
                expires: new Date(0),
            }),
            serialize('adminToken', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/admin',
                expires: new Date(0),
            }),
            serialize('isAdmin', '', {
                path: '/admin',
                expires: new Date(0),
            })
        ]
        const response = NextResponse.json({ message: 'Logged out' });
        for (const cookie of cookies) {
            response.headers.append('Set-Cookie', cookie);
        }
        return response;
    } catch (error) {
        console.error('Logout failed:', error);
        return NextResponse.json(
            { success: false, message: 'Logout failed' },
            { status: 500 }
        );
    }
}