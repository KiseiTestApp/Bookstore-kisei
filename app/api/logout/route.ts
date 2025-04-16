import {serialize} from "cookie";
import {NextResponse} from "next/server";

export async function POST() {
    const cookie = serialize('idToken', '', {
        httpOnly: false,
        secure: true,
        sameSite: 'strict',
        path: '/admin',
        expires: new Date(0),
    })
    const response = NextResponse.json({ message: 'Logged out' });
    response.headers.set('Set-Cookie', cookie);
    return response;
}