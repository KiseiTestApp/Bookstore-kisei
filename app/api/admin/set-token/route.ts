import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request: Request) {
    const {token} = await request.json();
    const cookie = serialize('adminToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/admin',
        maxAge: 60 * 60 * 24 * 7,
    });
    const response = NextResponse.json({ success: true });
    response.headers.set('Set-Cookie', cookie);
    return response;
}